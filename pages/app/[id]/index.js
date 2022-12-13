import {
  Button,
  Checkbox,
  Flex,
  Link,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  OrderedList,
  Text,
  UnorderedList,
  useDisclosure,
  Lorem,
  Input,
  useToast,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";
import BrainstormComponent from "./brainstormcomponent";
import ToDoComponent from "./todocomponent";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import MyLoadingScreen from "./myloadingscreen";
import Achievements from "./achievements";

const Game = () => {
  const [lvl, setLvl] = useState("0");
  const [startupName, setStartupName] = useState("Placeholder");
  const [coins, setCoins] = useState("0");
  const quotes = [
    "Keep going you will reach victory soon!",
    "Focus on problems one step at a time.",
    "The people who don't quit are the ones that succeed!",
  ];
  const router = useRouter();
  console.log("ID " + router.query.id);
  const [rowsTask, setRowsTask] = useState([]);
  const [rowsBrainstorm, setRowsBrainstorm] = useState([]);
  const [rowsAchievements, setRowsAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quota, setQuota] = useState(quotes[getRandomInt(quotes.length)]);
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
  const toast = useToast();
  const toast2 = useToast();

  const [startupText2, setStartupText2] = useState("");
  const [urgency2, setUrgency2] = useState("");

  const [startupText, setStartupText] = useState("");
  const [urgency, setUrgency] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (router.isReady) {
      db.collection("startups")
        .doc(router.query.id)
        .get()
        .then((val) => {
          setLvl(String(Math.floor(val.get("level") / 100) + 1));
          setStartupName(String(val.get("startupName")));
          setCoins(String(val.get("coins")));
          let tasks = val.get("tasks");
          for (let i = tasks.length - 1; i >= 0; i--) {
            console.log(tasks[i]);
            let orr = JSON.parse(tasks[i]);
            let color = "red";
            if (orr[1] == "Urgent") {
              color = "red";
            } else if (orr[1] == "Medium") {
              color = "yellow";
            } else {
              color = "lightgreen";
            }
            setRowsTask((prevTasks) => [
              ...prevTasks,
              ToDoComponent(orr[0], orr[1], orr[2], color, i, router.query.id),
            ]);
          }
          let achs = val.get("completed");
          for (let o = achs.length - 1; o >= achs.length - 4; o--) {
            if (typeof achs[o] === "undefined") {
              break;
            }
            let urr = JSON.parse(achs[o]);
            setRowsAchievements((prevAchs) => [
              ...prevAchs,
              Achievements(urr[0], 5),
            ]);
          }
          let brainstorm = val.get("brainstorm");
          for (let i = brainstorm.length - 1; i >= 0; i--) {
            console.log(brainstorm[i]);
            let err = JSON.parse(brainstorm[i]);
            let color = "red";
            if (err[1] == "High") {
              color = "lightgreen";
            } else if (err[1] == "Medium") {
              color = "yellow";
            } else {
              color = "red";
            }
            setRowsBrainstorm((prevBrainstorm) => [
              ...prevBrainstorm,
              BrainstormComponent(err[0], err[1], color, i, router.query.id),
            ]);
          }
          setLoading(false);
        });
    }
  }, [router]);
  if (loading) {
    return <MyLoadingScreen />;
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const submitIdea = (e) => {
    e.preventDefault();
    db.collection("startups")
      .doc(router.query.id)
      .update({
        tasks: arrayUnion(
          JSON.stringify([String(startupText), String(urgency), String(date)])
        ),
      });
    setStartupText("");
    setUrgency("");
    setDate("");
    toast({
      title: "Task Created",
      description: "Task was successfully created.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setTimeout(() => {
      console.log("timer completed");
      window.location.reload();
    }, 500);
  };

  const submitIdea2 = (e) => {
    e.preventDefault();
    db.collection("startups")
      .doc(router.query.id)
      .update({
        brainstorm: arrayUnion(
          JSON.stringify([String(startupText2), String(urgency2)])
        ),
      });
    setStartupText2("");
    setUrgency2("");
    toast2({
      title: "Brainstorm Created",
      description: "Brainstorm was successfully created.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setTimeout(() => {
      console.log("timer completed");
      window.location.reload();
    }, 500);
  };

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>To Do List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => submitIdea(e)}>
              <Flex
                direction={"column"}
                gap={"3vh"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingBottom={"1vh"}
              >
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text>Message</Text>
                  <Input
                    value={startupText}
                    placeHolder={"This should be simple..."}
                    width={"20vw"}
                    onChange={(e) => setStartupText(e.target.value)}
                    required
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text>Urgency</Text>
                  <Select
                    required
                    onChange={(val) => setUrgency(val.value)}
                    colorScheme="purple"
                    defaultValue={"Urgent"}
                    options={[
                      {
                        label: "Urgent",
                        value: "Urgent",
                      },
                      {
                        label: "Medium",
                        value: "Medium",
                      },
                      {
                        label: "No Urgency",
                        value: "No Urgency",
                      },
                    ]}
                  />
                </Flex>
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text>Due Date</Text>
                  <Input
                    value={date}
                    type="date"
                    min={maxDate}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    width={"20vw"}
                  />
                </Flex>
                <Button type={"submit"} colorScheme="blue" mr={3}>
                  Submit
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Brainstorm List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => submitIdea2(e)}>
              <Flex
                direction={"column"}
                gap={"3vh"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingBottom={"1vh"}
              >
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text>Message</Text>
                  <Input
                    value={startupText2}
                    placeHolder={"This should be simple..."}
                    width={"20vw"}
                    onChange={(e) => setStartupText2(e.target.value)}
                    required
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text>Probability of Reality</Text>
                  <Select
                    required
                    onChange={(val) => setUrgency2(val.value)}
                    colorScheme="purple"
                    defaultValue={"Urgent"}
                    options={[
                      {
                        label: "High",
                        value: "High",
                      },
                      {
                        label: "Medium",
                        value: "Medium",
                      },
                      {
                        label: "Low",
                        value: "Low",
                      },
                    ]}
                  />
                </Flex>
                <Button type={"submit"} colorScheme="blue" mr={3}>
                  Submit
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen3} onClose={onClose3}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leaderboards</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100vw"}
        backgroundColor={"#1C1C1C"}
        padding={5}
      >
        <NextLink href={"/app/startuplist"}>
          <Link color={"white"} fontSize={"20pt"}>
            Gloppa
          </Link>
        </NextLink>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"1vw"}
        >
          <Flex>
            <Box position="relative" display="flex">
              <Box
                as="img"
                width={50}
                src={"/assets/award.png"}
                alt="My Image"
              />
              <Box
                position="absolute"
                top="45%"
                right={"37%"}
                transform="translateY(-50%)"
                textAlign="center"
              >
                <Text fontWeight={900} fontSize={"20pt"}>
                  <Tooltip
                    label={"You are currently level " + lvl + "!"}
                    aria-label="A tooltip"
                  >
                    {lvl}
                  </Tooltip>
                </Text>
              </Box>
            </Box>
          </Flex>
          <Text color={"white"} fontSize={"22pt"} fontWeight={700}>
            {startupName}
          </Text>
        </Flex>
        <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button variant={"ghost"} colorScheme={"none"} onClick={onOpen3}>
              <Image
                src={"/assets/leaderboard.png"}
                alt={"Gloppa Leaderboard"}
                width={40}
                height={40}
              />
            </Button>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Image
                src={"/assets/coin.png"}
                alt={"Coin Gloppa"}
                width={30}
                height={30}
              />
              <Text color={"white"}>{coins}</Text>
            </Flex>
            <Button variant={"ghost"} colorScheme={"none"}>
              <Image
                src={"/assets/shop.png"}
                alt={"Gloppa Shop"}
                width={40}
                height={40}
              />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"5vw"}
        paddingTop={"2vh"}
        paddingBottom={"4vh"}
        borderBottom={"1px solid white"}
        width={"100vw"}
      >
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"40vw"}
        >
          <Image
            src={"/assets/spacer.png"}
            alt={"Gloppa Spacer"}
            width={350}
            height={350}
          />
          <Text color={"white"}>
            Semi-advanced factory (producing 1 coin an hour)
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"left"}
          justifyContent={"center"}
          width={"30vw"}
          gap={"1.4vh"}
        >
          <Text color={"white"} fontSize={"25pt"} marginBottom={"2vh"}>
            {quota}
          </Text>
          <Text color={"white"} fontSize={"18pt"} fontWeight={900}>
            Achievements:
          </Text>
          <UnorderedList color={"white"}>
            {rowsAchievements.length < 1 ? (
              <ListItem>
                <Flex direction={"row"} alignItems={"center"}>
                  <Text color={"white"} marginRight={"1vw"}>
                    No achievements are here yet... 🙁
                  </Text>
                </Flex>
              </ListItem>
            ) : (
              rowsAchievements
            )}
          </UnorderedList>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={"2vh"}
        gap={"1vw"}
      >
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"48vw"}
          backgroundColor={"#1c1c1c"}
          borderRadius={10}
        >
          <Flex direction={"row"} alignItems={"center"}>
            <Text
              fontWeight={400}
              color={"white"}
              fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
            >
              To-Do List
            </Text>
            <Button colorScheme="transparent" onClick={onOpen}>
              <Image
                src={"/assets/plus.png"}
                alt={"Gloppa plus"}
                width={30}
                height={30}
              />
            </Button>
          </Flex>
          <Flex
            direction={"column"}
            alignItems={"center"}
            width={"100%"}
            height={"25vh"}
            marginTop={"1vh"}
            overflowY={"scroll"}
          >
            {rowsTask.length < 1 ? (
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
                  width={170}
                  height={170}
                />
                <Text color={"white"} textAlign={"center"} fontSize={"12pt"}>
                  No tasks <br />
                  found here... 😔
                </Text>
              </Flex>
            ) : (
              rowsTask
            )}
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"48vw"}
          backgroundColor={"#1c1c1c"}
          borderRadius={10}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text
              fontWeight={400}
              color={"white"}
              fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
            >
              Brainstorming
            </Text>
            <Button colorScheme="transparent" onClick={onOpen2}>
              <Image
                src={"/assets/plus.png"}
                alt={"Gloppa plus"}
                width={30}
                height={30}
              />
            </Button>
          </Flex>
          <Flex
            direction={"column"}
            alignItems={"center"}
            width={"100%"}
            marginTop={"1vh"}
            height={"25vh"}
            overflowY={"scroll"}
          >
            {rowsBrainstorm.length < 1 ? (
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
                  width={170}
                  height={170}
                />
                <Text color={"white"} textAlign={"center"} fontSize={"12pt"}>
                  No brainstorms <br />
                  found here... 😔
                </Text>
              </Flex>
            ) : (
              rowsBrainstorm
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Game;
