import styles from "../../public/styles/page.module.css";
import { Container, Flex, Text } from "@chakra-ui/react";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <Flex minHeight="100vh" alignItems="center" justifyContent="center" p={5}>
        <Container
          maxW="container.lg"
          textAlign="center"
          p={5}
          borderRadius="md"
        >
          <Text fontSize="4xl" as="b">
            TV Shows App
          </Text>
          <ShowReviewSection />
        </Container>
      </Flex>
    </main>
  );
}
