import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Image, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useSWR from "swr";

const maxRating = "5";

export const ShowDetailsCard = () => {
  const params = useParams();
  const showId = params?.id;
  
  const {
    data: showListResponse,
    error: showError,
    isLoading: showIsLoading,
  } = useSWR(swrKeys.show(Number(showId)), { fetcher });


  if (showIsLoading) {
    return <div>Loading...</div>;
  }

  if (showError) {
    return <div>Oops, something went wrong...</div>;
  }
  const { show: showData } = showListResponse;
  
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
          {showData.average_rating
            ? `${showData.average_rating.toFixed(1)} / ${maxRating}`
            : "No ratings"}
        </Text>
      </Box>
    </Box>
  );
};
