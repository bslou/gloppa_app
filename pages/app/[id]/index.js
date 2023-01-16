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
  Tag,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../../api/firebaseconfig";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";

const StartupList = () => {
  const router = useRouter();

  const [oguname, setOgUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  const [tunam, setTunam] = useState("");

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

  const deleteIt = (name, id) => {
    if (window.confirm("Do you really want to delete " + name + "?")) {
      let idd = localStorage.getItem("id");
      db.collection("startups")
        .doc(id)
        .get()
        .then((val) => {
          let fundid = val.get("fundingId");
          let prodid = val.get("productReviewId");
          if (prodid != "" && fundid != "") {
            db.collection("productReview").doc(prodid).delete();
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ productReviewStartupId: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ fundingStartupId: arrayRemove(idd) });
            db.collection("funding").doc(fundid).delete();
          } else if (prodid != "") {
            db.collection("productReview").doc(prodid).delete();
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ productReviewStartupId: arrayRemove(id) });
          } else if (fundid != "") {
            db.collection("funding").doc(fundid).delete();
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ fundingStartupId: arrayRemove(idd) });
          } else {
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
          }
        });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null && router) {
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
          .doc(router.query.id)
          .onSnapshot((snapshot) => {
            setRows([]);
            const data = snapshot.data();
            setTunam(data.username);
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
                  storage
                    .ref(String(res.get("img")))
                    .getDownloadURL()
                    .then((url) => {
                      let startupName = String(res.get("startupName"));
                      let des = String(res.get("description"));
                      let funds = String(res.get("fundingId"));
                      let jobs = res.get("jobs");
                      let prodrev = String(res.get("productReviewId"));
                      setRows((prevRows) => [
                        <Flex
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          backgroundColor={"#fff"}
                          width={"70%"}
                          paddingTop={2}
                          paddingBottom={2}
                          paddingLeft={2}
                          //borderRadius={3}
                          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
                        >
                          <Flex
                            direction={"row"}
                            alignItems={"center"}
                            // justifyContent={"center"}
                            gap={3}
                          >
                            <img
                              src={url}
                              alt={"Gloppa spacer"}
                              width={50}
                              height={50}
                            />
                            <Flex
                              direction={"column"}
                              justifyContent={"center"}
                              gap={1}
                            >
                              <Text color={"black"} fontWeight={600}>
                                {startupName}
                              </Text>
                              <Link
                                color={"black"}
                                fontWeight={300}
                                fontSize={{ base: "5pt", md: "7pt", lg: "9pt" }}
                                onClick={() =>
                                  localStorage.getItem("id") !== null &&
                                  router.query.id != localStorage.getItem("id")
                                    ? String(res.get("website"))
                                      ? window.open(
                                          String(res.get("website")),
                                          "_blank"
                                        )
                                      : null
                                    : null
                                }
                              >
                                {des}
                              </Link>
                              <Flex
                                direction={"row"}
                                alignItems={"center"}
                                gap={2}
                              >
                                <Tag
                                  colorScheme="teal"
                                  fontSize={{
                                    base: "4pt",
                                    md: "7pt",
                                    lg: "10pt",
                                  }}
                                >
                                  {prodrev.length == 0
                                    ? "0 Product Reviews"
                                    : "1 Product Review"}
                                </Tag>
                                <Tag
                                  colorScheme="teal"
                                  fontSize={{
                                    base: "4pt",
                                    md: "7pt",
                                    lg: "10pt",
                                  }}
                                >
                                  {jobs.length} Jobs
                                </Tag>
                                <Tag
                                  colorScheme="teal"
                                  fontSize={{
                                    base: "4pt",
                                    md: "7pt",
                                    lg: "10pt",
                                  }}
                                >
                                  {funds.length == 0 ? "0 Funds" : "1 Fund"}
                                </Tag>
                              </Flex>
                            </Flex>
                          </Flex>
                          {localStorage.getItem("id") !== null ? (
                            router.query.id == localStorage.getItem("id") ? (
                              <Tooltip label={"Delete " + startupName + "..."}>
                                <Button
                                  onClick={() =>
                                    deleteIt(startupName, String(document))
                                  }
                                  colorScheme={"transparent"}
                                >
                                  <Image
                                    src={"/assets/trash.png"}
                                    alt={"Gloppa menu"}
                                    width={35}
                                    height={35}
                                  />
                                </Button>
                              </Tooltip>
                            ) : null
                          ) : null}
                        </Flex>,
                        ...prevRows,
                      ]);
                      setLoading(false);
                    });
                });
            });
          });
      } else if (router) {
        setLoading(false);
        db.collection("users")
          .doc(router.query.id)
          .onSnapshot((snapshot) => {
            setRows([]);
            const data = snapshot.data();
            setTunam(data.username);
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
                  storage
                    .ref(String(res.get("img")))
                    .getDownloadURL()
                    .then((url) => {
                      let startupName = String(res.get("startupName"));
                      let des = String(res.get("description"));
                      let funds = String(res.get("fundingId"));
                      let jobs = res.get("jobs");
                      let prodrev = String(res.get("productReviewId"));
                      setRows((prevRows) => [
                        <Flex
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          backgroundColor={"#fff"}
                          width={"70%"}
                          paddingTop={2}
                          paddingBottom={2}
                          paddingLeft={2}
                          //borderRadius={3}
                          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
                        >
                          <Flex
                            direction={"row"}
                            alignItems={"center"}
                            // justifyContent={"center"}
                            gap={3}
                          >
                            <img
                              src={url}
                              alt={"Gloppa spacer"}
                              width={50}
                              height={50}
                            />
                            <Flex
                              direction={"column"}
                              justifyContent={"center"}
                              gap={1}
                            >
                              <Text color={"black"} fontWeight={600}>
                                {startupName}
                              </Text>

                              {/* <Button
              as={"a"}
              colorScheme={"transparent"}
              maxWidth={"45vw"}
            > */}
                              <Link
                                color={"black"}
                                fontWeight={300}
                                fontSize={{ base: "5pt", md: "7pt", lg: "9pt" }}
                                onClick={() =>
                                  localStorage.getItem("id") !== null &&
                                  router.query.id != localStorage.getItem("id")
                                    ? String(res.get("website"))
                                      ? window.open(
                                          String(res.get("website")),
                                          "_blank"
                                        )
                                      : null
                                    : null
                                }
                              >
                                {des}
                              </Link>
                              {/* </Button> */}
                              <Flex
                                direction={"row"}
                                alignItems={"center"}
                                gap={2}
                              >
                                <Tag
                                  colorScheme="teal"
                                  fontSize={{
                                    base: "4pt",
                                    md: "7pt",
                                    lg: "10pt",
                                  }}
                                >
                                  {prodrev.length == 0
                                    ? "0 Product Reviews"
                                    : "1 Product Review"}
                                </Tag>
                                <Tag
                                  colorScheme="teal"
                                  fontSize={{
                                    base: "4pt",
                                    md: "7pt",
                                    lg: "10pt",
                                  }}
                                >
                                  {jobs.length} Jobs
                                </Tag>
                                <Tag
                                  colorScheme="teal"
                                  fontSize={{
                                    base: "4pt",
                                    md: "7pt",
                                    lg: "10pt",
                                  }}
                                >
                                  {funds.length == 0 ? "0 Funds" : "1 Fund"}
                                </Tag>
                              </Flex>
                            </Flex>
                          </Flex>
                          {localStorage.getItem("id") !== null ? (
                            router.query.id == localStorage.getItem("id") ? (
                              <Tooltip label={"Delete " + startupName + "..."}>
                                <Button
                                  onClick={() =>
                                    deleteIt(startupName, String(document))
                                  }
                                  colorScheme={"transparent"}
                                >
                                  <Image
                                    src={"/assets/trash.png"}
                                    alt={"Gloppa menu"}
                                    width={35}
                                    height={35}
                                  />
                                </Button>
                              </Tooltip>
                            ) : null
                          ) : null}
                        </Flex>,
                        ...prevRows,
                      ]);
                      setLoading(false);
                    });
                });
            });
          });
      }
    }
  }, [router]);

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
            fontSize={{ base: "8pt", md: "10.5pt", lg: "13pt" }}
            fontWeight={600}
            color={"#202020"}
            colorScheme={"transparent"}
          >
            {/* 📦&nbsp;&nbsp;Product Review */}
            🚀 @{tunam} Companies
          </Button>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Flex>
        <Flex
          position={"fixed"}
          overflowY={"auto"}
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
              onClick={() => router.push("/app/updatereview")}
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                🆕&nbsp;&nbsp;Update Review
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
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/productivitymanagement")
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                💼&nbsp;&nbsp;Productivity
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
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/fundingcam")
                  : router.push("/app/register")
              }
            >
              <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
                ⏺️&nbsp;&nbsp;Record Funding Pitch
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
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/messages")
                  : router.push("/app/register")
              }
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
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? router.push("/app/education")
                  : router.push("/app/register")
              }
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
              onClick={() =>
                localStorage.getItem("id") !== null
                  ? onOpen()
                  : router.push("/app/register")
              }
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
          {rows.length > 0 ? (
            rows
          ) : (
            <Flex direction={"column"} alignItems={"center"} gap={5}>
              <Image
                src={"/assets/nodata2.png"}
                alt={"No data"}
                width={1000}
                height={1000}
                layout={"responsive"}
              />
              <Text fontSize={"24pt"}>No companies here 😭</Text>
              <Button
                boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
                borderRadius={0}
                fontSize={"20pt"}
                height={65}
                paddingLeft={5}
                paddingRight={5}
                backgroundColor={"white"}
                onClick={() =>
                  localStorage.getItem("id") !== null
                    ? router.push("/app/startupregistration")
                    : router.push("/app/register")
                }
              >
                Get Started
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  }
};

export default StartupList;
