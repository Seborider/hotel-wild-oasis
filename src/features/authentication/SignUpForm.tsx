import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm() {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<FormValues>();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  function onSubmit({ fullName, email, password }: FormValues) {
    signup({ fullName, email, password }, { onSettled: void reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName "
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min. 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minumum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords must match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button $variation="primary" disabled={isLoading}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}
