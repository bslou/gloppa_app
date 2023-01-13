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
import JobsComponent from "./jobscomp2";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";
import { serverTimestamp } from "firebase/firestore";

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const [jobs, setJobs] = useState([]);
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
          setBoost([]);
          setJobs([]);
          onClose();
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      router.push("/");
      return;
    } else {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .onSnapshot((val) => {
          let n = val.data();
          setUname(n.username);
          setOgUname(n.username);
          setEmail(n.email);
        });
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .get()
        .then((val) => {
          let n = val.get("startups");
          n.reverse();
          if (n.length < 1) setLoading(false);
          db.collection("jobs")
            .orderBy("timestamp", "desc")
            .get()
            .then((val2) => {
              setJobs([]);
              setBoost([]);
              if (Object.keys(val2).length < 1) {
                setLoading(false);
              }
              val2.forEach(function (doc) {
                let category = doc.data().category;
                let contactemail = doc.data().contactemail;
                let jobtitle = doc.data().jobtitle;
                let linkjob = doc.data().linkjob;
                let location = doc.data().location;
                let name = doc.data().startupName;
                let tagline = doc.data().tagline;
                let img = doc.data().img;
                let mine = false;
                if (val.get("startups").includes(doc.data().startupId)) {
                  mine = true;
                } else {
                  mine = false;
                }
                db.collection("startups")
                  .doc(doc.data().startupId)
                  .onSnapshot((val2) => {
                    let dot = val2.data();
                    db.collection("users")
                      .doc(dot.owner)
                      .onSnapshot((val3) => {
                        let dat = val3.data();
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, "0");
                        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
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
                            const tempSetBoost = [];
                            tempSetBoost.push(
                              JobsComponent(
                                linkjob,
                                doc.id,
                                doc.data().startupId,
                                name,
                                jobtitle,
                                img,
                                location,
                                toast,
                                mine,
                                router
                              )
                            );
                            setBoost((prevBoost) =>
                              prevBoost.concat(tempSetBoost)
                            );
                          } else {
                            const tempSetJobs = [];
                            tempSetJobs.push(
                              JobsComponent(
                                linkjob,
                                doc.id,
                                doc.data().startupId,
                                name,
                                jobtitle,
                                img,
                                location,
                                toast,
                                mine,
                                router
                              )
                            );
                            setJobs((prevJobs) => prevJobs.concat(tempSetJobs));
                          }
                        } else {
                          const tempSetJobs = [];
                          tempSetJobs.push(
                            JobsComponent(
                              linkjob,
                              doc.id,
                              doc.data().startupId,
                              name,
                              jobtitle,
                              img,
                              location,
                              toast,
                              mine,
                              router
                            )
                          );
                          setJobs((prevJobs) => prevJobs.concat(tempSetJobs));
                        }
                      });
                  });
                setLoading(false);
              });
            });
        });
    }
  }, []);

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
            💻&nbsp;&nbsp;Jobs
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
            onClick={() => router.push("/app/jobsreg")}
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
              onClick={() => router.push("/app/funding")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💸&nbsp;&nbsp;Funding
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
          overflowY={'scroll'}
          maxHeight = {'85vh'}
          gap={3}
        >
          {boost}
          {jobs}
        </Flex>
      </Flex>
    );
  }
};

export default Jobs;
