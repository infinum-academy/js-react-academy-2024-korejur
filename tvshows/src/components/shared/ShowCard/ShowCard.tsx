"use client";
import { IShow } from "@/typings/show.types";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Card, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const maxRating = "5";

interface IShowCardProps {
  show: IShow;
}

export const ShowCard = ({ show }: IShowCardProps) => {
  return (
    <Card
      as="a"
      color="#1a1a1a"
      borderRadius="10px"
      overflow="hidden"
      maxW="sm"
      width="200px"
      cursor="pointer"
    >
      <Link href={`/shows/${show.id}`} passHref>
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
          <Text fontSize="large" fontWeight="bold">
            {show.title}
          </Text>
          <Text fontSize="small" mt={2} fontWeight="semibold">
            <StarIcon mr={2} mb={1} />
            {show.average_rating
              ? `${show.average_rating.toFixed(1)} / ${maxRating}`
              : "No ratings"}
          </Text>
        </Box>
      </Link>
    </Card>
  );
};
