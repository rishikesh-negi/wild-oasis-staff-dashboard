// Library imports:
import { useForm } from "react-hook-form";

// Components/utils/constant imports:
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateOrEditCabin } from "./useCreateOrEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const { createOrEditCabin, isBusy } = useCreateOrEditCabin(isEditSession);

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      createOrEditCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess(data) {
            setValue("name", data.name);
            setValue("maxCapacity", data.maxCapacity);
            setValue("regularPrice", data.regularPrice);
            setValue("discount", data.discount);
            setValue("description", data.description);
            onCloseModal?.();
          },
        }
      );
    else
      createOrEditCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess() {
            onCloseModal?.();
            reset();
          },
        }
      );
  }

  // The following onError function is not needed here and does not serve any purpose in this form implementation, but its is written here just as a reminder that it exists and can be used if needed:
  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isBusy}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isBusy}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "A cabin must accommodate at least one guest",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isBusy}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "A cabin must have a booking price",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isBusy}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate(val) {
              return (
                Number(val) <= Number(getValues().regularPrice) ||
                "The discount cannot be bigger than the regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isBusy}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isBusy}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "A cabin image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isBusy}
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isBusy}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
