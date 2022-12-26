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
  const [days, setDays] = useState();

  useEffect(() => {
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
            setDays(boost[2] - diffDays);
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
  }, [db]);

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
          textAlign={"center"}
        >
          Monthly boost officially activated 🎉
        </Text>
        <Text
          fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
          color={"white"}
          textAlign={"center"}
        >
          Congrats the monthly boost is officially activated, now all of your
          startups posts will rank higher and will be seen by more people in our
          feeds. We also will make more updates to increase more features for
          people who have the boost! The boost expires in {String(days)} days...
        </Text>
        <Image
          src={"/assets/party.gif"}
          alt={"Party"}
          width={700}
          height={700}
        />
      </Flex>
    </Flex>
  );
};

export default Boost;
