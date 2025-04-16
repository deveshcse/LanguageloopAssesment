import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormValues } from "@/types/formComponent";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SectionFormProps {
  index: number;
  onRemove: () => void;
}

export const SectionForm = ({ index, onRemove }: SectionFormProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({ control, name: `sections.${index}.items` });

  const removeSectionOrItem = (itemIndex: number) =>{
    if (itemFields.length >1){
      removeItem(itemIndex);
    }else{
      onRemove();
    }
  }



  return (
    <div>
      <div className="flex flex-col gap-2 mt-2">
        <Label>Section Name</Label>
        <Button type="button" onClick={onRemove}>
          Remove Section
        </Button>
        <Input
          {...register(`sections.${index}.name`)}
          placeholder="Section Name"
        />
        {errors?.sections?.[index]?.name && (
          <span className="text-red-400 text-sm">
            {errors.sections[index].name.message}
          </span>
        )}
      </div>
      {itemFields.map((item, itemIndex) => (
        <div key={item.id} className="flex items-center gap-2 mt-2">
          <Input
            {...register(`sections.${index}.items.${itemIndex}.label`)}
            placeholder="label"
          />
          {errors?.sections?.[index]?.items?.[itemIndex]?.label && (
            <span className="text-red-400 text-sm">
              {errors.sections[index].items[itemIndex].label.message}
            </span>
          )}
          <Input
            {...register(`sections.${index}.items.${itemIndex}.value`)}
            placeholder="value"
          />
          {errors?.sections?.[index]?.items?.[itemIndex]?.value && (
            <span className="text-red-400 text-sm">
              {errors.sections[index].items[itemIndex].value.message}
            </span>
          )}
          <Button type="button" onClick={() => removeSectionOrItem(itemIndex)}>
            Remove Item
          </Button>
          <Button
            type="button"
            onClick={() => appendItem({ label: "", value: "" })}
          >
            Add Item
          </Button>
        </div>
      ))}
    </div>
  );
};
