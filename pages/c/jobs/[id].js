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
import JobsComponent from "./jobscomponent";
import NavBar from "../navbar";

const Jobs = () => {
  const router = useRouter();

  const [uname, setUname] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const [jobTitle, setJobTitle] = useState("");
  const [startupName, setStartupName] = useState("");
  const [link, setLink] = useState("");
  const [loc, setLoc] = useState("");
  const [imog, setImog] = useState("");
  const [id, setId] = useState("");
  const [idts, setIdts] = useState("");

  useEffect(() => {
    if (router.isReady) {
      if (localStorage.getItem("id") !== null) {
        router.push("/app/jobs/" + router.query.id);
        return;
      }
      db.collection("jobs")
        .doc(router.query.id)
        .onSnapshot((snapshot) => {
          if (typeof snapshot.data() === "undefined") {
            router.push("/");
            toast({
              title: "ID does not exist",
              description: "The id either got removed or it does not exist.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
            return;
          }
        });
      db.collection("jobs")
        .doc(router.query.id)
        .get()
        .then((val2) => {
          setJobTitle(val2.get("jobtitle"));
          setStartupName(val2.get("startupName"));
          setLink(val2.get("linkjob"));
          setLoc(val2.get("location"));
          setId(router.query.id);
          setIdts(val2.get("startupId"));
          db.collection("startups")
            .doc(val2.get("startupId"))
            .get()
            .then((val3) => {
              console.log("Jobs: " + val3.get("jobs"));
              let img = val3.get("img");
              storage
                .ref(img)
                .getDownloadURL()
                .then((url) => {
                  setImog(url);
                  setLoading(false);
                });
            });
        });
    } else {
      console.log("off");
    }
  }, [router]);
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
        backgroundColor={"#1c1c1c"}
        height={"90%"}
        width={"65vw"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginTop={5}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          position={"absolute"}
          top={{ base: "5.5vh", md: "4.5vh", lg: "4vh" }}
        >
          <Text
            textShadow={"0px 4px 1px rgba(0,0,0,0.6)"}
            fontWeight={800}
            color={"white"}
            fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
          >
            {startupName} Job
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={"2vh"}
          width={"100%"}
          overflowY={"scroll"}
          paddingTop={10}
        >
          {JobsComponent(
            link,
            id,
            idts,
            startupName,
            jobTitle,
            imog,
            loc,
            toast
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Jobs;
