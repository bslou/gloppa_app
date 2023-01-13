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
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import StartupComponent from "./startcomp2";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";
import StartupComp from "./startcomp2";

const StartupList = () => {
  const router = useRouter();

  const [oguname, setOgUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();
  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const accessories = [
    [
      "/assets/spacer.png",
      "/assets/spacer1.png",
      "Beginner factory (producing 5 coins a day)",
      0,
    ],
    [
      "/assets/spacert.png",
      "/assets/spacer2.png",
      "Medium factory (producing 10 coins a day)",
      100,
    ],
    [
      "/assets/spacerth.png",
      "/assets/spacer3.png",
      "Comfort-Zone factory (producing 25 coins a day)",
      1000,
    ],
    [
      "/assets/spacerf.png",
      "/assets/spacer4.png",
      "Semi-advanced factory (producing 50 coins a day)",
      10000,
    ],
    [
      "/assets/spacerfi.png",
      "/assets/spacer5.png",
      "Advanced factory (producing 100 coins a day)",
      100000,
    ],
  ];
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
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        // if (dataFetchedRef.current) return;
        // dataFetchedRef.current = true;
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
          .onSnapshot((snapshot) => {
            setRows([]);
            const data = snapshot.data();
            let n = data.startups;
            if (Object.keys(n).length == 0) {
              setLoading(false);
              return;
            }
            //n.reverse();
            if (n.length < 1) setLoading(false);
            n.forEach((document) => {
              db.collection("startups")
                .doc(document)
                .get()
                .then((res) => {
                  let startupName = String(res.get("startupName"));
                  let lvl = String(Math.floor(res.get("level") / 100) + 1);
                  setRows((prevRows) => [
                    StartupComp(
                      accessories[res.get("selectedAccessory")][1],
                      lvl,
                      startupName,
                      String(document)
                    ),
                    ...prevRows,
                  ]);
                  setLoading(false);
                });
            });
          });
      }
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
            Startup List
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
            onClick={() => router.push("/app/startupregistration")}
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
          {rows.length > 0 ? rows : 
            <Flex direction={'column'} alignItems = {'center'} gap = {10}>
              <Image src = {'/assets/nodata2.png'} alt = {"No data"} width = {500} height={500} layout={'responsive'}/>
              <Text>No startups here :(</Text>
              <Button boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"} borderRadius={0} fontSize={'18pt'} paddingLeft={5} paddingRight={5} backgroundColor={'white'} onClick={() => router.push("/app/startupregistration")}>Get Started</Button>
           </Flex>
          }
        </Flex>
      </Flex>
    );
  }
};

export default StartupList;
