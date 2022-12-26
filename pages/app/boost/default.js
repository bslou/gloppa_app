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
import NavBar from "../navbar";

const Boost = () => {
  const router = useRouter();
  const { success, canceled } = router.query;

  loadStripe(
    "pk_live_51M7Ro4GeoqyJBYDE3XdbPEVHJJTQQt7tHlOF2nfaevexkkwXMq4S85r4bxASfarebzLBNBwmxkkn336xtk7FX33m00Dbu6w3RL"
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

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      direction={"column"}
      alignItems={"center"}
    >
      <NavBar />
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
          being at the front of job deals, funding, and product review. You will
          also receive at least 1000 coins and an increase in level. For a
          greater outer boost or if you have any feedback, feel free to email us
          at gloppaofficial@gmail.com :)
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
            height={"50vh"}
            paddingLeft={3}
            paddingRight={3}
            borderRadius={10}
          >
            <Text
              color={"white"}
              fontSize={{ base: "16pt", md: "19pt", lg: "22pt" }}
              fontWeight={900}
            >
              😲 Monthly Boost
            </Text>
            <Text
              color={"white"}
              fontSize={{ base: "10pt", md: "13pt", lg: "16pt" }}
              textAlign={"center"}
            >
              Monthly marketing costs $10 a month. With the payment your startup
              has great acceleration and you will receive an increase in level
              along with 1000 more coins for each startup.
            </Text>
            <Button
              type="submit"
              role={"link"}
              fontSize={{ base: "10pt", md: "13pt", lg: "16pt" }}
            >
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
            height={"50vh"}
            backgroundColor={"#1c1c1c"}
            borderRadius={10}
            paddingLeft={3}
            paddingRight={3}
          >
            <Text
              color={"white"}
              fontSize={{ base: "16pt", md: "19pt", lg: "22pt" }}
              fontWeight={900}
            >
              🥳 Yearly Boost
            </Text>
            <Text
              color={"white"}
              fontSize={{ base: "10pt", md: "13pt", lg: "16pt" }}
              textAlign={"center"}
            >
              Yearly marketing costs $100 a year! This is the most bought
              booster pack and it gives you the same props as monthly plan,
              however, it also provides users with 5000 coins and an increase by
              2 levels for each startup.
            </Text>
            <Button
              type="submit"
              fontSize={{ base: "10pt", md: "13pt", lg: "16pt" }}
              role="link"
            >
              Purchase Yearly Boost
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Boost;
