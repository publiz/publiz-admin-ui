import React from "react";
import { z } from "zod";
import { createOrganizationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CreateOrganizationInput, createOrganization } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { FormItem } from "../ui/Form";

type CreateOrganizationFormSchema = z.infer<typeof createOrganizationSchema>;

export const CreateOrganizationForm: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateOrganizationFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(createOrganizationSchema),
  });

  const mutation = useMutation({
    mutationFn: (input: CreateOrganizationInput) => {
      return createOrganization(input);
    },
  });
  const onSubmit = (data: CreateOrganizationFormSchema) =>
    mutation.mutate(data, {
      onSuccess: async () => {
        toast.success("Organization created");
      },
      onError: (errors) => {
        console.error(errors);
        toast.error("Organization could not be created");
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
        <Label>Description</Label>
        <Textarea {...register("description")} />

        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </FormItem>
      <FormItem>
        <Label>Verified</Label>
        <div>
          <Switch id="airplane-mode" />
        </div>
      </FormItem>
      <FormItem>
        <Label>Owner ID</Label>
        <Input
          type="number"
          {...register("ownerId", {
            valueAsNumber: true,
          })}
        />

        {errors.ownerId && (
          <p className="text-red-500">{errors.ownerId.message}</p>
        )}
      </FormItem>
      <Button type="submit" className="w-full" disabled={!isValid}>
        Create
      </Button>
    </form>
  );
};
