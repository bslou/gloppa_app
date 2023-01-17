import { Button, Flex, Input, Link, Text, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { isMobile } from "react-device-detect";

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const [eml, setEml] = useState("");
  const [pwd, setPwd] = useState("");
  const [uname, setUname] = useState("");
  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      router.push("/app/startuplist");
    }
  });
  const RegSubmit = (e) => {
    e.preventDefault();
    let nummers = db.collection("users").where("username", "==", uname);
    nummers
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          toast({
            title: "Username exists.",
            description: "The username already exists in our database.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.log("Doesn't exist!");
          createUserWithEmailAndPassword(auth, eml, pwd)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              db.collection("users").doc(user.uid).set({
                email: eml,
                username: uname,
                //premium: {},
                startups: [],
                fundingStartupId: [],
                productReviewStartupId: [],
              });
              localStorage.setItem("id", user.uid);
              //uncomment line below later
              //localStorage.setItem("id", user.uid)
              router.push("/app/startuplist");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("Error " + errorMessage);
              toast({
                title: "Error occured!",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });

              // ..
            });
        }
      })
      .catch((err) => {
        console.log("Error " + err);
        toast({
          title: "Error occured!",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      direction={"column"}
      width={"100vw"}
      height={!isMobile ? "100vh" : "100%"}
      backgroundColor={"#f2f2f2"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <form onSubmit={(e) => RegSubmit(e)}>
        <Flex
          direction={"column"}
          width={{ base: "70vw", md: "50vw", lg: "50vw" }}
          height={!isMobile ? "95vh" : "auto"}
          backgroundColor={"#fff"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={0}
          boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
        >
          <NextLink href={"/"}>
            <Link
              color={"black"}
              fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
              fontWeight={600}
            >
              Gloppa
            </Link>
          </NextLink>
          <Text
            color={"black"}
            fontWeight={200}
            fontSize={{ base: "35pt", md: "45pt", lg: "55pt" }}
            textAlign={"center"}
          >
            Get Started
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
                color={"black"}
                fontSize={{ base: "10pt", md: "15pt", lg: "20pt" }}
              >
                Username
              </Text>
              <Input
                borderRadius={7}
                type={"text"}
                background={"white"}
                fontSize={"17pt"}
                height={50}
                required
                value={uname}
                onChange={(e) => {
                  setUname(e.target.value.toLowerCase());
                }}
                minLength={4}
                maxLength={12}
              />
            </Flex>
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              width={"80%"}
            >
              <Text
                color={"black"}
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
            <Flex
              direction={"column"}
              alignItems={"left"}
              justifyContent={"center"}
              width={"80%"}
            >
              <Text
                color={"black"}
                fontSize={{ base: "10pt", md: "15pt", lg: "20pt" }}
              >
                Password
              </Text>
              <Input
                borderRadius={7}
                type={"password"}
                background={"white"}
                fontSize={"17pt"}
                height={50}
                required
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                minLength={8}
              />
            </Flex>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            marginTop={4}
          >
            <Text
              color={"black"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
            >
              Make sure you comply with the{" "}
            </Text>
            <NextLink href={"/c/terms"} target={"_blank"}>
              <Link
                fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
                color={"#5686E1"}
              >
                terms
              </Link>
            </NextLink>
            <Text
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
              color={"black"}
            >
              &
            </Text>
            <NextLink href={"/c/privacy"} target={"_blank"}>
              <Link
                fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
                color={"#5686E1"}
              >
                privacy
              </Link>
            </NextLink>
            <Text
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
              color={"black"}
            >
              .
            </Text>
          </Flex>
          <Button
            type={"submit"}
            color={"white"}
            backgroundColor={"#5686E1"}
            borderRadius={0}
            fontWeight={600}
            fontSize={"20pt"}
            paddingLeft={10}
            paddingRight={10}
            paddingBottom={7}
            paddingTop={7}
            marginTop={4}
          >
            Register
          </Button>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            marginTop={4}
          >
            <Text color={"black"}>Have an account? </Text>
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

export default Register;
