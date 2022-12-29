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
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import { arrayRemove } from "firebase/firestore";

const JobsComponent = (
  website,
  id,
  idts,
  company,
  position,
  image,
  location,
  toast,
  router
) => {
  const deleteIt = () => {
    if (
      window.confirm("Do you really want to delete " + company + " fund post?")
    ) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ jobs: arrayRemove(idts) });
      db.collection("startups")
        .doc(idts)
        .update({ jobs: arrayRemove(id) });
      db.collection("jobs").doc(id).delete();
      if (router.pathname == "/app/jobs/[id]") {
        router.push("/app/jobs");
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 400);
      }
      //change out of bottom code in the future!
      //window.location.reload();
      toast({
        title: "Deleted successfully",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"90%"}
      padding={5}
      backgroundColor={"#323232"}
      borderRadius={5}
      // as={"a"}
      // href={"/app/jobs/" + id}
      _hover={{
        opacity: 0.8,
      }}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <img src={image} alt={company} width={75} height={75} />
        <Flex direction={"column"} justifyContent={"center"}>
          <Text color={"#ccc"}>{company}</Text>
          <Text color={"#fff"} fontWeight={800}>
            {position}
          </Text>
          <Text color={"#ccc"}>{location}</Text>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
      >
        <Button
          onClick={() => {
            {
              navigator.clipboard.writeText(
                "Check out my job post at: https://gloppa.co/c/jobs/" + id
              );
              toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          Share
        </Button>
        <Button as={"a"} href={website} target={"_blank"}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};

export default JobsComponent;
