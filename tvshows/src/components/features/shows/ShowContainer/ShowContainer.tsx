import { ShowReviewSection } from "@/components/features/review/ShowReviewSection/ShowReviewSection";
import { Container } from "@chakra-ui/react";
import { ShowDetailsCard } from "../ShowDetailsCard/ShowDetailsCard";

export const ShowContainer = () => {
  return (
    <Container
      maxW="container.lg"
      backgroundColor="#1e024d"
      textColor="aliceblue"
      p="5vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <ShowDetailsCard />
      <ShowReviewSection />
    </Container>
  );
};
