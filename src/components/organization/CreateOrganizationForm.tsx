import React from "react";
import { z } from "zod";
import { createOrganizationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CreateOrganizationInput, createOrganization } from "../../api";
import { useMutation } from "@tanstack/react-query";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-600">Name</label>
        <input
          type="text"
          className="border rounded-lg px-3 py-2"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-600">Slug</label>
        <input
          type="text"
          className="border rounded-lg px-3 py-2"
          {...register("slug")}
        />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-600">Description</label>
        <textarea
          className="border rounded-lg px-3 py-2"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-600">Verified</label>
        <input
          type="checkbox"
          className="border rounded-lg px-3 py-2"
          {...register("verified")}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-600">Owner ID</label>
        <input
          type="number"
          className="border rounded-lg p-3 py-2"
          {...register("ownerId", {
            valueAsNumber: true,
          })}
        />
        {errors.ownerId && (
          <p className="text-red-500">{errors.ownerId.message}</p>
        )}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
        type="submit"
        disabled={!isValid}
      >
        Create
      </button>
    </form>
  );
};
