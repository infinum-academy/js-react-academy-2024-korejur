import { IShow } from "@/typings/show.types";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Card, Flex, Icon, Image, Text } from "@chakra-ui/react";

const maxRating = "5";

export interface IShowDetailsProps {
  show: { show: IShow };
  averageRating: number | null;
}

export const ShowDetailsCard = ({ show, averageRating }: IShowDetailsProps) => {
  const { show: showData } = show;
  return (
    <Card
      // bg="white"
      overflow="hidden"
      mt={-10}
      mb={10}
      borderRadius="cardRadius"
      width="100%"
    >
      <Image
        src={showData.image_url}
        alt={
          showData.image_alt ? showData.image_alt : "Photo may not be available"
        }
        fallbackSrc="/images/placeholder.jpg"
        width="100%"
        height={{ base: "30vh", md: "50vh" }}
        objectFit="cover"
      />
      <Box p={8} display="flex" flexDirection={{ base: "column", md: "row" }} gap={{ base: "5", md: "50" }}>
        <Flex flexDirection="column">
          <Text textStyle="h2Bold">{showData.title}</Text>
          <Flex flexDirection="row">
            <Icon as={StarIcon}></Icon>
            <Text ml={2} textStyle="smallCaptionBold">
              {averageRating
                ? `${averageRating.toFixed(1)}/${maxRating}`
                : "No ratings"}
            </Text>{" "}
          </Flex>
        </Flex>
        <Text textStyle="smallCaption" textAlign="left" mt={2}>
          {showData.description}
        </Text>
      </Box>
    </Card>
  );
};
