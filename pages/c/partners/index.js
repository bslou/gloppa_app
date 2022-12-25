import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";
import BottomNavBar from "../bottomnavbar";
import NavBar from "../navbar";

const Partners = () => {
  const router = useRouter();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [email, setEmail] = useState("");
  const toast = useToast();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      router.push("/app/startuplist");
    }
  });

  const saveDBase = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      db.collection("partners").add({
        email: email,
      });
      setEmail("");
      toast({
        title: "Email registered!",
        description: "Email just registered to database!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      //toast wrong
      toast({
        title: "Email in wrong format!",
        description:
          "This email format is incorrect making it wrong and invalid!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      backgroundColor={"#1c1c1c"}
      width={"100vw"}
      minHeight={"100vh"}
    >
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Partner with us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => saveDBase(e)}>
              <Flex direction={"column"} alignItems={"center"} marginBottom={3}>
                <Text textAlign={"left"} width={"100%"}>
                  Email
                </Text>
                <Input
                  type={"text"}
                  autoComplete
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder={"one.example@gmail.com"}
                />
                <Button
                  colorScheme="blue"
                  width={100}
                  marginTop={3}
                  type={"submit"}
                >
                  Submit
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
        width={"90%"}
        marginTop={10}
      >
        <Text
          textAlign={"center"}
          color={"white"}
          fontWeight={900}
          fontSize={{ base: "34pt", md: "37pt", lg: "40pt" }}
        >
          Partner with Gloppa
        </Text>
        <Text
          textAlign={"center"}
          color={"white"}
          fontSize={{ base: "14pt", md: "17pt", lg: "20pt" }}
        >
          Companies should partner with Gloppa because our unique approach to
          startup acceleration combines the excitement and engagement of video
          games with the practical strategies and support needed for business
          success. By gamifying the startup process, we provide a fun and
          interactive way for entrepreneurs to learn and grow their businesses,
          while also fostering a sense of community and collaboration among our
          clients. Our team of experts has a wealth of experience in both the
          startup world and the gaming industry, making us uniquely qualified to
          help companies achieve their goals in a way that is both enjoyable and
          effective. Plus, our comprehensive services and resources ensure that
          our clients have access to the tools and support they need to succeed.
          Partnering with Gloppa is a win-win for any company looking to take
          their startup to the next level. If you'd rather prefer emailing, then
          our email is dreammateofficial@gmail.com. We look forward to
          connecting soon :)
        </Text>
        <Button
          width={{ base: 90, md: 120, lg: 150 }}
          height={{ base: 90, md: 120, lg: 150 }}
          backgroundColor={"#fff"}
          borderRadius={"50%"}
          color={"#000"}
          fontSize={{ base: "16pt", md: "19pt", lg: "22pt" }}
          onClick={onOpen2}
        >
          Get
          <br />
          Started
        </Button>
      </Flex>
      <BottomNavBar />
    </Flex>
  );
};

export default Partners;
