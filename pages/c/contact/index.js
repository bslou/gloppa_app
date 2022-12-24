import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomNavBar from "../bottomnavbar";
import emailjs from "@emailjs/browser";
import NavBar from "../navbar";

const Contact = () => {
  const toast2 = useToast();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      router.push("/app/startuplist");
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
    <Flex
      direction={"column"}
      alignItems={"center"}
      backgroundColor={"#1c1c1c"}
      width={"100vw"}
      justifyContent={"center"}
    >
      <NavBar />
      <form onSubmit={(e) => sendEmail(e)}>
        <Flex
          direction={"column"}
          alignItems={"left"}
          width={"70vw"}
          gap={8}
          marginTop={5}
        >
          <Flex direction={"column"}>
            <Text color={"white"} fontSize={"28pt"} fontWeight={600}>
              Let’s make something great together
            </Text>
            <Text color={"white"} fontSize={"20pt"} fontWeight={200}>
              We are looking forward to hearing from you! (📧&nbsp;
              gloppaglow@gmail.com)
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={20}
          >
            <FormControl isRequired>
              <FormLabel color={"white"}>First Name</FormLabel>
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
              <FormLabel color={"white"}>Last Name</FormLabel>
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
              <FormLabel color={"white"}>Email</FormLabel>
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
              <FormLabel color={"white"}>Phone Number</FormLabel>
              <Input
                height={50}
                placeholder="Phone Number"
                color={"white"}
                name={"phone"}
              />
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <FormLabel color={"white"}>Message</FormLabel>
            <Textarea
              required
              resize={"none"}
              height={150}
              placeholder="Message"
              color={"white"}
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
        >
          Submit
        </Button>
      </form>

      <BottomNavBar />
    </Flex>
  );
};

export default Contact;
