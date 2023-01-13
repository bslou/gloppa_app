import {
  Button,
  Flex,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import FundingComponent from "./fundingcomp2";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";
import { serverTimestamp } from "firebase/firestore";

const Funding = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [funds, setFunds] = useState([]);
  const [boost, setBoost] = useState([]);
  const router = useRouter();

  const [uname, setUname] = useState("");
  const [oguname, setOgUname] = useState("");
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

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
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .onSnapshot((val) => {
            let n = val.data();
            setUname(n.username);
            setOgUname(n.username);
            setEmail(n.email);
          });
        const tempSetBoostRev = [];
        const tempSetFundRev = [];
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            let n = val.get("startups");
            n.reverse();
            if (n.length < 1) setLoading(false);
            db.collection("funding")
              .orderBy("timestamp", "desc")
              .onSnapshot((val) => {
                setFunds([]);
                val.forEach(function (doc) {
                  let des = doc.data().description;
                  let email = doc.data().email;
                  let stid = doc.data().startupId;
                  let equity = doc.data().investment[0];
                  let price = doc.data().investment[1];
                  let name = doc.data().startupName;
                  let foundedDate = doc.data().foundedDate;
                  let website = doc.data().website;
                  let img = doc.data().img;

                  if (n != []) {
                    let to = false;
                    if (n.includes(stid)) {
                      to = true;
                    } else {
                      to = false;
                    }
                    db.collection("startups")
                      .doc(stid)
                      .onSnapshot((val2) => {
                        let dot = val2.data();
                        db.collection("users")
                          .doc(dot.owner)
                          .onSnapshot((val3) => {
                            let dat = val3.data();
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, "0");
                            var mm = String(today.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); //January is 0!
                            var yyyy = today.getFullYear();
                            today = mm + "/" + dd + "/" + yyyy;

                            if (dat.boost !== undefined) {
                              const date1 = new Date(String(dat.boost[1]));
                              const date2 = new Date(String(today));
                              const diffTime = Math.abs(date2 - date1);
                              const diffDays = Math.ceil(
                                diffTime / (1000 * 60 * 60 * 24)
                              );
                              if (
                                dat.boost[0] == "yes" &&
                                diffDays <= dat.boost[2]
                              ) {
                                tempSetBoostRev.push(
                                  FundingComponent(
                                    img,
                                    name,
                                    [equity, price],
                                    des,
                                    email,
                                    foundedDate,
                                    website,
                                    to,
                                    doc.id,
                                    stid,
                                    toast
                                  )
                                );
                                setBoost(tempSetBoostRev);
                              } else {
                                tempSetFundRev.push(
                                  FundingComponent(
                                    img,
                                    name,
                                    [equity, price],
                                    des,
                                    email,
                                    foundedDate,
                                    website,
                                    to,
                                    doc.id,
                                    stid,
                                    toast
                                  )
                                );
                                setFunds(tempSetFundRev);
                              }
                            } else {
                              tempSetFundRev.push(
                                FundingComponent(
                                  img,
                                  name,
                                  [equity, price],
                                  des,
                                  email,
                                  foundedDate,
                                  website,
                                  to,
                                  doc.id,
                                  stid,
                                  toast
                                )
                              );
                              setFunds(tempSetFundRev);
                            }
                          });
                      });
                    setFunds((prevProd) => [...prevProd, ...boost]);
                    setLoading(false);
                  }
                });
                setLoading(false);
              });
          });
      } else {
        router.push("/c/main");
      }
    }
  }, [db, router]);

  if (loading) {
    return <MyLoadingScreen />;
  }

  if (!loading) {
    return (
      <Flex
        direction={"column"}
        backgroundColor={"#f2f2f2"}
        width={"100vw"}
        height={"100vh"}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor={"#fff"}>
            <ModalHeader color={"black"}>My info</ModalHeader>
            <ModalCloseButton color={"black"} />
            <ModalBody>
              <form onSubmit={changeData}>
                <Flex direction={"column"} alignItems={"center"} gap={"1vh"}>
                  <Flex
                    width={"95%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"0.3vw"}
                  >
                    <Text color={"black"}>Username: </Text>
                    <Input
                      color={"black"}
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
                    <Text color={"black"}>Email: </Text>
                    <Input
                      color={"black"}
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
                      color={"black"}
                      colorScheme={"transparent"}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </Flex>
                  <Button onClick={Logout}>Logout</Button>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          backgroundColor={"#fff"}
          borderBottom={"1px solid #dfdfdf"}
          padding={"1vw"}
          paddingLeft={200}
        >
          <Button
            border={"none"}
            background={"transparent"}
            fontSize={"13pt"}
            fontWeight={600}
            color={"#202020"}
            colorScheme={"transparent"}
          >
            {/* 📦&nbsp;&nbsp;Product Review */}
            💸&nbsp;&nbsp;Funding
          </Button>
          <Button
            border={"none"}
            _hover={{
              backgroundColor: "#efefef",
            }}
            fontSize={"25pt"}
            fontWeight={100}
            color={"#202020"}
            colorScheme={"transparent"}
            onClick={() => router.push("/app/fundingregistration")}
          >
            +
          </Button>
        </Flex>
        <Flex
          position={"fixed"}
          direction={"column"}
          alignItems={"flex-start"}
          backgroundColor={"#fff"}
          borderRight={"1px solid #dfdfdf"}
          height={"100vh"}
          width={200}
          gap={30}
          paddingTop={"3vh"}
          paddingBottom={"3vh"}
        >
          <Button
            border={"none"}
            background={"transparent"}
            fontSize={"13pt"}
            fontWeight={600}
            color={"#202020"}
            colorScheme={"transparent"}
            onClick={() => router.push("/app/startuplist")}
          >
            Gloppa
          </Button>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/productreview")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                📦&nbsp;&nbsp;Product Review
              </Text>
            </Button>
            <Button
              //background={"transparent"}
              background={"#efefef"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/funding")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💸&nbsp;&nbsp;Funding
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/jobs")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💻&nbsp;&nbsp;Jobs
              </Text>
            </Button>
          </Flex>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/messages")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💬&nbsp;&nbsp;Private Messages
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/forum")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                📢&nbsp;&nbsp;Public Forum
              </Text>
            </Button>
          </Flex>
          <Flex direction={"column"} width={"100%"} gap={2}>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={() => router.push("/app/education")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                🎥&nbsp;&nbsp;Educational Videos
              </Text>
            </Button>
            <Button
              background={"transparent"}
              border={"none"}
              colorScheme={"transparent"}
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"1.25vw"}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={0}
              _hover={{
                backgroundColor: "#efefef",
                cursor: "pointer",
              }}
              onClick={onOpen}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                👤&nbsp;&nbsp;Profile
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Flex
          position={"absolute"}
          direction={"column"}
          alignItems={"center"}
          paddingTop={5}
          paddingBottom={5}
          marginLeft={{ base: 150, md: 175, lg: 250 }}
          width={"80%"}
          top={{ base: 45, md: 53, lg: 61 }}
          gap={3}
        >
          {boost}
          {funds}
        </Flex>
      </Flex>
    );
  }
};

export default Funding;
