import { ShowReviewSection } from "@/components/features/review/ShowReviewSection/ShowReviewSection";
import { Container } from "@chakra-ui/react";
import { ShowDetailsCard } from "../ShowDetailsCard/ShowDetailsCard";

export const ShowContainer = () => {
  return (
    <Container
      maxW="container.lg"
      px={{ base: "0", md: "5vh" }}
      py="5vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <ShowDetailsCard />
      <ShowReviewSection />
    </Container>
  );
};
