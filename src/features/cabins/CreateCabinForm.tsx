import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { FieldErrors, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import { CabinType } from "../../interfaces.ts";

// const Label = styled.label`
//   font-weight: 500;
// `;
//
// const Error = styled.label`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm() {
  const queryQlient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinType>();
  const { errors } = formState;
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      void queryQlient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: CabinType) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount can't be greater than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? "Adding cabin..." : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
