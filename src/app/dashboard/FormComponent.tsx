"use client";

import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/types/formComponent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SectionForm } from "./SectionForm";
import { Button } from "@/components/ui/button";

export const FormComponent = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      sections: [],
    },
  });
  const { register, handleSubmit, control, formState:{errors} } = methods;
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="mt-10">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-auto w-lg gap-4"
        >
          <div>
            <Label>Title</Label>
            <Input {...register("title")} placeholder="title" />
            {errors?.title && <span className="text-red-400 text-sm">{errors.title.message}</span>}
          </div>

          <div>
            {sectionFields.map((field, index) => (
              <SectionForm
                key={field.id}
                index={index}
                onRemove={() => removeSection(index)}
              />
            ))}
          </div>
          <Button
            type="button"
            onClick={() =>
              appendSection({ name: "", items: [{ label: "", value: "" }] })
            }
          >
            Add Section
          </Button>

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
