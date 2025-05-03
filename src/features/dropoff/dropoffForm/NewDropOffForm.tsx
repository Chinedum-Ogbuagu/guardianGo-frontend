"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useDashboardContext } from "../../../lib/dashboard-context";
import { Checkbox } from "../../../components/ui/checkbox";
import { Trash2Icon } from "lucide-react";
import {
  useCreateDropOff,
  useGetGuardianByPhone,
} from "@/features/dropoff/services/dropoff.service";
import {
  DropOffChild,
  DropOffDTO,
  panelStateKeys,
} from "@/features/dropoff/types/types.dropoff";
import { useEffect, useState } from "react";
import { dropOffSchema } from "./dropoffSchema";
import { formatPhoneNumber } from "./utils";

export function NewDropOffForm() {
  const { setDetailsPanelState } = useDashboardContext() || {};
  const queryClient = useQueryClient();
  const churchID = JSON.parse(
    localStorage.getItem("user") || "null"
  )?.church_id;

  const [animateFlash, setAnimateFlash] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const form = useForm({
    resolver: zodResolver(dropOffSchema),
    defaultValues: {
      phone: "",
      guardian: "",
      children: [{ name: "", className: "", hasBag: false, note: "" }],
    },
  });

  const phone = form.watch("phone");
  const { mutateAsync: createDropOff, isPending: isSubmitting } =
    useCreateDropOff();
  const { data, refetch, isSuccess, isError } = useGetGuardianByPhone(phone);

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  useEffect(() => {
    const isValidPhone = /^0\d{10}$/.test(phone);

    if (phone === "") {
      reset({
        phone: "",
        guardian: "",
        children: [{ name: "", className: "", hasBag: false, note: "" }],
      });
      return;
    }

    if (isValidPhone) {
      refetch();
      setHasFetched(true);
    }
  }, [phone, refetch, reset]);

  useEffect(() => {
    if (!hasFetched) return;

    if (isSuccess && data?.guardian) {
      toast.info("Returning guardian found, pre-filling child info ✨");
      form.setValue("guardian", data.guardian.name);

      if (data.children?.length) {
        form.setValue(
          "children",
          data.children.map(
            (child: {
              name: string;
              class: string;
              bag: boolean;
              note: string;
            }) => ({
              name: child.name,
              className: child.class,
              hasBag: child.bag,
              note: child.note,
            })
          )
        );
        setAnimateFlash(true);
      }
    }

    if (isError) {
      toast.info("New guardian. Please continue filling out the form.");

      form.setValue("guardian", "");
      form.setValue("children", [
        { name: "", className: "", hasBag: false, note: "" },
      ]);
    }
  }, [isSuccess, isError, data?.guardian, data?.children, form, hasFetched]);

  const onSubmit = async (data: DropOffDTO) => {
    const payload = {
      church_id: churchID,
      guardian: {
        name: data.guardian,
        phone: data.phone,
      },
      children: data.children.map((child: DropOffChild) => ({
        name: child.name,
        class: child.className,
        bag: child.hasBag,
        note: child.note,
      })),
    };

    return toast.promise(createDropOff(payload as unknown as DropOffDTO), {
      loading: "Creating Drop-Off...",
      success: (response) => {
        queryClient.invalidateQueries({ queryKey: ["drop-sessions"] });
        setDetailsPanelState?.(panelStateKeys.noActiveSession);
        reset();
        return `Drop-off created successfully with reference code! ${response.unique_code}`;
      },
      error: (error) => {
        if (error.isAxiosError && error.response) {
          return `Failed to create drop-off: ${
            error.response.data.error || "Please try again."
          }`;
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 p-4 transition-all duration-700 ${
          animateFlash ? "animate-flash" : ""
        }`}
        onAnimationEnd={() => setAnimateFlash(false)}
      >
        <h2 className="text-lg font-semibold">New Drop-Off</h2>

        {/* Phone Field */}
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="0801 234 5678"
                  value={formatPhoneNumber(field.value)}
                  onChange={(e) => {
                    const numericOnly = e.target.value.replace(/\D/g, "");
                    field.onChange(numericOnly);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="guardian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian Name</FormLabel>
              <FormControl>
                <Input placeholder="Guardian's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded-xl bg-muted space-y-4 relative"
            >
              <h3 className="text-sm font-semibold">Child #{index + 1}</h3>

              <FormField
                control={control}
                name={`children.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Child name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`children.${index}.className`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="Nursery / Toddlers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`children.${index}.note`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Allergic to peanuts"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`children.${index}.hasBag`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="m-0">Has Bag</FormLabel>
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 right-2 rounded-full shadow-md bg-white dark:bg-zinc-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => remove(index)}
                >
                  <Trash2Icon className="h-4 w-4 text-red-300 " />
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            type="button"
            onClick={() =>
              append({ name: "", className: "", hasBag: false, note: "" })
            }
          >
            + Add Child
          </Button>
        </div>

        <div className="sticky bottom-0 bg-background p-2 border-t border-muted flex items-center space-x-4 z-10">
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Drop-Off"}
          </Button>
          <Button
            type="button"
            onClick={() => {
              setDetailsPanelState?.(panelStateKeys.noActiveSession);
              queryClient.invalidateQueries({
                queryKey: ["guardianDetailsByPhone"],
              });
            }}
            variant="destructive"
            className="flex-1"
            disabled={isSubmitting}
          >
            Discard
          </Button>
        </div>
      </form>
    </Form>
  );
}
