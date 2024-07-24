import { Flex, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export interface IStarRating {
  defaultValue: number;
  onChange: (value: number) => void;
  mode: "interactive" | "static";
}

const StarRating = ({ defaultValue = 0, onChange, mode }: IStarRating) => {
  // const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);

  // useEffect(() => {
  //   setRating(defaultValue);
  // }, [defaultValue]);

  const handleClick = (value: number) => {
    // setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  // const IconMode1 = (index: number, starValue: number) => {
  //   return (
  //     <Icon
  //       key={index}
  //       as={StarIcon}
  //       w={6}
  //       h={6}
  //       color={starValue <= defaultValue ? "yellow.400" : "aliceblue"}
  //     />
  //   );
  // };

  // const IconMode2 = (index: number, starValue: number) => {
  //   return (
  //     <Icon
  //       key={index}
  //       as={StarIcon}
  //       w={6}
  //       h={6}
  //       onClick={() => handleClick(starValue)}
  //       cursor="pointer"
  //       color={
  //         starValue <= (hover || defaultValue) ? "yellow.400" : "aliceblue"
  //       }
  //       onMouseEnter={() => setHover(starValue)}
  //       onMouseLeave={() => setHover(null)}
  //     />
  //   );
  // };

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
