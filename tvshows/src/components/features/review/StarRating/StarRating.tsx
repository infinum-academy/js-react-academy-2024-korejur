import { StarIcon } from "@chakra-ui/icons";
import { Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";

export interface IStarRating {
  defaultValue: number;
  onChange: (value: number) => void;
  mode: "interactive" | "static";
  clearErrors?: (name: string) => void;
  size?: number;
  noOfStars?: number;
}

const StarRating = ({
  defaultValue = 0,
  onChange,
  mode,
  clearErrors,
  size = 6,
  noOfStars = 5,
}: IStarRating) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (onChange) {
      onChange(value);
    }
    if (clearErrors) {
      clearErrors("rating");
    }
  };

  return (
    <Flex align="center" flexDirection="row">
      {[...Array(noOfStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || defaultValue);
        const color = isFilled ? "yellow.400" : "white";
        return mode === "interactive" ? (
          <StarIcon
            key={index}
            w={size}
            h={size}
            onClick={() => handleClick(starValue)}
            cursor="pointer"
            color={
              starValue <= (hover || defaultValue) ? "yellow.400" : "white"
            }
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        ) : (
          <StarIcon key={index} w={size} h={size} color={color} />
        );
      })}
    </Flex>
  );
};

export default StarRating;
