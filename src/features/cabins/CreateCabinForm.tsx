import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinType } from "../../interfaces.ts";
import { createCabin, editCabin } from "../../services/apiCabins.ts";

interface CreateCabinFormProps {
  cabinToEdit?: CabinType;
}

function CreateCabinForm({ cabinToEdit = {} }: CreateCabinFormProps) {
  const queryQlient = useQueryClient();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinType>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;
  const operation = isEditSession ? editCabin : createCabin;
  const successMessage = isEditSession
    ? "Cabin successfully updated"
    : "New cabin successfully created";

  const { isLoading: isSubmitting, mutate } = useMutation({
    mutationFn: isEditSession
      ? (newCabinData: CabinType) => operation(editId!, newCabinData)
      : operation,
    onSuccess: () => {
      toast.success(successMessage);
      void queryQlient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: CabinType) {
    const formData: CabinType = { ...data, image: data?.image[0] };
    if (isEditSession) {
      mutate({ ...formData, id: editId });
    } else {
      mutate(formData);
    }
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isSubmitting}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isSubmitting}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isSubmitting}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isSubmitting}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const numericValue =
                value !== undefined ? parseFloat(String(value)) : 0;
              const regularPrice =
                parseFloat(String(getValues().regularPrice)) || Infinity;
              return (
                numericValue < regularPrice ||
                "Discount can't be greater than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isSubmitting}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isSubmitting}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>
          {isEditSession
            ? "Edit"
            : isSubmitting
              ? "Creating cabin..."
              : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
