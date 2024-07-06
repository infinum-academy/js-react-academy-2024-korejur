import { ShowDetails } from "@/components/features/shows/ShowDetails";
import styles from '../../public/styles/page.module.css';
import { Container } from "@chakra-ui/react";


export default function Home() {
  return (
    <main className={styles.main}>
      <Container
      ><ShowDetails /></Container>  
    </main>
  );
}