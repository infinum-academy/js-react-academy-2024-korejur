"use client";

import { Button, Flex, Text, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Flex direction="column" alignItems="center">
        <Image
          src="/images/logo_svg.svg"
          alt="TV Shows App logo"
          w={{base: "80vw", lg:"40vw"}}
          pb={5}
        ></Image>

        <Text textStyle="body" pb={{base: 5, md: 10}} textAlign="center">
          The World of All Your Favourite TV Shows
        </Text>

        <Flex direction="row" gap={10}>
          <Link href="/login" passHref>
            <Button>Login</Button>
          </Link>
          <Link href="/register" passHref>
            <Button>Register</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
