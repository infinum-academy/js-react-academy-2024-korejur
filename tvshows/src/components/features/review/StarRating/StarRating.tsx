import { StarIcon } from "@chakra-ui/icons";
import { Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";

export interface IStarRating {
  defaultValue: number;
  onChange: (value: number) => void;
  mode: "interactive" | "static";
}

const StarRating = ({ defaultValue = 0, onChange, mode }: IStarRating) => {
  const [hover, setHover] = useState<number | null>(null);


  const handleClick = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };


  return (
    <Flex align="center" flexDirection="row">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || defaultValue);
        const color = isFilled ? "yellow.400" : "aliceblue";
        return mode === "interactive" ? (
          <Icon
            key={index}
            as={StarIcon}
            w={6}
            h={6}
            onClick={() => handleClick(starValue)}
            cursor="pointer"
            color={
              starValue <= (hover || defaultValue) ? "yellow.400" : "aliceblue"
            }
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        ) : (
          <Icon key={index} as={StarIcon} w={6} h={6} color={color} />
        );
      })}
    </Flex>
  );
};

export default StarRating;
