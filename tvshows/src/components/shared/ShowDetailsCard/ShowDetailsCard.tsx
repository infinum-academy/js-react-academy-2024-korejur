import { IShow } from "@/typings/show.types";
import { Box, Image, Text } from "@chakra-ui/react";

const maxRating = "5";

interface ShowDetailsProps {
  show: IShow;
  averageRating: number | null;

}

export const ShowDetailsCard = ({ show, averageRating }: ShowDetailsProps) => {
  return (
    <Box
      bg="white"
      color="black"
      borderRadius="10px"
      overflow="hidden"
      mt={10}
      mb={10}
    >
      <Image
        src={show.image_url}
        alt={show.image_alt ? show.image_alt : "Photo may not be available"}
        fallbackSrc="/images/placeholder.jpg"
        width="100%"
        height="auto"
        objectFit="cover"
        borderRadius="10px 10px 0 0"
      />
      <Box p={5} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold">
          {show.title}
        </Text>
        <Text mt={2}>{show.description}</Text>
        <Text mt={2} fontWeight="semibold">
          {averageRating
            ? `${averageRating.toFixed(1)} / ${maxRating}`
            : "No ratings"}
        </Text>
      </Box>
    </Box>
  );
};
