import { Button, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import NavBar from "../navbar";
import BottomNavBar from "../bottomnavbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Main = () => {
  const router = useRouter();
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log("we are running on the client");
      if (localStorage.getItem("id") !== null) {
        router.push("/app/startuplist");
      }
    }
  });
  return (
    <Flex width={"100vw"} backgroundColor={"#fafafa"} direction={"column"}>
      <NavBar />
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={20}
        height={"90vh"}
        width={"100%"}
        paddingLeft={5}
        paddingRight={5}
      >
        <Flex width={"33%"}>
          <Image
            src={"/assets/left.png"}
            alt={"Gloppa Left factory"}
            width={350}
            height={350}
            layout={"responsive"}
          />
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"70%"}
          gap={4}
        >
          <Text
            fontWeight={900}
            color={"black"}
            fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
            textAlign={"center"}
          >
            The secret ingredient for company success
          </Text>
          <Text
            fontWeight={300}
            color={"black"}
            fontSize={{ base: "12pt", md: "18pt", lg: "23pt" }}
            textAlign={"center"}
          >
            Gloppa provides all the necessary resources and support for
            companies to achieve success.
          </Text>
          <Button
            backgroundColor={"white"}
            color={"black"}
            fontWeight={600}
            fontSize={"25pt"}
            paddingLeft={8}
            paddingRight={8}
            height={"8vh"}
            borderRadius={0}
            onClick={() => router.push("/app/register")}
            boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          >
            Get Started
          </Button>
        </Flex>
        <Flex width={"33%"}>
          <Image
            src={"/assets/right.png"}
            alt={"Gloppa Right factory"}
            width={250}
            height={250}
            layout={"responsive"}
          />
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          id={"first"}
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/one.png"}
            alt={"Gloppa Companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Fun organizing work
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            Compete with others and develop your factory while completing
            company tasks.
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Find and post jobs
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            Create job posts and find companies to work for and earn money.
          </Text>
        </Flex>
        <Flex
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/four.png"}
            alt={"Gloppa companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/two.png"}
            alt={"Gloppa Companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Get product review
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            Get your product reviewed and get corrections and critiques for how
            to improve it.
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Receive funds
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            Attract investors and receive funds through Gloppa.
          </Text>
        </Flex>
        <Flex
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/three.png"}
            alt={"Gloppa Companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/five.png"}
            alt={"Gloppa Companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Connect between your cofounders and team
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            With our private messaging platform you can contact and connect with
            your team on various tasks.
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Access a public forum
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            With the public forum users can discuss various aspects of companies
            and the mentality involved to succeed.
          </Text>
        </Flex>
        <Flex
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/six.png"}
            alt={"Gloppa Companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        gap={10}
      >
        <Flex
          width={"60%"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Image
            src={"/assets/seven.png"}
            alt={"Gloppa Companies"}
            width={900}
            height={500}
            layout={"responsive"}
          />
        </Flex>
        <Flex
          width={"30%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
        >
          <Text
            color={"black"}
            fontWeight={800}
            fontSize={{ base: "17pt", md: "21pt", lg: "25pt" }}
            textAlign={"center"}
          >
            Learn from professionals
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "12pt", md: "15pt", lg: "18pt" }}
            textAlign={"center"}
          >
            Using our videos for creating startups/developing companies, you can
            educate yourself on how to best succeed from professionals.
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={10}
        marginBottom={50}
      >
        <Text
          fontWeight={900}
          color={"black"}
          fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
          textAlign={"center"}
          width={"75%"}
        >
          Are you ready to take the next step in your startup/company journey?
        </Text>
        <Button
          backgroundColor={"white"}
          color={"black"}
          fontWeight={600}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          borderRadius={0}
          fontSize={"25pt"}
          paddingLeft={8}
          paddingRight={8}
          height={"8vh"}
          onClick={() => router.push("/app/register")}
        >
          Get Started
        </Button>
      </Flex>
      <BottomNavBar />
    </Flex>
  );
};

export default Main;
