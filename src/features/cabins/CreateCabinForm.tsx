import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import { CabinType } from "../../interfaces.ts";

function CreateCabinForm() {
  const queryQlient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<CabinType>();
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
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name">
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow label="Maximum capacity">
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow label="Regular price">
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? "adding..." : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
