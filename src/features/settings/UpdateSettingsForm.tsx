import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings.ts";
import { Settings, SettingsRows } from "../../interfaces.ts";
import Spinner from "../../ui/Spinner.tsx";
import { useUpdateSettings } from "./useUpdateSettings.ts";
import React from "react";

type SettingsType = Record<string, number>;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {} as SettingsRows,
  } = useSettings() as Settings;

  const { isUpdating, updateSettings } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdateSetting(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SettingsType,
  ) {
    const value = e.target.value;
    if (!value) return;
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue)) {
      updateSettings({ [field]: intValue });
    }
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={Number(minBookingLength) ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={Number(maxBookingLength) ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={Number(maxGuestsPerBooking) ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={Number(breakfastPrice) ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
