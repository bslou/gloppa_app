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
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            if (!val.exists) return;
            if (typeof val.get("premium")[0] !== "undefined") {
              // does not exist
              if (val.get("premium")[0] == "fulltime") {
                // router.push("/app/startuplist");
                if (dataFetchedRef.current) return;
                dataFetchedRef.current = true;
                db.collection("users")
                  .doc(localStorage.getItem("id"))
                  .onSnapshot((snapshot) => {
                    const data = snapshot.data();
                    let n = data.startups;
                    setRows([]);
                    setUname(data.username);
                    setOgUname(data.username);
                    setEmail(data.email);
                    //console.log(Object.keys(n).length);
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
                          let lvl = String(
                            Math.floor(res.get("level") / 100) + 1
                          );
                          let img = "/assets/spacer1.png";
                          /*console.log(
                  "Name " + startupName + " Level " + lvl + " Image " + img
                );*/
                          setRows((prevRows) => [
                            ...prevRows,
                            StartupComponent(
                              accessories[res.get("selectedAccessory")][1],
                              lvl,
                              startupName,
                              String(document)
                            ),
                          ]);
                          setLoading(false);
                        });
                    });
                  });
              } else if (val.get("premium")[0] == "parttime") {
                const date1 = new Date(String(val.get("premium")[1]));
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + "/" + dd + "/" + yyyy;
                const date2 = new Date(String(today));
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays <= 31) {
                  // router.push("/app/startuplist");
                  if (dataFetchedRef.current) return;
                  dataFetchedRef.current = true;
                  db.collection("users")
                    .doc(localStorage.getItem("id"))
                    .onSnapshot((snapshot) => {
                      setRows([]);
                      const data = snapshot.data();
                      let n = data.startups;
                      //console.log(Object.keys(n).length);
                      setUname(data.username);
                      setOgUname(data.username);
                      setEmail(data.email);
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
                            let lvl = String(
                              Math.floor(res.get("level") / 100) + 1
                            );
                            let img = "/assets/spacer1.png";
                            /*console.log(
                  "Name " + startupName + " Level " + lvl + " Image " + img
                );*/
                            setRows((prevRows) => [
                              ...prevRows,
                              StartupComponent(
                                accessories[res.get("selectedAccessory")][1],
                                lvl,
                                startupName,
                                String(document)
                              ),
                            ]);
                            setLoading(false);
                          });
                      });
                    });
                } else {
                  router.push("/app/pricing");
                }
              }
            }
          });
      } else {
        router.push("/c/main");
      }
    }
  }, []);

  if (loading) {
    return <MyLoadingScreen />;
  }

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
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  if (!loading) {
    return (
      <Flex
        width={"100vw"}
        height={"100vh"}
        backgroundColor={"#323232"}
        direction={"column"}
        alignItems={"center"}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor={"#323232"}>
            <ModalHeader color={"white"}>My info</ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <form onSubmit={changeData}>
                <Flex direction={"column"} alignItems={"center"} gap={"1vh"}>
                  <Flex
                    width={"95%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"0.3vw"}
                  >
                    <Text color={"white"}>Username: </Text>
                    <Input
                      color={"white"}
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
                    <Text color={"white"}>Email: </Text>
                    <Input
                      color={"white"}
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
                      color={"white"}
                      colorScheme={"transparent"}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalOverlay />
          <ModalContent backgroundColor={"#323232"}>
            <ModalHeader color={"white"}>Future Updates</ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <Text color={"white"}>
                In the future there is a lot of things we want to do to make
                this be the best application for startups. First of all we would
                like to create partnerships where you can invite people and call
                with them to collaborate on projects. We also want to implement
                custom backgrounds and greater responsiveness. We also have a
                plan of creating mobile applications for both iOS and Android,
                and web application for all operating systems in the future. We
                also want to add more features than just the video game, such as
                services to help boost startups. If you have any recommendations
                or feedback, feel free to email us at gloppaglow@gmail.com.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose2}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingLeft={7}
          paddingRight={4}
          paddingTop={2.5}
          paddingBottom={2.5}
          width={"100vw"}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"2.5vw"}
          >
            <NextLink href={"/app/startuplist"}>
              <Link color={"white"} fontWeight={700} fontSize={"20pt"}>
                Gloppa
              </Link>
            </NextLink>
            <NextLink href={"/app/productreview"}>
              <Link color={"white"} fontWeight={400} fontSize={"16pt"}>
                Product Review
              </Link>
            </NextLink>
            <NextLink href={"/app/funding"}>
              <Link color={"white"} fontWeight={400} fontSize={"16pt"}>
                Funding
              </Link>
            </NextLink>
          </Flex>
          <Tooltip
            label={"Personal Settings for " + uname + "!"}
            aria-label="A tooltip"
          >
            <Menu>
              <MenuButton colorScheme={"transparent"}>
                <Image
                  src={"/assets/profile.png"}
                  alt={"Gloppa profile"}
                  width={50}
                  height={50}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onOpen2}>Future Updates</MenuItem>
                <MenuItem onClick={onOpen}>Update Info</MenuItem>
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Tooltip>
        </Flex>
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
                  src={"/assets/nodata.png"}
                  alt={"No data"}
                  width={400}
                  height={400}
                />
                <Text color={"white"} textAlign={"center"} fontSize={"25pt"}>
                  No startups <br />
                  found here... 😔
                </Text>
              </Flex>
            )}
            {/* {StartupComponent("/assets/spacer.png", "13", "DreamMate")}
          {StartupComponent("/assets/spacer.png", "13", "Krunker")}
          {StartupComponent("/assets/spacer.png", "13", "Lol")}
          {StartupComponent("/assets/spacer.png", "13", "Gloppa")} */}
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default StartupList;
