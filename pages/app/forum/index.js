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
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import NavBar from "../navbar";
import { serverTimestamp } from "firebase/firestore";

const Forum = () => {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [fors, setFors] = useState([]);

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
          onClose();
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
          onClose();
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  const deleteIt = (id, msg) => {
    if (
      window.confirm(
        "Are you sure you want to delete this forum post:\n" + msg + "?"
      )
    ) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ forumsId: arrayRemove(id) });
      db.collection("forum").doc(id).delete();
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  const addLikes = (id, likes) => {
    if (likes.includes(localStorage.getItem("id"))) {
      db.collection("forum")
        .doc(id)
        .update({ likes: arrayRemove(localStorage.getItem("id")) });
    } else {
      db.collection("forum")
        .doc(id)
        .update({ likes: arrayUnion(localStorage.getItem("id")) });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      router.push("/");
      return;
    }
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .onSnapshot((val) => {
        let n = val.data();
        setUname(n.username);
        setOgUname(n.username);
        setEmail(n.email);
      });
    db.collection("forum")
      .orderBy("timestamp", "desc")
      .onSnapshot((val) => {
        setFors([]);
        val.forEach((docs) => {
          let data = docs.data();
          db.collection("users")
            .doc(data.ownerId)
            .get()
            .then((val2) => {
              let thi = true;
              if (data.likes.includes(localStorage.getItem("id"))) {
                thi = true;
              } else {
                thi = false;
              }
              let mine = true;
              if (data.ownerId == localStorage.getItem("id")) {
                mine = true;
              } else {
                mine = false;
              }
              setFors((prevF) => [
                ...prevF,
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"70%"}
                  padding={3}
                  boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
                  //borderRadius={5}
                  //backgroundColor={mine ? "#545454" : "#323232"}
                  backgroundColor={"#fff"}
                  _hover={{
                    opacity: 0.8,
                  }}
                >
                  <Flex
                    direction={"column"}
                    //alignItems={"left"}
                    justifyContent={"center"}
                    width={"80%"}
                    gap={0.5}
                  >
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text color={"black"} fontWeight={900} fontSize={"10pt"}>
                        @{val2.get("username")}
                      </Text>
                      {mine ? (
                        <Button
                          objectFit={"cover"}
                          height={"2vw"}
                          colorScheme={"transparent"}
                          onClick={() => deleteIt(docs.id, data.statement)}
                        >
                          <Image
                            src={"/assets/trash.png"}
                            alt={"trash"}
                            layout={"fill"}
                          />
                        </Button>
                      ) : null}
                    </Flex>
                    <Text color={"black"} fontSize={"15pt"}>
                      {data.statement}
                    </Text>
                    <Flex
                      direction={"row"}
                      alignItems={"center"}
                      //justifyContent={"center"}
                      gap={2.5}
                    >
                      {data.hashtags.map((val) => (
                        <Tag
                          colorScheme={"green"}
                          fontSize={"10pt"}
                          size={"lg"}
                        >
                          {val}
                        </Tag>
                      ))}
                      <Link href={"/app/forum/" + docs.id}>
                        <Text
                          color={"black"}
                          fontWeight={900}
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          {data.replies !== undefined ? data.replies.length : 0}{" "}
                          replies
                        </Text>
                      </Link>
                    </Flex>
                  </Flex>
                  <Button
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    border={thi ? "1px solid #1F90FF" : "1px solid black"}
                    borderRadius={3}
                    colorScheme={"transparent"}
                    height={"100%"}
                    // backgroundColor={mine ? "#545454" : "#323232"}
                    backgroundColor={"transparent"}
                    paddingBottom={3}
                    paddingTop={3}
                    onClick={() => addLikes(docs.id, data.likes)}
                    // onClick={addLikes}
                  >
                    <Image
                      src={thi ? "/assets/blueup.png" : "/assets/up.png"}
                      alt="Gloppa up"
                      width={40}
                      height={40}
                    />
                    <Text color={"#000"} fontSize={"17pt"}>
                      {Object.keys(data.likes).length === 0
                        ? 0
                        : data.likes.length}
                    </Text>
                  </Button>
                </Flex>,
                // ForumComponent(
                //   val2.get("username"),
                //   docs.id,
                //   data.statement,
                //   data.hashtags,
                //   data.likes,
                //   thi,
                //   data.replies,
                //   mine
                // ),
              ]);
            });
        });
      });
  }, [db]);

  // if (loading) {
  //   return <MyLoadingScreen />;
  // }

  // if (!loading) {
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
          📢&nbsp;&nbsp;Public Forum
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
          onClick={() => router.push("/app/forumreg")}
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
        top={{ base: 48, md: 57, lg: 66 }}
        overflowY={'scroll'}
        maxHeight = {'85vh'}
        gap={3}
      >
        {fors}
      </Flex>
    </Flex>
  );
};
//   };

export default Forum;
