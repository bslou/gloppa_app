import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import BottomNavBar from "../bottomnavbar";
import NavBar from "../navbar";
import NextLink from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Careers = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      router.push("/app/startuplist");
    }
  });
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      backgroundColor={"#fafafa"}
      width={"100vw"}
      justifyContent={"center"}
    >
      <NavBar />
      <Flex
        marginTop={10}
        direction={"column"}
        alignItems={"left"}
        width={"60%"}
        gap={5}
      >
        <Text color={"black"} fontSize={"30pt"} fontWeight={500}>
          Join our journey
        </Text>
        <Text color={"black"} fontSize={"18pt"} fontWeight={300}>
          We’re determined to help people enjoy creating startups!
        </Text>
        <Image
          src={"/assets/teamcollab.png"}
          alt={"Team Collab"}
          width={900}
          height={700}
        />
        <Flex direction={"column"} alignItems={"left"} gap={7}>
          <Text
            fontWeight={600}
            fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
            color={"#000"}
          >
            Open Positions
          </Text>
          <Text
            fontWeight={600}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
            color={"#000"}
          >
            Engineering
          </Text>
          <NextLink
            href={"https://tally.so/r/3q5bz9"}
            passHref
            target={"_blank"}
          >
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
                color: "black",
              }}
            >
              <Text
                color={"#8E9AFF"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Backend Developer
              </Text>
              <Text
                color={"#202020"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Develop Firebase Backend * Contract
              </Text>
            </Flex>
          </NextLink>
          <NextLink
            href={"https://tally.so/r/n9Nd4V"}
            target={"_blank"}
            passHref
          >
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
                color: "black",
              }}
            >
              <Text
                color={"#8E9AFF"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Frontend Developer
              </Text>
              <Text
                color={"#202020"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Develop React Chakra Frontend * Contract
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex direction={"column"} alignItems={"left"} gap={7} marginTop={5}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
            color={"#000"}
          >
            Designer
          </Text>
          <NextLink
            href={"https://tally.so/r/m6DdVJ"}
            passHref
            target={"_blank"}
          >
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
                color: "black",
              }}
            >
              <Text
                color={"#8E9AFF"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                UI/UX Designer
              </Text>
              <Text
                color={"#202020"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Design future releases using Figma * Part-Time
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex direction={"column"} alignItems={"left"} gap={7} marginTop={5}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
            color={"#000000"}
          >
            Marketing
          </Text>
          <NextLink
            href={"https://tally.so/r/wkbYre"}
            passHref
            target={"_blank"}
          >
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
                color: "black",
              }}
            >
              <Text
                color={"#8E9AFF"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Marketer and PR
              </Text>
              <Text
                color={"#202020"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Send email and get in touch * Contract
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex direction={"column"} alignItems={"left"} gap={7} marginTop={5}>
          <Text
            fontWeight={600}
            color={"black"}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
          >
            Social Media
          </Text>
          <NextLink
            href={"https://tally.so/r/3yXl7x"}
            passHref
            target={"_blank"}
          >
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
                color: "black",
              }}
            >
              <Text
                color={"#8E9AFF"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Social Media Manager
              </Text>
              <Text
                color={"#202020"}
                fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
              >
                Post on Twitter and LinkedIn * Internship
              </Text>
            </Flex>
          </NextLink>
        </Flex>
      </Flex>
      <BottomNavBar />
    </Flex>
  );
};

export default Careers;
