import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  useToast,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { auth, db } from "../../api/firebaseconfig";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Careers = () => {
  const [display2, changeDisplay2] = useState("none");
  const [display, changeDisplay] = useState("none");

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      // db.collection("users")
      //   .doc(localStorage.getItem("id"))
      //   .get()
      //   .then((val) => {
      //     if (!val.exists) return;
      //     if (typeof val.get("premium")[0] !== "undefined") {
      //       // does not exist
      //       if (val.get("premium")[0] == "fulltime") {
      //         router.push("/app/startuplist");
      //       } else if (val.get("premium")[0] == "parttime") {
      //         const date1 = new Date(String(val.get("premium")[1]));
      //         var today = new Date();
      //         var dd = String(today.getDate()).padStart(2, "0");
      //         var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      //         var yyyy = today.getFullYear();

      //         today = mm + "/" + dd + "/" + yyyy;
      //         const date2 = new Date(String(today));
      //         const diffTime = Math.abs(date2 - date1);
      //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //         if (diffDays <= 31) {
      router.push("/app/startuplist");
      //       } else {
      //         //router.push("/app/pricing");
      //       }
      //     }
      //   }
      // });
    }
  });
  return (
    <Flex direction={"column"} alignItems={"center"} width={"100vw"}>
      {/**Desktop */}
      <Flex
        direction={"row"}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"#000"}
        padding={"4"}
        position={"fixed"}
        top={0}
        left={0}
        as="nav"
        zIndex={100}
      >
        <NextLink href={"/"}>
          <Link color={"white"} fontWeight={600} fontSize={"20pt"}>
            Gloppa
          </Link>
        </NextLink>
        <Flex
          direction={"row"}
          alignItems={"center"}
          gap={"10"}
          display={["none", "none", "flex", "flex"]}
        >
          <NextLink href={"/c/product"}>
            <Link color={"white"}>Product</Link>
          </NextLink>
          <NextLink href={"/c/about"}>
            <Link color={"white"}>About</Link>
          </NextLink>
          <NextLink href={"/c/partners"}>
            <Link color={"white"}>Partners</Link>
          </NextLink>
          <NextLink href={"/c/careers"}>
            <Link color={"white"}>Careers</Link>
          </NextLink>
          <NextLink href={"/c/contact"}>
            <Link color={"white"}>Contact</Link>
          </NextLink>

          <Button
            backgroundColor={"#0094FF"}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={2}
            paddingBottom={2}
            color={"black"}
            borderRadius={20}
            onClick={() => router.push("/app/register")}
          >
            Join
          </Button>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
        {/**Mobile */}

        <Flex
          w="100vw"
          display={display}
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/" passHref>
              <Button
                fontWeight={600}
                fontSize={"20pt"}
                as="a"
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Gloppa
              </Button>
            </NextLink>

            <NextLink href="/c/product" passHref>
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                Product
              </Button>
            </NextLink>

            <NextLink href="/c/about" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                About
              </Button>
            </NextLink>

            <NextLink href="/c/partners" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Partners
              </Button>
            </NextLink>

            <NextLink href="/c/careers" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Careers
              </Button>
            </NextLink>

            <NextLink href="/c/contact" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Contact
              </Button>
            </NextLink>

            <Button
              backgroundColor={"#0094FF"}
              paddingLeft={5}
              paddingRight={5}
              paddingTop={2}
              paddingBottom={2}
              color={"black"}
              borderRadius={20}
              onClick={() => router.push("/app/register")}
            >
              Join
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction={"column"} alignItems={"center"} marginTop={130} gap={3}>
        <Text
          fontWeight={600}
          fontSize={{ base: "24pt", md: "32pt", lg: "40pt" }}
        >
          Join our journey
        </Text>
        <Text
          fontSize={{ base: "18pt", md: "22pt", lg: "28pt" }}
          fontWeight={200}
          textAlign={"center"}
        >
          We’re determined to help
          <br />
          people enjoy creating startups!
        </Text>
        <Image
          src={"/assets/careersImage.png"}
          alt={"Gloppa careers image"}
          width={1000}
          height={800}
        />
        <Text
          fontWeight={600}
          fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
        >
          Open Positions
        </Text>
        <Flex direction={"column"} alignItems={"center"} gap={7}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
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
              alignItems={"center"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              <Text
                color={"#001AFF"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Backend Developer
              </Text>
              <Text
                color={"#808080"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
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
              alignItems={"center"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              <Text
                color={"#001AFF"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Frontend Developer
              </Text>
              <Text
                color={"#808080"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Develop React Chakra Frontend * Contract
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex direction={"column"} alignItems={"center"} gap={7} marginTop={5}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
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
              alignItems={"center"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              <Text
                color={"#001AFF"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                UI/UX Designer
              </Text>
              <Text
                color={"#808080"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Design future releases using Figma * Part-Time
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex direction={"column"} alignItems={"center"} gap={7} marginTop={5}>
          <Text
            fontWeight={600}
            fontSize={{ base: "14pt", md: "18pt", lg: "23pt" }}
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
              alignItems={"center"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              <Text
                color={"#001AFF"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Marketer and PR
              </Text>
              <Text
                color={"#808080"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Send email and get in touch * Contract
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex direction={"column"} alignItems={"center"} gap={7} marginTop={5}>
          <Text
            fontWeight={600}
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
              alignItems={"center"}
              justifyContent={"center"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              <Text
                color={"#001AFF"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Social Media Manager
              </Text>
              <Text
                color={"#808080"}
                fontSize={{ base: "12pt", md: "14pt", lg: "18pt" }}
              >
                Post on Twitter and LinkedIn * Internship
              </Text>
            </Flex>
          </NextLink>
        </Flex>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        backgroundColor={"black"}
        padding={7}
        width={"100vw"}
        fontSize={"14pt"}
        marginTop={100}
        justify="space-between"
      >
        <NextLink href={"/"}>
          <Link
            color={"white"}
            fontWeight={700}
            fontSize={"25pt"}
            marginRight={"33vw"}
          >
            Gloppa
          </Link>
        </NextLink>
        <Flex
          direction={"row"}
          alignItems={"center"}
          gap={20}
          display={["none", "none", "none", "none", "flex"]}
        >
          <NextLink
            href={"https://www.linkedin.com/in/benjamin-sloutsky-9b9b09235/"}
            target={"_blank"}
            passHref
          >
            <Link color={"white"}>LinkedIn</Link>
          </NextLink>
          <NextLink
            href={"https://twitter.com/GloppaG"}
            target={"_blank"}
            passHref
          >
            <Link color={"white"}>Twitter</Link>
          </NextLink>
          <NextLink href={"/c/terms"}>
            <Link color={"white"}>Terms</Link>
          </NextLink>
          <NextLink href={"/c/privacy"}>
            <Link color={"white"}>Privacy</Link>
          </NextLink>
          <Text color={"white"} width={"10vw"} fontSize={"13pt"}>
            ©Gloppa, 2022 All rights reserved
          </Text>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay2("flex")}
          display={["flex", "flex", "flex", "flex", "none"]}
        />
        {/**Mobile */}

        <Flex
          w="100vw"
          display={display2}
          bgColor="gray.50"
          zIndex={2000000}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay2("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/" passHref>
              <Button
                fontWeight={600}
                fontSize={"20pt"}
                as="a"
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Gloppa
              </Button>
            </NextLink>

            <NextLink
              href={"https://www.linkedin.com/in/benjamin-sloutsky-9b9b09235/"}
              target={"_blank"}
              passHref
            >
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                LinkedIn
              </Button>
            </NextLink>

            <NextLink
              href={"https://twitter.com/GloppaG"}
              target={"_blank"}
              passHref
            >
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Twitter
              </Button>
            </NextLink>

            <NextLink href={"/c/terms"} passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Terms
              </Button>
            </NextLink>

            <NextLink href="/c/privacy" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Privacy
              </Button>
            </NextLink>

            <Text color={"white"} width={"10vw"} fontSize={"13pt"}>
              ©Gloppa, 2022 All rights reserved
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Careers;
