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
  Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import NavBar from "../navbar";
import { serverTimestamp } from "firebase/firestore";

const Education = () => {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [prodRev, setProdRev] = useState([]);
  const [boostRev, setBoostRev] = useState([]);

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
  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .onSnapshot((val) => {
          let n = val.data();
          setUname(n.username);
          setOgUname(n.username);
          setEmail(n.email);
        });
    } else {
      router.push("/");
    }
  }, []);
  const title1 = "How to gain users?";
  let info1 = [
    [
      "http://i3.ytimg.com/vi/w2nrXTy47Gc/hqdefault.jpg",
      "Reid Hoffman On How To Hack Your First 100 Users",
      "w2nrXTy47Gc",
    ],
    [
      "http://i3.ytimg.com/vi/1eZpasYkrSE/hqdefault.jpg",
      "Need More Customers? Let Me Show You How",
      "1eZpasYkrSE",
    ],
    [
      "http://i3.ytimg.com/vi/LGJExxDRXPs/hqdefault.jpg",
      "20 Ways to Get Customers for Your Small Business",
      "LGJExxDRXPs",
    ],
    [
      "http://i3.ytimg.com/vi/6H4nRk581is/hqdefault.jpg",
      "Get Your First Users: Advice | Launch | App Marketing | Udacity",
      "6H4nRk581is",
    ],
    [
      "http://i3.ytimg.com/vi/19xt51mn9VY/hqdefault.jpg",
      "How to get the first 100 customers | Alvin Cheung | TEDxCUHK",
      "19xt51mn9VY",
    ],
    [
      "http://i3.ytimg.com/vi/KYtkyOpjXFw/hqdefault.jpg",
      "How to get the First Users/Buyers",
      "KYtkyOpjXFw",
    ],
    [
      "http://i3.ytimg.com/vi/HctZg2aOPMw/hqdefault.jpg",
      "The psychological trick behind getting people to say yes",
      "HctZg2aOPMw",
    ],
    [
      "http://i3.ytimg.com/vi/F71w24KS7mo/hqdefault.jpg",
      "How To Promote Your Facebook Page in 5 EASY Steps",
      "F71w24KS7mo",
    ],
    [
      "http://i3.ytimg.com/vi/KER_ToELCM4/hqdefault.jpg",
      "Growth Hacking: How to Acquire 100K Users",
      "KER_ToELCM4",
    ],
    [
      "http://i3.ytimg.com/vi/qTV6y9RcOyQ/hqdefault.jpg",
      "6 Extremely Simple PRODUCT GROWTH HACKS To Gain Millions of Users!",
      "qTV6y9RcOyQ",
    ],
  ];
  const title2 = "How to find a product idea?";
  const info2 = [
    [
      "http://i3.ytimg.com/vi/mtn31hh6kU4/hqdefault.jpg",
      "4 simple ways to have a great idea | Richard St. John",
      "mtn31hh6kU4",
    ],
    [
      "http://i3.ytimg.com/vi/B216ETbvJxc/hqdefault.jpg",
      "6 Business Ideas That Will Change Your Life in 2023",
      "B216ETbvJxc",
    ],
    [
      "http://i3.ytimg.com/vi/mN21YwEZHCo/hqdefault.jpg",
      "How to Generate NEW Business Ideas | Simon Sinek",
      "mN21YwEZHCo",
    ],
    [
      "http://i3.ytimg.com/vi/L1kbrlZRDvU/hqdefault.jpg",
      "How To Come Up With Good Ideas | Mark Rober | TEDxYouth@ColumbiaSC",
      "L1kbrlZRDvU",
    ],
    [
      "http://i3.ytimg.com/vi/pK887oMqxRY/hqdefault.jpg",
      "How to get a game-changing startup idea? | The Art of Innovation",
      "pK887oMqxRY",
    ],
    [
      "http://i3.ytimg.com/vi/NwyW46josFM/hqdefault.jpg",
      "Evaluate Startup Ideas in 5 Minutes",
      "NwyW46josFM",
    ],
    [
      "http://i3.ytimg.com/vi/2nlybhGJqy0/hqdefault.jpg",
      "7 Ways to Find Startup Business Ideas",
      "2nlybhGJqy0",
    ],
    [
      "http://i3.ytimg.com/vi/3YKNr-LiblI/hqdefault.jpg",
      "Billion dollar startup ideas",
      "3YKNr-LiblI",
    ],
    [
      "http://i3.ytimg.com/vi/4l_lLJK6glI/hqdefault.jpg",
      "Solving Simple Problems can Create Billion Dollar Ideas | Jamie Siminoff | TEDxCrossroadsSchool",
      "4l_lLJK6glI",
    ],
    [
      "http://i3.ytimg.com/vi/2gccAOuGRdU/hqdefault.jpg",
      "Should you work on that startup idea?",
      "2gccAOuGRdU",
    ],
  ];
  const title3 = "How to get funding?";
  const info3 = [
    [
      "http://i3.ytimg.com/vi/NNtMCbs47N8/hqdefault.jpg",
      "How To Get Startup Funding For A Small Business",
      "NNtMCbs47N8",
    ],
    [
      "http://i3.ytimg.com/vi/4RAs9Y5wwDo/hqdefault.jpg",
      "Seed Funding for Startups: How to raise venture capital as an entrepreneur",
      "4RAs9Y5wwDo",
    ],
    [
      "http://i3.ytimg.com/vi/t1fCAuNJH7Q/hqdefault.jpg",
      "How to get funding for your startup",
      "t1fCAuNJH7Q",
    ],
    [
      "http://i3.ytimg.com/vi/1oiuy7dhBEo/hqdefault.jpg",
      "How To Get Business funding In 3 Days! | Small Business & Self Employed",
      "1oiuy7dhBEo",
    ],
    [
      "http://i3.ytimg.com/vi/8-9176AxXVo/hqdefault.jpg",
      "How To Fund Your Startup | Funding A Startup",
      "8-9176AxXVo",
    ],
    [
      "http://i3.ytimg.com/vi/kAh7hlFkVq0/hqdefault.jpg",
      "Seed Funding For Startups: Raising 1M and Beyond (How to get Funding in 2022)",
      "kAh7hlFkVq0",
    ],
    [
      "http://i3.ytimg.com/vi/677ZtSMr4-4/hqdefault.jpg",
      "Startup Funding Explained: Everything You Need to Know",
      "677ZtSMr4-4",
    ],
    [
      "http://i3.ytimg.com/vi/zDUBPWn7WqQ/hqdefault.jpg",
      "How to Get Funding for a NEW Small Business",
      "zDUBPWn7WqQ",
    ],
    [
      "http://i3.ytimg.com/vi/175E2zqSr0A/hqdefault.jpg",
      "How To Get Startup Funding",
      "175E2zqSr0A",
    ],
    [
      "http://i3.ytimg.com/vi/fwiUM7cseXQ/hqdefault.jpg",
      "How To Get Bank Funding For Your Startup In 2022",
      "fwiUM7cseXQ",
    ],
  ];
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
          🎥&nbsp;&nbsp;Educational Videos
        </Button>
        {/* <Button
          border={"none"}
          _hover={{
            backgroundColor: "#efefef",
          }}
          fontSize={"25pt"}
          fontWeight={100}
          color={"#202020"}
          colorScheme={"transparent"}
          onClick={() => router.push("/app/productreviewreg")}
        >
          +
        </Button> */}
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
        <Flex
          direction={"column"}
          alignItems={"center"}
          height={"80vh"}
          width={"80%"}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          overflowY={"scroll"}
          mask={"rounded"}
          backgroundColor={"#fff"}
          paddingTop={3}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}
            top={{ base: "5vh", md: "4.5vh", lg: "4vh" }}
          ></Flex>
          <Flex direction={"column"} alignItems={"left"} width={"95%"}>
            <>
              <Text color={"black"} fontWeight={400} fontSize={"23pt"}>
                {title1}
              </Text>
              <Flex
                direction={"column"}
                width={"100%"}
                mask="rounded"
                overflowX={"scroll"}
                overflowY={"scroll"}
                alignItems={"flex-start"}
                gap={2}
              >
                <Box
                  direction={"row"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={5}
                >
                  {info1.map((val) => (
                    <Flex
                      direction={"column"}
                      as={"a"}
                      href={"/app/education/" + val[2]}
                      width={200}
                      height={220}
                    >
                      <img height={180} src={val[0]} alt={"video"} />
                      <Text
                        height={40}
                        color={"black"}
                        fontSize={"10pt"}
                        textAlign={"center"}
                        _hover={{
                          textDecoration: "underline",
                        }}
                      >
                        {val[1]}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Flex>
            </>
            <>
              <Text color={"black"} fontWeight={400} fontSize={"23pt"}>
                {title2}
              </Text>
              <Flex
                direction={"column"}
                width={"100%"}
                mask="rounded"
                overflowX={"scroll"}
                overflowY={"scroll"}
                alignItems={"flex-start"}
                gap={2}
              >
                <Box
                  direction={"row"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={5}
                >
                  {info2.map((val) => (
                    <Flex
                      direction={"column"}
                      as={"a"}
                      href={"/app/education/" + val[2]}
                      width={200}
                      height={220}
                    >
                      <img height={180} src={val[0]} alt={"video"} />
                      <Text
                        height={40}
                        color={"black"}
                        fontSize={"10pt"}
                        textAlign={"center"}
                        _hover={{
                          textDecoration: "underline",
                        }}
                      >
                        {val[1]}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Flex>
            </>
            <>
              <Text color={"black"} fontWeight={400} fontSize={"23pt"}>
                {title3}
              </Text>
              <Flex
                direction={"column"}
                width={"100%"}
                mask="rounded"
                overflowX={"scroll"}
                overflowY={"scroll"}
                alignItems={"flex-start"}
                gap={2}
              >
                <Box
                  direction={"row"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={5}
                >
                  {info3.map((val) => (
                    <Flex
                      direction={"column"}
                      as={"a"}
                      href={"/app/education/" + val[2]}
                      width={200}
                      height={220}
                    >
                      <img height={180} src={val[0]} alt={"video"} />
                      <Text
                        height={40}
                        color={"black"}
                        fontSize={"10pt"}
                        textAlign={"center"}
                        _hover={{
                          textDecoration: "underline",
                        }}
                      >
                        {val[1]}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Flex>
            </>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Education;
