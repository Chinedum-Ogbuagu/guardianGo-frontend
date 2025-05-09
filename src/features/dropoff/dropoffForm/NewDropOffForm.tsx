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
import { Trash2Icon, Plus } from "lucide-react";
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
    <div className="flex flex-col h-full relative">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col h-full`}
        >
          {/* Scrollable content area */}
          <div
            className={`flex-1 overflow-y-auto px-4 pb-24 pt-4 space-y-6 transition-all duration-700 ${
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
                  className="border p-4 rounded-xl bg-muted/50 space-y-4 relative shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">
                      Child #{index + 1}
                    </h3>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                        onClick={() => remove(index)}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500 dark:text-red-400" />
                      </Button>
                    )}
                  </div>

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
                </div>
              ))}

              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  append({ name: "", className: "", hasBag: false, note: "" })
                }
                className="w-full border-dashed border-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-muted/60 dark:hover:bg-muted/20"
              >
                <Plus className="h-4 w-4" />
                Add Another Child
              </Button>
            </div>
          </div>

          {/* Fixed button area */}
          <div className="fixed bottom-0 left-0 right-0 rounded-lg border-t px-4 py-3 flex items-center gap-3 shadow-lg z-10">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-primary-foreground"
              disabled={isSubmitting}
            >
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
              variant="outline"
              className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/10 dark:hover:bg-destructive/20"
              disabled={isSubmitting}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
