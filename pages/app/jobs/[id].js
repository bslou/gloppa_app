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
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import JobsComponent from "./jobscomp2";

const Jobs = () => {
  const router = useRouter();

  const [oguname, setOgUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();

  const [jobTitle, setJobTitle] = useState("");
  const [startupName, setStartupName] = useState("");
  const [link, setLink] = useState("");
  const [loc, setLoc] = useState("");
  const [imog, setImog] = useState("");
  const [id, setId] = useState("");
  const [idts, setIdts] = useState("");
  const [mine, setMine] = useState("");

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      router.push("/");
      return;
    } else {
      if (router.isReady) {
        db.collection("jobs")
          .doc(router.query.id)
          .onSnapshot((snapshot) => {
            if (typeof snapshot.data() === "undefined") {
              router.push("/app/jobs");
              toast({
                title: "ID does not exist",
                description: "The id either got removed or it does not exist.",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
              return;
            }
          });
        console.log("on");
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            //let n = val.get("startups");
            setUname(val.get("username"));
            setOgUname(val.get("username"));
            setEmail(val.get("email"));
            console.log("ID name " + router.query.id);
            db.collection("jobs")
              .doc(router.query.id)
              .get()
              .then((val2) => {
                setJobTitle(val2.get("jobtitle"));
                setStartupName(val2.get("startupName"));
                setLink(val2.get("linkjob"));
                setLoc(val2.get("location"));
                setId(router.query.id);
                setIdts(val2.get("startupId"));
                db.collection("startups")
                  .doc(val2.get("startupId"))
                  .get()
                  .then((val3) => {
                    if (val.get("startups").includes(val2.get("startupId"))) {
                      setMine(true);
                    } else {
                      setMine(false);
                    }
                    console.log("Jobs: " + val3.get("jobs"));
                    let img = val3.get("img");
                    storage
                      .ref(img)
                      .getDownloadURL()
                      .then((url) => {
                        setImog(url);
                        setLoading(false);
                      });
                  });
              });
          });
      } else {
        console.log("off");
      }
    }
  }, [router]);

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
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#f2f2f2"}
      direction={"column"}
      alignItems={"center"}
    >
      {/* <Modal isOpen={isOpen} onClose={onClose}>
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
      </Modal> */}
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingLeft={3}
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
          <Button
            colorScheme={"transparent"}
            onClick={() => router.push("/app/jobs")}
          >
            <Link color={"black"}>
              <img
                style={{ filter: "brightness(0)" }}
                src={"/assets/back.png"}
                alt={"Back"}
                width={60}
                height={60}
              />
            </Link>
          </Button>
        </Flex>
        {/* <Menu>
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
        </Menu> */}
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        backgroundColor={"#fff"}
        height={"90%"}
        width={"65vw"}
        borderTopLeftRadius={2}
        borderTopRightRadius={2}
        boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
      >
        {/* <Flex
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
            {startupName} Job
          </Text>
        </Flex> */}
        <Text
          fontWeight={300}
          color={"black"}
          fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
        >
          {startupName} Job
        </Text>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={"2vh"}
          width={"100%"}
          overflowY={"scroll"}
          paddingTop={2}
          paddingBottom={2}
        >
          {JobsComponent(
            link,
            id,
            idts,
            startupName,
            jobTitle,
            imog,
            loc,
            toast,
            mine
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Jobs;
