import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tag,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../../api/firebaseconfig";
import NavBar from "../navbar";

const StartupList = () => {
  const router = useRouter();
  const toast = useToast();
  const toast2 = useToast();

  const [oguname, setOgUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eml, setEml] = useState("");
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

  const changeData = (e) => {
    e.preventDefault();
    let nummers = db.collection("users").where("username", "==", uname);
    nummers
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty && uname != oguname) {
          toast({
            title: "Username exists.",
            description: "The username already exists in our database.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.log("Doesn't exist!");
          let id = localStorage.getItem("id");
          db.collection("users").doc(id).update({ username: uname });
          toast({
            title: "Username updated.",
            description: "The username got updated successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        // if (dataFetchedRef.current) return;
        // dataFetchedRef.current = true;
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .onSnapshot((val) => {
            let n = val.data();
            setUname(n.username);
            setOgUname(n.username);
            setEmail(n.email);
          });
      } else {
        setLoading(false);
      }
    }
  }, []);
  if (typeof window !== "undefined") {
    return (
      <Flex
        direction={"column"}
        backgroundColor={"#f2f2f2"}
        width={"100vw"}
        height={"100vh"}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor={"#fff"}>
            <ModalHeader color={"black"}>My info</ModalHeader>
            <ModalCloseButton color={"black"} />
            <ModalBody>
              <form onSubmit={changeData}>
                <Flex direction={"column"} alignItems={"center"} gap={"1vh"}>
                  <Flex
                    width={"95%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"0.3vw"}
                  >
                    <Text color={"black"}>Username: </Text>
                    <Input
                      color={"black"}
                      value={uname}
                      onChange={(e) => setUname(e.target.value.toLowerCase())}
                      minLength={4}
                      maxLength={12}
                    />
                  </Flex>
                  <Flex
                    width={"95%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"0.3vw"}
                  >
                    <Text color={"black"}>Email: </Text>
                    <Input
                      color={"black"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
                    />
                  </Flex>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"1vw"}
                    marginTop={3}
                    marginBottom={3}
                  >
                    <Button type="submit" colorScheme={"blue"}>
                      Change Information
                    </Button>
                    <Button
                      variant={"ghost"}
                      color={"black"}
                      colorScheme={"transparent"}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </Flex>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"1vw"}
                  >
                    <Button onClick={() => router.push("/app/email")}>
                      Email
                    </Button>
                    <Button onClick={Logout}>Logout</Button>
                  </Flex>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          backgroundColor={"#fff"}
          borderBottom={"1px solid #dfdfdf"}
          padding={"1vw"}
          paddingLeft={200}
        >
          <Button
            border={"none"}
            background={"transparent"}
            fontSize={{ base: "8pt", md: "10.5pt", lg: "13pt" }}
            fontWeight={600}
            color={"#202020"}
            colorScheme={"transparent"}
          >
            {/* 📦&nbsp;&nbsp;Product Review */}
            📧&nbsp;&nbsp;Email Gloppa
          </Button>
          {/* {localStorage.getItem("id") !== null ? (
            <Button
              border={"none"}
              _hover={{
                backgroundColor: "#efefef",
              }}
              fontSize={{ base: "18pt", md: "21pt", lg: "25pt" }}
              fontWeight={100}
              color={"#202020"}
              colorScheme={"transparent"}
              onClick={() => router.push("/app/startupregistration")}
            >
              +
            </Button>
          ) : (
            <Button onClick={() => router.push("/app/register")}>Join</Button>
          )} */}
        </Flex>
        <Flex
          position={"fixed"}
          direction={"column"}
          alignItems={"flex-start"}
          backgroundColor={"#fff"}
          borderRight={"1px solid #dfdfdf"}
          overflowY={"auto"}
          height={"100vh"}
          width={200}
          gap={30}
          paddingTop={"3vh"}
          paddingBottom={"3vh"}
        >
          <Button
            border={"none"}
            background={"transparent"}
            fontSize={"13pt"}
            fontWeight={600}
            color={"#202020"}
            colorScheme={"transparent"}
            onClick={() => router.push("/app/startuplist")}
          >
            Gloppa
          </Button>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/productreview")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                📦&nbsp;&nbsp;Product Review
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/updatereview")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                🆕&nbsp;&nbsp;Update Review
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/funding")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💸&nbsp;&nbsp;Funding
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/jobs")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💻&nbsp;&nbsp;Jobs
              </Text>
            </Button>
          </Flex>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/productivitymanagement")
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💼&nbsp;&nbsp;Productivity
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/fundingcam")
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                ⏺️&nbsp;&nbsp;Record Funding Pitch
              </Text>
            </Button>
          </Flex>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/messages")
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💬&nbsp;&nbsp;Private Messages
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/forum")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                📢&nbsp;&nbsp;Public Forum
              </Text>
            </Button>
          </Flex>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/education")
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                🎥&nbsp;&nbsp;Educational Videos
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? onOpen()
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                👤&nbsp;&nbsp;Profile
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Flex
          position={"absolute"}
          direction={"column"}
          alignItems={"center"}
          paddingTop={5}
          paddingBottom={5}
          marginLeft={{ base: 220, md: 250, lg: 300 }}
          width={"80%"}
          top={{ base: 45, md: 53, lg: 61 }}
        >
          <form onSubmit={(e) => sendEmail(e)}>
            <Flex
              backgroundColor={"#fff"}
              boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
              direction={"column"}
              alignItems={"center"}
              width={{ base: "70%", md: "80%", lg: "90%" }}
              padding={2}
              marginTop={5}
            >
              <Flex
                direction={"column"}
                alignItems={"left"}
                gap={4}
                marginTop={5}
              >
                <Flex direction={"column"}>
                  <Text
                    color={"black"}
                    fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
                    fontWeight={600}
                  >
                    Let’s make something great together
                  </Text>
                  <Text
                    color={"black"}
                    fontSize={{ base: "15pt", md: "17.5pt", lg: "20pt" }}
                    fontWeight={200}
                  >
                    We are looking forward to hearing from you! (📧&nbsp;
                    gloppaofficial@gmail.com)
                  </Text>
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={20}
                >
                  <FormControl isRequired>
                    <FormLabel color={"black"}>First Name</FormLabel>
                    <Input
                      required
                      height={50}
                      placeholder="First Name"
                      color={"white"}
                      value={firstName}
                      name={"first_name"}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color={"black"}>Last Name</FormLabel>
                    <Input
                      required
                      height={50}
                      placeholder="Last Name"
                      color={"white"}
                      value={lastName}
                      name={"last_name"}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={20}
                >
                  <FormControl>
                    <FormLabel color={"black"}>Email</FormLabel>
                    <Input
                      height={50}
                      type={"email"}
                      placeholder="Email"
                      color={"white"}
                      value={email}
                      name={"email"}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color={"black"}>Phone Number</FormLabel>
                    <Input
                      height={50}
                      placeholder="Phone Number"
                      color={"white"}
                      name={"phone"}
                    />
                  </FormControl>
                </Flex>
                <FormControl isRequired>
                  <FormLabel color={"black"}>Message</FormLabel>
                  <Textarea
                    required
                    resize={"none"}
                    height={150}
                    placeholder="Message"
                    name={"message"}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </FormControl>
              </Flex>
              <Button
                marginLeft={"32vw"}
                type={"submit"}
                mt={4}
                colorScheme="teal"
                padding={5}
                marginRight={"32.5vw"}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    );
  }
};

export default StartupList;
