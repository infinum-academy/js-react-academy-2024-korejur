"use client";
import { IShow } from "@/typings/show.types";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Card, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const maxRating = "5";

interface IShowCardProps {
  show: IShow;
  isClickable?: boolean;
}

export const ShowCard = ({ show, isClickable = true }: IShowCardProps) => {
  const content = (
    <>
      <Image
        src={show.image_url}
        alt={show.image_alt ? show.image_alt : "Photo may not be available"}
        fallbackSrc="/images/placeholder.jpg"
        width="100%"
        height="30vh"
        objectFit="cover"
        borderRadius="10px 10px 0 0"
      />
      <Box p={5} textAlign="left">
        <Text textStyle="subtitleBold">{show.title}</Text>
        <Text mt={2} textStyle="smallCaption">
          <StarIcon mr={2} mb={1} />
          {show.average_rating
            ? `${show.average_rating.toFixed(1)}/${maxRating}`
            : "No ratings"}
        </Text>
      </Box>
    </>
  );

  return (
    <Card overflow="hidden" maxW="sm" width="100%" cursor="pointer">
      {isClickable ? (
        <Link href={`/shows/${show.id}`} passHref>
          {content}
        </Link>
      ) : (
        content
      )}
    </Card>
  );
};
