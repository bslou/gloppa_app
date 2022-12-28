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
import { db, storage } from "../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const toast = useToast();
  const [uname, setUname] = useState("");
  const [oguname, setOgUname] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();
  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();
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
      } else {
        router.push("/c/main");
      }
    }
  }, [router, db]);

  return (
    <>
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
              In the future there is a lot of things we want to do to make this
              be the best application for startups. First of all we would like
              to create partnerships where you can invite people and call with
              them to collaborate on projects. We also want to implement custom
              backgrounds and greater responsiveness. We also have a plan of
              creating mobile applications for both iOS and Android, and web
              application for all operating systems in the future. We also want
              to add more features than just the video game, such as services to
              help boost startups. If you have any recommendations or feedback,
              feel free to email us at gloppaglow@gmail.com.
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
          <Menu isOpen={isOpen3}>
            <MenuButton
              color={"white"}
              onMouseEnter={onOpen3}
              onMouseLeave={onClose3}
            >
              Startups {isOpen3 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList onMouseEnter={onOpen3} onMouseLeave={onClose3}>
              <MenuItem onClick={() => router.push("/app/productreview")}>
                📦 Product Review
              </MenuItem>
              <MenuItem onClick={() => router.push("/app/funding")}>
                💸 Funding
              </MenuItem>
              <MenuItem onClick={() => router.push("/app/jobs")}>
                ‍💻 Jobs
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu isOpen={isOpen4}>
            <MenuButton
              color={"white"}
              onMouseEnter={onOpen4}
              onMouseLeave={onClose4}
            >
              Community {isOpen4 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList onMouseEnter={onOpen4} onMouseLeave={onClose4}>
              <MenuItem onClick={() => router.push("/app/messages")}>
                💬 Private Messages
              </MenuItem>
              <MenuItem onClick={() => router.push("/app/forum")}>
                📢 Public Forum
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu isOpen={isOpen5}>
            <MenuButton
              color={"white"}
              onMouseEnter={onOpen5}
              onMouseLeave={onClose5}
            >
              Education {isOpen5 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList onMouseEnter={onOpen5} onMouseLeave={onClose5}>
              <MenuItem onClick={() => router.push("/app/education")}>
                🎥 Educational Videos
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2vw"}
        >
          <Button
            bgGradient={"linear(to-r, #7928CA, #FF0080)"}
            color={"white"}
            fontSize={"16pt"}
            fontWeight={400}
            borderRadius={20}
            _hover={{ bgGradient: "linear(to-r, #6704CB, #CF0068)" }}
            onClick={() => router.push("/app/boost")}
            colorScheme={"transparent"}
          >
            🚀 Boost
          </Button>
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
      </Flex>
    </>
  );
};

export default NavBar;
