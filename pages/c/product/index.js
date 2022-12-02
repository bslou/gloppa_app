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
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const Product = () => {
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      width={"100vw"}
      backgroundColor={"#323232"}
    >
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
            >
              Join
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex marginTop={"90"} direction={"column"} alignItems={"center"}>
        <Image
          src={"/assets/pic.png"}
          alt={"Gloppa sample"}
          width={950}
          height={750}
        />
      </Flex>

      <Flex
        direction={"column"}
        alignItems={"center"}
        marginTop={15}
        marginBottom={15}
      >
        <Text
          color={"white"}
          fontSize={{ base: "23pt", md: "36pt", lg: "50pt" }}
          textAlign={"center"}
        >
          Welcome to your fun office!
        </Text>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={41}
          gap={10}
        >
          <Flex
            direction={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            width={{ base: 100, md: 225, lg: 350 }}
          >
            <Image
              src={"/assets/lineOne.png"}
              alt={"Gloppa line one"}
              width={350}
              height={2}
            />
            <Text
              fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
              color={"white"}
              fontWeight={600}
            >
              Goals
            </Text>
            <Text
              color={"white"}
              fontWeight={200}
              fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
            >
              Set short and long term goals you have for the startup.
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            width={{ base: 100, md: 225, lg: 350 }}
          >
            <Image
              src={"/assets/lineTwo.png"}
              alt={"Gloppa line two"}
              width={350}
              height={2}
            />
            <Text
              fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
              color={"white"}
              fontWeight={600}
            >
              Achieve
            </Text>
            <Text
              color={"white"}
              fontWeight={200}
              fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
            >
              Achieve your goals that you set easily through Gloppa
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            width={{ base: 100, md: 225, lg: 350 }}
            marginTop={47}
          >
            <Image
              src={"/assets/lineThree.png"}
              alt={"Gloppa line three"}
              width={350}
              height={2}
            />
            <Text
              fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
              color={"white"}
              fontWeight={600}
            >
              Game
            </Text>
            <Text
              color={"white"}
              fontWeight={200}
              fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
            >
              Play a fun game, and have fun during the process of building a
              startup
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        marginTop={40}
        width={"100vw"}
        height={"100vh"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        bgGradient="linear(to-r, #00E7A1, #0049B6)"
      >
        <Image
          src={"/assets/game.png"}
          alt={"Gloppa game"}
          width={100}
          height={100}
        />
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            color={"white"}
            fontWeight={200}
            fontSize={"25pt"}
            textAlign={"center"}
          >
            Gloppa is your startup
            <br />
            entertainment center
          </Text>
        </Flex>
        <Flex gap={5} direction={"column"} marginTop={10}>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            <Image
              src={"/assets/money.png"}
              alt="Gloppa money"
              width={"40"}
              height={"40"}
            />
            <Text color={"white"} fontWeight={200} fontSize={"18pt"}>
              Earn coins and upgrade
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            <Image
              src={"/assets/party.png"}
              alt="Gloppa money"
              width={"40"}
              height={"40"}
            />
            <Text color={"white"} fontWeight={200} fontSize={"18pt"}>
              Have fun and enjoy
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            <Image
              src={"/assets/mission.png"}
              alt="Gloppa money"
              width={"40"}
              height={"40"}
            />
            <Text color={"white"} fontWeight={200} fontSize={"18pt"}>
              Achieve startup goals
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        backgroundColor={"black"}
        padding={7}
        width={"100vw"}
        fontSize={"14pt"}
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

export default Product;
