import React from "react";
import { z } from "zod";
import { createTagSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CreateTagInput, createTag } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { FormItem } from "../ui/Form";

type CreateTagFormSchema = z.infer<typeof createTagSchema>;

export const CreateTagForm: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateTagFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(createTagSchema),
  });

  const mutation = useMutation({
    mutationFn: (input: CreateTagInput) => {
      return createTag(input);
    },
  });
  const onSubmit = (data: CreateTagFormSchema) =>
    mutation.mutate(data, {
      onSuccess: async () => {
        toast.success("Tag created");
      },
      onError: (errors) => {
        console.error(errors);
        toast.error("Tag could not be created");
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
      <FormItem>
        <Label>Type</Label>
        <Textarea {...register("type")} />

        {errors.type && (
          <p className="text-red-500">{errors.type.message}</p>
        )}
      </FormItem>
      
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
