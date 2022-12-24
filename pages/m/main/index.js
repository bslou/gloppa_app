import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, Link, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";

//hydration error is caused by the nextlink!!!

const Home = () => {
  const router = useRouter();
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log("we are running on the client");
      if (localStorage.getItem("id") !== null) {
        //   db.collection("users")
        //     .doc(localStorage.getItem("id"))
        //     .get()
        //     .then((val) => {
        //       if (!val.exists) return;
        //       if (typeof val.get("premium")[0] !== "undefined") {
        //         // does not exist
        //         if (val.get("premium")[0] == "fulltime") {
        router.push("/app/startuplist");
        // } else if (val.get("premium")[0] == "parttime") {
        //   const date1 = new Date(String(val.get("premium")[1]));
        //   var today = new Date();
        //   var dd = String(today.getDate()).padStart(2, "0");
        //   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        //   var yyyy = today.getFullYear();

        //   today = mm + "/" + dd + "/" + yyyy;
        //   const date2 = new Date(String(today));
        //   const diffTime = Math.abs(date2 - date1);
        //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //   if (diffDays <= 31) {
        //     router.push("/app/startuplist");
        //   } else {
        //     //router.push("/app/pricing");
        //   }
      }
    }
  });
  //     }
  //   } else {
  //     console.log("we are running on the server");
  //   }
  // });

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
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        alignItems={"center"}
        backgroundSize={"100% 100%"}
        width={"100vw"}
        height={{ base: 550, md: 750, lg: 940 }}
        marginTop={"70"}
        backgroundImage={"url(/assets/backg.png)"}
        gap={10}
      >
        <Text
          fontSize={{ base: "60pt", md: "80pt", lg: "100pt" }}
          fontWeight={800}
          color={"white"}
          marginTop={10}
          textShadow={"2px 8px 4px rgba(0,0,0,0.6)"}
        >
          Gloppa
        </Text>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            color={"white"}
            fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
            textAlign={"center"}
          >
            Launching a startup is like playing
            <br />a video game
          </Text>
        </Flex>
        <Button
          backgroundColor={"black"}
          color={"white"}
          fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
          padding={"8"}
          borderRadius={20}
          fontWeight={600}
          onClick={() => router.push("/app/register")}
        >
          Get Started
        </Button>
      </Flex>
      <Flex marginTop={10} marginBottom={10} borderRadius={10}>
        <Image
          src={"/assets/pic.png"}
          layout={"responsive"}
          width={800}
          height={600}
          alt={"Gloppa Sample"}
        />
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"80vw"}
        gap={5}
        marginTop={50}
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "22pt", md: "32pt", lg: "42pt" }}
        >
          Easy and fun way of creating a startup
        </Text>
        <Text
          fontWeight={200}
          fontSize={{ base: "15pt", md: "25pt", lg: "35pt" }}
          textAlign={"center"}
        >
          Gloppa makes the process of creating a startup as fun as creating a
          video game! Having fun not only makes you happier but also helps you
          faster progress through advancing your startup!
        </Text>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={75}
        width={"100vw"}
      >
        <Flex width={{ base: 200, md: 250, lg: 300 }}>
          <Image
            src={"/assets/right.png"}
            width={300}
            height={1000}
            alt="Gloppa right"
          />
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"60vw"}
          gap={10}
        >
          <Flex direction={"column"} alignItems={"center"}>
            <Text
              fontWeight={700}
              fontSize={{ base: "22pt", md: "32pt", lg: "42pt" }}
              textAlign={"center"}
            >
              Do you want in?
            </Text>
            <Text
              fontSize={{ base: "15pt", md: "25pt", lg: "35pt" }}
              fontWeight={200}
              textAlign={"center"}
            >
              We'll make sure
              <br />
              your startup experience
              <br />
              is better than ever!
            </Text>
          </Flex>
          <Button
            width={{ base: 100, md: 125, lg: 150 }}
            height={{ base: 100, md: 125, lg: 150 }}
            backgroundColor={"black"}
            borderRadius={"50%"}
            color={"white"}
            fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
            onClick={() => router.push("/app/register")}
          >
            Get
            <br />
            Started
          </Button>
        </Flex>
        <Flex width={{ base: 200, md: 250, lg: 300 }}>
          <Image src={"/assets/left.png"} width={300} height={1000} />
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

export default Home;
