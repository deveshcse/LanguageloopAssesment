"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { NestedFormComponent } from "./NestedFormComponent";

const FormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  isAdmin: z.boolean(),
  password: z.string(),
});

type FormInput = z.infer<typeof FormSchema>;

export const CustomFormComponent = () => {
  const methods = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      isAdmin: false,
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <NestedFormComponent />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};
