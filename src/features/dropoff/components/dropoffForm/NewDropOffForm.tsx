/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useDashboardContext } from "../../../../lib/dashboard-context";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Trash2Icon } from "lucide-react";
import {
  useCreateDropOff,
  useGetGuardianByPhone,
} from "@/features/dropoff/services/dropoff.service";
import { panelStateKeys } from "@/features/dropoff/types/types.dropoff";
import { useEffect, useState } from "react";
import { dropOffSchema } from "./dropoffSchema";
import { formatPhoneNumber } from "./utils";

export function NewDropOffForm() {
  const { setDetailsPanelState } = useDashboardContext() || {};
  const churchID = 1;
  const [animateFlash, setAnimateFlash] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: createDropOff, isPending: isSubmitting } =
    useCreateDropOff();

  const [triggerFetch, setTriggerFetch] = useState(false);

  const form = useForm({
    resolver: zodResolver(dropOffSchema),
    defaultValues: {
      phone: "",
      guardian: "",
      children: [{ name: "", className: "", hasBag: false, note: "" }],
    },
  });
  const phone = form.watch("phone");
  const { data } = useGetGuardianByPhone(phone, triggerFetch);
  useEffect(() => {
    // Reset the form and trigger flag when the panel is opened
    reset({
      phone: "",
      guardian: "",
      children: [{ name: "", className: "", hasBag: false, note: "" }],
    });
    setTriggerFetch(false);
  }, []);

  useEffect(() => {
    if (data?.guardian && triggerFetch) {
      toast.info("Returning guardian found, pre-filling child info ✨");
      form.setValue("guardian", data.guardian.name);
    }

    if (data?.children?.length && triggerFetch) {
      form.setValue(
        "children",
        data.children.map((child: any) => ({
          name: child.name,
          className: child.class,
          hasBag: child.bag,
          note: child.note,
        }))
      );

      setAnimateFlash(true);
    }

    setTriggerFetch(false);
  }, [data, form]);

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const onSubmit = async (data: any) => {
    const payload = {
      church_id: churchID,
      guardian: {
        name: data.guardian,
        phone: data.phone,
      },
      children: data.children.map((child: any) => ({
        name: child.name,
        class: child.className,
        bag: child.hasBag,
        note: child.note,
      })),
    };

    return toast.promise(createDropOff(payload), {
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
                    setTriggerFetch(false);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    setTriggerFetch(true);
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
              className="border p-4 rounded-xl bg-muted space-y-4 relative" // Added relative for positioning
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
                        placeholder="E.g. Allergic to peanuts"
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
                  className="absolute top-3 right-2 rounded-full shadow-md bg-white dark:bg-zinc-700 hover:bg-slate-100 dark:hover:bg-slate-700"
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
        <div className="flex items-center space-x-4">
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
