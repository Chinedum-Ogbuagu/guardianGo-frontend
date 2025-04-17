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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      guardian: "",
      children: [{ name: "", className: "", hasBag: false, note: "" }],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "children",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setActiveSession(null);
    toast.success("New drop-off created successfully", {
      description: "The drop-off has been added to the system.",
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
              className="border p-4 rounded-xl bg-muted space-y-4"
            >
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
          <Button type="submit" className="flex-1">
            Submit Drop-Off
          </Button>
          <Button type="button" variant="destructive" className="flex-1">
            Discard
          </Button>
        </div>
      </form>
    </Form>
  );
}
