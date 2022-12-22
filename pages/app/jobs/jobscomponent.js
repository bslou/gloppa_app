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

const JobsComponent = (website, id, company, position, image, location) => {
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"90%"}
      padding={5}
      backgroundColor={"#323232"}
      borderRadius={5}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <img src={image} alt="Logo" width={75} height={75} />
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
        <Button>Share</Button>
        <Button as={"a"} href={website} target={"_blank"}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};

export default JobsComponent;
