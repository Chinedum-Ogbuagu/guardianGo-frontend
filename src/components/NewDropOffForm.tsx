/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDashboardContext } from "./dashboard-context";
import { Checkbox } from "./ui/checkbox";
import { Trash2Icon } from "lucide-react";
import { useCreateDropOff } from "@/features/dropoff/services/dropoff.service";

const formSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  guardian: z.string().min(2, "Guardian name is required"),
  children: z
    .array(
      z.object({
        name: z.string().min(1, "Child name is required"),
        className: z.string().min(1, "Class is required"),
        hasBag: z.boolean(),
        note: z.string().optional(),
      })
    )
    .min(1, "At least one child is required"),
});

export function NewDropOffForm() {
  const { setActiveSession } = useDashboardContext();
  const churchID = 1;
  const { mutateAsync: createDropOff, isPending: isSubmitting } =
    useCreateDropOff();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      guardian: "",
      children: [{ name: "", className: "", hasBag: false, note: "" }],
    },
  });

  const { control, handleSubmit, reset } = form; // Get reset here

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
      success: () => {
        setActiveSession(null);
        reset(); // Clear the form
        return "Drop-off created successfully!";
      },
      error: (err) => {
        return `Failed to create drop-off: ${
          err.message || "Please try again."
        }`;
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
        <h2 className="text-lg font-semibold">New Drop-Off</h2>

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian Phone</FormLabel>
              <FormControl>
                <Input placeholder="080xxxxxxxx" {...field} />
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
            onClick={() => setActiveSession(null)}
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
