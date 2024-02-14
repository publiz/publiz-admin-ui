import React from "react";
import { z } from "zod";
import { createTagSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CreateTagInput, Tag, createTag, updateTag } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { FormItem } from "../ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

type CreateTagFormSchema = z.infer<typeof createTagSchema>;

type Props = {
  tag?: Tag;
};

export const CreateTagForm: React.FunctionComponent<Props> = ({ tag, }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<CreateTagFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: tag?.name || "",
      slug: tag?.slug || "",
      organizationId: tag?.organizationId || 0,
      userId: tag?.userId || 0,
      type: tag?.type || "DEFAULT",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: CreateTagInput) => {
      if (tag) {
        return updateTag(tag.id, input);
      }
      return createTag(input);
    },
  });
  const onSubmit = (data: CreateTagFormSchema) =>
    mutation.mutate(data, {
      onSuccess: async () => {
        toast.success(`Tag ${tag ? "updated" : "created"}`);
      },
      onError: (errors) => {
        console.error(errors);
        toast.error(
          `Tag could not be ${tag ? "updated" : "created"}`
        );
      },
    });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FormItem>
        <Label>Name</Label>
        <Input type="text" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </FormItem>
      <FormItem>
        <Label>Slug</Label>
        <Input type="text" {...register("slug")} />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
      </FormItem>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <FormItem>
            <Label>Type</Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEFAULT">DEFAULT</SelectItem>
                <SelectItem value="SYSTEM">SYSTEM</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </FormItem>
        )}
      ></Controller>

      <FormItem>
        <Label>Organization ID</Label>
        <Input
          type="number"
          {...register("organizationId", {
            valueAsNumber: true,
          })}
        />
        {errors.organizationId && (
          <p className="text-red-500">{errors.organizationId.message}</p>
        )}
      </FormItem>
      <FormItem>
        <Label>User ID</Label>
        <Input
          type="number"
          {...register("userId", {
            valueAsNumber: true,
          })}
        />

        {errors.userId && (
          <p className="text-red-500">{errors.userId.message}</p>
        )}
      </FormItem>
      <Button type="submit" className="w-full" disabled={!isValid}>
        Create
      </Button>
    </form>
  );
};
