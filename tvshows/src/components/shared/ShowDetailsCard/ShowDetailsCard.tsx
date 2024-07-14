import { IShow } from "@/typings/show.types";
import { Box, Image, Text } from "@chakra-ui/react";

const maxRating = "5";

export interface IShowDetailsProps {
  show: {show: IShow};
  averageRating: number | null;
}

export const ShowDetailsCard = ({ show, averageRating }: IShowDetailsProps) => {
  const { show: showData } = show;
  return (
    <Box
      bg="white"
      color="#1a1a1a"
      borderRadius="10px"
      overflow="hidden"
      mt={-10}
      mb={10}
    >
      <Image
        src={showData.image_url}
        alt={showData.image_alt ? showData.image_alt : "Photo may not be available"}
        fallbackSrc="/images/placeholder.jpg"
        width="100%"
        maxHeight="50vh"
        objectFit="cover"
        borderRadius="10px 10px 0 0"
      />
      <Box p={5} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold">
          {showData.title}
        </Text>
        <Text mt={2}>{showData.description}</Text>
        <Text mt={2} fontWeight="semibold">
          {averageRating
            ? `${averageRating.toFixed(1)} / ${maxRating}`
            : "No ratings"}
        </Text>
      </Box>
    </Box>
  );
};
