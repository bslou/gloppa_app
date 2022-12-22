import { Button, Flex, Input, Link, Text, useToast } from "@chakra-ui/react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { arrayRemove } from "firebase/firestore";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";

const Login = () => {
  const router = useRouter();
  const [eml, setEml] = useState("");
  const toast = useToast();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      auth
        .sendPasswordResetEmail(eml)
        .then(function (a) {
          router.push("/app/login");
          toast({
            title: "Email sent.",
            description: "The email was sent successfully to you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch(function (e) {
          toast({
            title: "Error here.",
            description: "The error is:  " + error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (error) {
      setError(error.message);
      toast({
        title: "Error here.",
        description: "The error is:  " + error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      direction={"column"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Flex
          direction={"column"}
          width={{ base: "70vw", md: "50vw", lg: "50vw" }}
          height={"95vh"}
          backgroundColor={"#1C1C1C"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={20}
          boxShadow={"0px 0px 10px 5px rgb(255, 255, 255, 0.75)"}
        >
          <NextLink href={"/"}>
            <Link
              color={"white"}
              fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
              fontWeight={400}
            >
              Gloppa
            </Link>
          </NextLink>
          <Text
            color={"white"}
            fontWeight={600}
            fontSize={{ base: "35pt", md: "45pt", lg: "55pt" }}
            textAlign={"center"}
          >
            Reset Password
          </Text>
          <Text
            color={"white"}
            marginTop={2}
            marginBottom={2}
            textAlign={"center"}
          >
            To reset your password, we will <br />
            send you an email, and for this we need your email.
          </Text>
          <Flex
            direction={"column"}
            alignItems={"center"}
            gap={5}
            width={"100%"}
          >
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              width={"80%"}
            >
              <Text
                color={"white"}
                fontSize={{ base: "10pt", md: "15pt", lg: "20pt" }}
              >
                Email
              </Text>
              <Input
                borderRadius={7}
                type={"email"}
                background={"white"}
                fontSize={"17pt"}
                height={50}
                required
                onChange={(e) => {
                  setEml(e.target.value);
                }}
              />
            </Flex>
          </Flex>

          <Button
            type={"submit"}
            color={"white"}
            backgroundColor={"#5686E1"}
            borderRadius={5}
            fontWeight={600}
            fontSize={"20pt"}
            paddingLeft={10}
            paddingRight={10}
            paddingBottom={7}
            paddingTop={7}
            marginTop={4}
          >
            Reset Password
          </Button>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            marginTop={4}
          >
            <Text color={"white"}>Do not have an account? </Text>
            <NextLink href={"/app/register"}>
              <Link color={"#5686E1"}>Register</Link>
            </NextLink>
            <Text color={"white"}>.</Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Text color={"white"}>Have an account? </Text>
            <NextLink href={"/app/login"}>
              <Link color={"#5686E1"}>Log-in</Link>
            </NextLink>
            <Text color={"white"}>.</Text>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
