import { Controller } from "react-hook-form";
import StarRating from "./StarRating";

export const RatingInput = ({ control, setValue, clearErrors}) => {
  return (
    <Controller
      name="StarRating"
      control={control}
      defaultValue={0}
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
