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
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import FundingComponent from "./fundingcomponent";
import Router, { useRouter } from "next/router";
import MyLoadingScreen from "./myloadingscreen";

const Funding = () => {
  const [uname, setUname] = useState("");
  const [loading, setLoading] = useState(true);
  const [oguname, setOgUname] = useState("");
  const [email, setEmail] = useState("");
  const [funds, setFunds] = useState([]);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            let n = val.get("startups");
            setUname(val.get("username"));
            setOgUname(val.get("username"));
            setEmail(val.get("email"));
            n.reverse();
            if (n.length < 1) setLoading(false);
            db.collection("funding").onSnapshot((val) => {
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
                  setFunds((prevFunds) => [
                    ...prevFunds,
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
                      stid
                    ),
                  ]);
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
  }, []);

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
            <NextLink href={"/app/jobs"}>
              <Link color={"white"} fontWeight={400} fontSize={"16pt"}>
                Jobs
              </Link>
            </NextLink>
          </Flex>
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
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          height={"90vh"}
          width={"65vw"}
          backgroundColor={"#1C1c1c"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingTop={10}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}
            top={{ base: "5vh", md: "4.5vh", lg: "4vh" }}
          >
            <Text
              color={"white"}
              fontWeight={700}
              fontSize={{ base: "30pt", md: "35pt", lg: "40pt" }}
              textShadow={"0px 4px 1px rgba(0,0,0,0.6)"}
            >
              Funding
            </Text>
            <Tooltip
              label={"Add startup to public funding!"}
              aria-label="A tooltip"
            >
              <Button
                colorScheme="transparent"
                onClick={() => router.push("/app/fundingregistration")}
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
            direction={"column"}
            alignItems={"center"}
            gap={"2vh"}
            width={"100%"}
            overflowY={"scroll"}
          >
            <Text
              color={"white"}
              textAlign={"center"}
              fontSize={{ base: "9pt", md: "10.5pt", lg: "12pt" }}
              marginLeft={"5vw"}
              marginRight={"5vw"}
            >
              ⚠️ Note: You need to have at least a level 3 startup to be able to
              apply for funding.
            </Text>
            {
              //funds.length > 0 ? (
              funds
              // ) : (
              //   <Flex
              //     direction={"column"}
              //     alignItems={"center"}
              //     justifyContent={"center"}
              //     width={"90%"}
              //     height={"90%"}
              //   >
              //     <Image
              //       src={"/assets/nodata.png"}
              //       alt={"No data"}
              //       width={400}
              //       height={400}
              //     />
              //     <Text color={"white"} textAlign={"center"} fontSize={"25pt"}>
              //       No funding <br />
              //       found here yet... 😔
              //     </Text>
              //   </Flex>
              //)
            }
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default Funding;
