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

  useEffect(() => {
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
  }, [db]);

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      direction={"column"}
      alignItems={"center"}
    ></Flex>
  );
};

export default Boost;
