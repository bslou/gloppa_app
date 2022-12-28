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
import StartupComponent from "./startupcomponent";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();

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

  // const fetchData = () => {
  //   let id = localStorage.getItem("id");
  //   db.collection("users")
  //     .doc(id)
  //     .get()
  //     .then((val) => {
  //       if (!val.exists) return;
  //       if (rows.length > 0) return;
  //       let n = val.get("startups");
  //       //console.log(Object.keys(n).length);
  //       if (Object.keys(n).length == 0) {
  //         setLoading(false);
  //         return;
  //       }
  //       n.reverse();
  //       setUname(val.get("username"));
  //       setOgUname(val.get("username"));
  //       setEmail(val.get("email"));
  //       if (n.length < 1) setLoading(false);
  //       n.forEach((document) => {
  //         db.collection("startups")
  //           .doc(document)
  //           .get()
  //           .then((res) => {
  //             let startupName = String(res.get("startupName"));
  //             let lvl = String(Math.floor(res.get("level") / 100) + 1);
  //             let img = "/assets/spacer1.png";
  //             /*console.log(
  //               "Name " + startupName + " Level " + lvl + " Image " + img
  //             );*/
  //             setRows((prevRows) => [
  //               ...prevRows,
  //               StartupComponent(
  //                 accessories[res.get("selectedAccessory")][1],
  //                 lvl,
  //                 startupName,
  //                 String(document)
  //               ),
  //             ]);
  //             setLoading(false);
  //           });
  //       });
  //     });
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        // if (dataFetchedRef.current) return;
        // dataFetchedRef.current = true;
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
            n.reverse();
            if (n.length < 1) setLoading(false);
            n.forEach((document) => {
              db.collection("startups")
                .doc(document)
                .get()
                .then((res) => {
                  let startupName = String(res.get("startupName"));
                  let lvl = String(Math.floor(res.get("level") / 100) + 1);
                  setRows((prevRows) => [
                    StartupComponent(
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
          gap={0}
          backgroundColor={"#1C1C1C"}
          width={"55vw"}
          maxHeight={"90vh"}
          minHeight={"90vh"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingTop={10}
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
              Startups
            </Text>
            <Tooltip label={"Add startup here!"} aria-label="A tooltip">
              <Button
                colorScheme="transparent"
                onClick={() => router.push("/app/startupregistration")}
              >
                <Image
                  src={"/assets/plus.png"}
                  alt={"Gloppa plus"}
                  width={30}
                  height={30}
                />
              </Button>
            </Tooltip>
          </Flex>
          <Flex
            width={"100%"}
            height={"100%"}
            overflowY={"scroll"}
            direction={"column"}
            alignItems={"center"}
            gap={"1vw"}
            paddingTop={"1vw"}
          >
            {rows.length > 0 ? (
              rows
            ) : (
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"90%"}
                height={"90%"}
              >
                <Image
                  src={"/assets/nodata2.png"}
                  alt={"No data"}
                  width={400}
                  height={400}
                />
                <Text color={"white"} textAlign={"center"} fontSize={"25pt"}>
                  No startups <br />
                  found here... 😔
                </Text>
                <br />
                <Button
                  onClick={() => router.push("/app/startupregistration")}
                  fontSize={"18pt"}
                  padding={5}
                >
                  Create a Startup
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default StartupList;
