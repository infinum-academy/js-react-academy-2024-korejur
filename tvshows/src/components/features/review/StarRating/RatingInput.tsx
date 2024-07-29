import {
  Control,
  Controller,
  FieldValues,
  UseFormClearErrors,
} from "react-hook-form";
import StarRating from "./StarRating";

export const RatingInput = ({
  control,
  setValue,
  clearErrors,
  defaultValue,
}: {
  control: any;
  setValue: any;
  clearErrors: UseFormClearErrors<any>;
  defaultValue: number;
}) => {
  return (
    <Controller
      name="StarRating"
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <StarRating
          defaultValue={value}
          onChange={(value) => {
            onChange(value);
            setValue("rating", value);
          }}
          clearErrors={clearErrors}
          mode="interactive"
        />
      )}
    />
  );
};
