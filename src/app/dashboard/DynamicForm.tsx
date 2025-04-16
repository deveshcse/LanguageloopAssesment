"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "cart",
    control,
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

const DynamicForm = () => {
  const {
    register,
    control,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{name: "acb", price: 0, quantity: 0}],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({ name: "cart", control });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-auto w-lg gap-4"
        >
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <section key={field.id} className="flex flex-col gap-2">
                  <Input
                    placeholder="name"
                    {...register(`cart.${index}.name` as const, {
                      required: true,
                    })}
                  />
                  <Input
                    placeholder="quantity"
                    type="number"
                    {...register(`cart.${index}.quantity` as const, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  <Input
                    placeholder="value"
                    type="number"
                    {...register(`cart.${index}.price` as const, {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                  <Button type="button" onClick={() => remove(index)}>
                    DELETE
                  </Button>
                </section>
              </div>
            );
          })}
          <Total control={control} />
          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                quantity: 0,
                price: 0,
              })
            }
          >
            APPEND
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default DynamicForm;
