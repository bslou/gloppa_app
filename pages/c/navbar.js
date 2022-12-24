import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [display, changeDisplay] = useState("none");
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      paddingLeft={8}
      paddingRight={8}
      paddingTop={5}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={8}
      >
        <Link color={"white"} fontSize={"16pt"}>
          <NextLink href={"/c/main"}>Gloppa</NextLink>
        </Link>
        <Link color={"white"} fontSize={"16pt"}>
          <NextLink href={"/c/main/#first"}>Product</NextLink>
        </Link>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={8}
        display={["none", "none", "flex", "flex"]}
      >
        <Link color={"white"} fontSize={"16pt"}>
          <NextLink href={"/c/partners"}>Partner</NextLink>
        </Link>
        <Link color={"white"} fontSize={"16pt"}>
          <NextLink href={"/c/careers"}>Careers</NextLink>
        </Link>
        <Link color={"white"} fontSize={"16pt"}>
          <NextLink href={"/c/contact"}>Contact</NextLink>
        </Link>
        <Link color={"white"} fontSize={"16pt"}>
          <NextLink href={"/app/register"}>Join</NextLink>
        </Link>
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
        bgColor="#1c1c1c"
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
              colorScheme={"transparent"}
              color={"white"}
              aria-label="Home"
              my={5}
              w="100%"
            >
              Gloppa
            </Button>
          </NextLink>
          <NextLink href="/c/main#first" passHref>
            <Button
              as="a"
              variant="ghost"
              colorScheme={"transparent"}
              color={"white"}
              aria-label="Contact"
              my={5}
              onClick={() => changeDisplay("flex")}
              w="100%"
            >
              Product
            </Button>
          </NextLink>

          <NextLink href="/c/partners" passHref>
            <Button
              as="a"
              variant="ghost"
              colorScheme={"transparent"}
              color={"white"}
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
              colorScheme={"transparent"}
              color={"white"}
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
              colorScheme={"transparent"}
              color={"white"}
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
            colorScheme={"transparent"}
            color={"white"}
            borderRadius={20}
            onClick={() => router.push("/app/register")}
          >
            Get Started
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
