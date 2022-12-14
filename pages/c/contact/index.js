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
  Textarea,
  Link,
  IconButton,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { auth, db } from "../../api/firebaseconfig";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Contact = () => {
  const toast2 = useToast();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .get()
        .then((val) => {
          if (!val.exists) return;
          if (typeof val.get("premium")[0] !== "undefined") {
            // does not exist
            if (val.get("premium")[0] == "fulltime") {
              router.push("/app/startuplist");
            } else if (val.get("premium")[0] == "parttime") {
              const date1 = new Date(String(val.get("premium")[1]));
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
              var yyyy = today.getFullYear();

              today = mm + "/" + dd + "/" + yyyy;
              const date2 = new Date(String(today));
              const diffTime = Math.abs(date2 - date1);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays <= 31) {
                router.push("/app/startuplist");
              } else {
                //router.push("/app/pricing");
              }
            }
          }
        });
    }
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bmjv4hd",
        "template_2ip0ncm",
        e.target,
        "JfLC0fGpwy8w9QTCJ"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast2({
            title: "Message submitted!",
            description: "The message successfully submitted!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setEmail("");
          setPhone("");
          setFirstName("");
          setLastName("");
          setMsg("");
        },
        (error) => {
          console.log(error.text);
          toast2({
            title: "Message did not submit!",
            description: "There was some error so the message did not submit!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
  };
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");
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

      <Flex direction={"column"} alignItems={"center"} gap={"11vh"}>
        <Flex
          marginTop={"50"}
          direction={"column"}
          alignItems={"center"}
          gap={11}
        >
          <Image
            src={"/assets/topBent.png"}
            alt={"Gloppa Bent"}
            width={500}
            height={20}
          />
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            fontWeight={600}
            textAlign={"center"}
            fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
          >
            Let's make something
            <br />
            great together
          </Text>
          <Text
            fontWeight={300}
            textAlign={"center"}
            fontSize={{ base: "15pt", md: "20pt", lg: "30pt" }}
          >
            We are looking forward
            <br />
            to hearing from you!
          </Text>
        </Flex>
        <form
          onSubmit={(e) => {
            sendEmail(e);
          }}
        >
          <Flex direction={"column"} alignItems={"center"} gap={7}>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={10}
            >
              <Flex
                direction={"column"}
                alignItems={"left"}
                width={{ base: 140, md: 310, lg: 450 }}
                gap={1}
              >
                <Text>First Name *</Text>
                <Input
                  borderColor={"#808080"}
                  required
                  paddingTop={6}
                  paddingBottom={6}
                  value={firstName}
                  name={"first_name"}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Flex>
              <Flex
                direction={"column"}
                alignItems={"left"}
                width={{ base: 140, md: 310, lg: 450 }}
                gap={1}
              >
                <Text>Last Name *</Text>
                <Input
                  borderColor={"#808080"}
                  required
                  paddingTop={6}
                  paddingBottom={6}
                  value={lastName}
                  name={"last_name"}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Flex>
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={10}
            >
              <Flex
                direction={"column"}
                alignItems={"left"}
                width={{ base: 140, md: 310, lg: 450 }}
                gap={1}
              >
                <Text>Email</Text>
                <Input
                  borderColor={"#808080"}
                  paddingTop={6}
                  paddingBottom={6}
                  value={email}
                  name={"email"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Flex>
              <Flex
                direction={"column"}
                alignItems={"left"}
                width={{ base: 140, md: 310, lg: 450 }}
                gap={1}
              >
                <Text>Phone Number</Text>
                <Input
                  paddingTop={6}
                  paddingBottom={6}
                  borderColor={"#808080"}
                  value={phone}
                  name={"phone"}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Flex>
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={10}
            >
              <Flex
                direction={"column"}
                alignItems={"left"}
                width={{ base: 330, md: 750, lg: 940 }}
                gap={1}
              >
                <Text>Message *</Text>
                <Textarea
                  height={200}
                  required
                  paddingTop={6}
                  paddingBottom={6}
                  borderColor={"#808080"}
                  name={"message"}
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                />
              </Flex>
            </Flex>
            <Button
              type="submit"
              color={"white"}
              backgroundColor={"#A6CBEB"}
              paddingLeft={9}
              paddingRight={9}
              paddingTop={6}
              paddingBottom={6}
              fontSize={"18pt"}
            >
              Send
            </Button>
          </Flex>
        </form>
      </Flex>

      <Flex marginTop={"90"} direction={"column"} alignItems={"center"}>
        <Image
          src={"/assets/bottom.png"}
          alt={"Gloppa Bottom"}
          width={500}
          height={20}
        />
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

export default Contact;
