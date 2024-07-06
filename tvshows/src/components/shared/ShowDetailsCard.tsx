import { IShow } from "@/typings/show";
import { Box, Image } from "@chakra-ui/react";

const maxRating = "5";

interface ShowDetailsProps {
  show: IShow;
}

export const ShowDetailsCard = ({ show }: ShowDetailsProps) => {
  return (
    <Box
    backgroundColor="white"
    borderRadius="15px"
    height={{
      base: "100%", // 0-48em
      md: "50%",    // 48em-80em,
      xl: "25%",    // 80em+
    }}
    width={[
      "0%",   // 0-30em
      "50%",  // 30em-48em
      "25%",  // 48em-62em
      "50%",  // 62em+
    ]}
    margin="auto" 
  >
      <Image
        src={show.image_url ? show.image_url : "/images/placeholder.jpg"}
        alt={show.image_alt ? show.image_alt : "Photo may not be available"}
        width="100%"
        height="auto"
        objectFit="cover"
        borderRadius="10px 10px 0 0"
      />
      <Box
        mt="1"
        fontWeight="semibold"
        as="h2"
        lineHeight="tight"
        noOfLines={1}
        color="#1a1a1a"
        padding="15px 15px 0px"
        borderRadius="0 0 10px 10px"
      >
        {show.title}
      </Box>
      <Box
        mt="1"
        as="h4"
        lineHeight="tight"
        color="#1a1a1a"
        padding="0 15px"
        borderRadius="0 0 10px 10px"
      >
        <div>{show.description}</div>
      </Box>
      <Box
        mt="1"
        as="p"
        lineHeight="tight"
        noOfLines={1}
        color="#1a1a1a"
        padding="0px 15px 30px 15px"
        borderRadius="0 0 10px 10px"
      >
        {show.averageRating
          ? `${show.averageRating} / ${maxRating}`
          : "No ratings"}
      </Box>
    </Box>
  );
};
