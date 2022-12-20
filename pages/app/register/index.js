import { Button, Flex, Input, Link, Text, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const [eml, setEml] = useState("");
  const [pwd, setPwd] = useState("");
  const [uname, setUname] = useState("");
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
                premium: {},
                startups: {},
                funding: [],
              });
              localStorage.setItem("id", user.uid);
              //uncomment line below later
              //localStorage.setItem("id", user.uid)
              router.push("/app/pricing");
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
      height={"100vh"}
      backgroundColor={"#323232"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <form onSubmit={(e) => RegSubmit(e)}>
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
                color={"white"}
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
              color={"white"}
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
              color={"white"}
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
              color={"white"}
            >
              .
            </Text>
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
            Register
          </Button>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            marginTop={4}
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

export default Register;
