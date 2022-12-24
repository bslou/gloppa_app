import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

const Boost = () => {
  const router = useRouter();
  const [oguname, setOgUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();

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

  const { success, canceled } = router.query;

  loadStripe(
    "pk_test_51M7Ro4GeoqyJBYDECjxzLIS0mmOak6AX7wxWGKhnMQILtAWIj8vqtFnsTSzDsaBKS55oiavFulwWMVYxcvPtNNyO00rjWkemcz"
  );

  useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
    if (localStorage.getItem("id") !== null) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .get()
        .then((val) => {
          let n = val.get("startups");
          setUname(val.get("username"));
          setOgUname(val.get("username"));
          setEmail(val.get("email"));
          let boost = val.get("boost");
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, "0");
          var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = today.getFullYear();
          today = mm + "/" + dd + "/" + yyyy;

          if (boost !== undefined) {
            const date1 = new Date(String(boost[1]));
            const date2 = new Date(String(today));
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (boost[2] - diffDays < 1) {
              router.push("/app/boost/default");
            } else {
              if (boost[2] == 366) {
                router.push("/app/boost/yearlyofficialactivation");
              } else {
                router.push("/app/boost/monthlyofficialactivation");
              }
            }
          } else {
            router.push("/app/boost/default");
          }
        });
    } else {
      router.push("/");
    }
  }, [success, canceled]);

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      direction={"column"}
      alignItems={"center"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>My info</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <form onSubmit={changeData}>
              <Flex direction={"column"} alignItems={"center"} gap={"1vh"}>
                <Flex
                  width={"95%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"0.3vw"}
                >
                  <Text color={"white"}>Username: </Text>
                  <Input
                    color={"white"}
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
                  <Text color={"white"}>Email: </Text>
                  <Input
                    color={"white"}
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
                    color={"white"}
                    colorScheme={"transparent"}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>Future Updates</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Text color={"white"}>
              In the future there is a lot of things we want to do to make this
              be the best application for startups. First of all we would like
              to create partnerships where you can invite people and call with
              them to collaborate on projects. We also want to implement custom
              backgrounds and greater responsiveness. We also have a plan of
              creating mobile applications for both iOS and Android, and web
              application for all operating systems in the future. We also want
              to add more features than just the video game, such as services to
              help boost startups. If you have any recommendations or feedback,
              feel free to email us at gloppaglow@gmail.com.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingLeft={7}
        paddingRight={4}
        paddingTop={2.5}
        paddingBottom={2.5}
        width={"100vw"}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2.5vw"}
        >
          <NextLink href={"/app/startuplist"}>
            <Link color={"white"} fontWeight={700} fontSize={"20pt"}>
              Gloppa
            </Link>
          </NextLink>
          <NextLink href={"/app/productreview"}>
            <Link color={"white"} fontWeight={400} fontSize={"16pt"}>
              Product Review
            </Link>
          </NextLink>
          <NextLink href={"/app/funding"}>
            <Link color={"white"} fontWeight={400} fontSize={"16pt"}>
              Funding
            </Link>
          </NextLink>
          <NextLink href={"/app/jobs"}>
            <Link color={"white"} fontWeight={400} fontSize={"16pt"}>
              Jobs
            </Link>
          </NextLink>
        </Flex>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2vw"}
        >
          <Button
            bgGradient={"linear(to-r, #7928CA, #FF0080)"}
            color={"white"}
            fontSize={"16pt"}
            fontWeight={400}
            borderRadius={20}
            _hover={{ bgGradient: "linear(to-r, #6704CB, #CF0068)" }}
            colorScheme={"transparent"}
          >
            🚀 Boost
          </Button>
          <Menu>
            <MenuButton colorScheme={"transparent"}>
              <Image
                src={"/assets/profile.png"}
                alt={"Gloppa profile"}
                width={50}
                height={50}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen2}>Future Updates</MenuItem>
              <MenuItem onClick={onOpen}>Update Info</MenuItem>
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        width={"70vw"}
        padding={5}
        bgGradient={"linear(to-r, #7928CA, #FF0080)"}
        borderRadius={8}
      >
        <Text
          color={"white"}
          fontSize={{ base: "20pt", md: "25pt", lg: "30pt" }}
          fontWeight={800}
        >
          🚀 Boost
        </Text>
        <Text
          fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
          color={"white"}
          textAlign={"center"}
        >
          With the boost you will have the chance to progress your startup by
          being at the front of job deals, funding, and product review. There
          will be way more updates done with Gloppa, so consequently people with
          the boost, will have the chance to accelerate and make their startup
          journey more enjoyable. For a greater outer boost or if you have any
          feedback, feel free to email us at gloppaglow@gmail.com :)
        </Text>
      </Flex>
      <Flex marginTop={5} width={"70vw"} justifyContent={"space-between"}>
        <form action={"/api/checkout_sessions"} method={"POST"}>
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"34vw"}
            backgroundColor={"#1c1c1c"}
            gap={5}
            height={"45vh"}
            paddingLeft={3}
            paddingRight={3}
            borderRadius={10}
          >
            <Text color={"white"} fontSize={"22pt"} fontWeight={900}>
              😲 Monthly Boost
            </Text>
            <Text color={"white"} fontSize={"16pt"} textAlign={"center"}>
              Monthly marketing costs $10 a month. With the payment your startup
              has great acceleration and you will have a better experience on
              Gloppa.
            </Text>
            <Button type="submit" role={"link"} fontSize={"16pt"}>
              Purchase Monthly Boost
            </Button>
          </Flex>
        </form>
        <form action={"/api/checkout_sessionsTwo"} method={"POST"}>
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"34vw"}
            gap={5}
            height={"45vh"}
            backgroundColor={"#1c1c1c"}
            borderRadius={10}
            paddingLeft={3}
            paddingRight={3}
          >
            <Text color={"white"} fontSize={"22pt"} fontWeight={900}>
              🥳 Yearly Boost
            </Text>
            <Text color={"white"} fontSize={"16pt"} textAlign={"center"}>
              Yearly marketing costs $100 a month! This is the most bought
              booster pack and it gives you the same props as monthly plan,
              however, if you want a greater startup acceleration, feel free to
              email us at gloppaglow@gmail.com.
            </Text>
            <Button type="submit" fontSize={"16pt"} role="link">
              Purchase Yearly Boost
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Boost;
