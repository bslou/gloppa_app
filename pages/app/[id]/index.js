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
  Textarea,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { db } from "../../api/firebaseconfig";
import BrainstormComponent from "./brainstormcomponent";
import ToDoComponent from "./todocomponent";
import { arrayUnion, arrayRemove, increment } from "firebase/firestore";
import MyLoadingScreen from "./myloadingscreen";
import Achievements from "./achievements";
import Leaderboards from "./leaderboards";

const Game = () => {
  const [lvl, setLvl] = useState("0");
  const [startupName, setStartupName] = useState("Placeholder");
  const [startupName2, setStartupName2] = useState("Placeholder");
  const [startupLocation, setStartupLocation] = useState("Placeholder");
  const [startupDes, setStartupDes] = useState("Placeholder");
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
  const [rowsLeaderboards, setRowsLeaderboards] = useState([]);
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
  const {
    isOpen: isOpen6,
    onOpen: onOpen6,
    onClose: onClose6,
  } = useDisclosure();
  const {
    isOpen: isOpen7,
    onOpen: onOpen7,
    onClose: onClose7,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const toast2 = useToast();
  const toast3 = useToast();

  const [startupText2, setStartupText2] = useState("");
  const [urgency2, setUrgency2] = useState("High");

  const [startupText, setStartupText] = useState("");
  const [urgency, setUrgency] = useState("Urgent");
  const [date, setDate] = useState("");

  const [time, setTime] = useState(900);
  const [isRunning, setIsRunning] = useState(false);

  const [selectedAcc, setSelectedAcc] = useState(0);
  const [acc, setAcc] = useState([]);

  const [intervalId, setIntervalId] = useState();

  const accessories = [
    [
      "/assets/spacer.png",
      "/assets/spacer1.png",
      "Beginner factory (producing 5 coins a day)",
      0,
      5,
    ],
    [
      "/assets/spacert.png",
      "/assets/spacer2.png",
      "Medium factory (producing 10 coins a day)",
      100,
      10,
    ],
    [
      "/assets/spacerth.png",
      "/assets/spacer3.png",
      "Comfort-Zone factory (producing 25 coins a day)",
      1000,
      25,
    ],
    [
      "/assets/spacerf.png",
      "/assets/spacer4.png",
      "Semi-advanced factory (producing 50 coins a day)",
      10000,
      50,
    ],
    [
      "/assets/spacerfi.png",
      "/assets/spacer5.png",
      "Advanced factory (producing 100 coins a day)",
      100000,
      100,
    ],
  ];

  useEffect(() => {
    if (router.isReady) {
      db.collection("startups")
        .doc(router.query.id)
        .get()
        .then((val) => {
          setLvl(String(Math.floor(val.get("level") / 100) + 1));
          setStartupName(String(val.get("startupName")));
          setStartupName2(String(val.get("startupName")));
          setStartupDes(String(val.get("description")));
          setStartupLocation(String(val.get("startupLocation")));
          setAcc(val.get("accessories"));
          setSelectedAcc(val.get("selectedAccessory"));
          setCoins(String(val.get("coins")));
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, "0");
          var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = today.getFullYear();

          today = mm + "/" + dd + "/" + yyyy;

          if (val.get("factoryCoinsDate") == "") {
            console.log("Coins " + accessories[selectedAcc][4]);
            db.collection("startups")
              .doc(router.query.id)
              .update({ coins: increment(accessories[selectedAcc][4]) });
            setCoins(coins + accessories[selectedAcc][4]);
            db.collection("startups")
              .doc(router.query.id)
              .update({ factoryCoinsDate: today });
          } else {
            if (val.get("factoryCoinsDate") != today) {
              const date1 = new Date(String(val.get("factoryCoinsDate")));
              const date2 = new Date(String(today));
              const diffTime = Math.abs(date2 - date1);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              db.collection("startups")
                .doc(router.query.id)
                .update({
                  coins: increment(accessories[selectedAcc][4] * diffDays),
                });
              db.collection("startups")
                .doc(router.query.id)
                .update({ factoryCoinsDate: today });
              setCoins(coins + accessories[selectedAcc][4] * diffDays);
            }
          }

          let tasks = val.get("tasks");
          let urg = [];
          let mdm = [];
          let noturg = [];
          //for (let i = tasks.length - 1; i >= 0; i--) {
          for (let i = 0; i < tasks.length; i++) {
            console.log(tasks[i]);
            let orr = JSON.parse(tasks[i]);
            let color = "red";
            if (orr[1] == "Urgent") {
              color = "red";
              urg.push(
                ToDoComponent(orr[0], orr[1], orr[2], color, i, router.query.id)
              );
            } else if (orr[1] == "Medium") {
              color = "yellow";
              mdm.push(
                ToDoComponent(orr[0], orr[1], orr[2], color, i, router.query.id)
              );
            } else {
              color = "green";
              noturg.push(
                ToDoComponent(orr[0], orr[1], orr[2], color, i, router.query.id)
              );
            }
          }
          let arr = urg.concat(mdm, noturg);
          setRowsTask(arr);

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
          let high = [];
          let medm = [];
          let low = [];
          //for (let i = brainstorm.length - 1; i >= 0; i--) {
          for (let i = 0; i < brainstorm.length; i++) {
            console.log(brainstorm[i]);
            let err = JSON.parse(brainstorm[i]);
            let color = "red";
            if (err[1] == "High") {
              color = "green";
              high.push(
                BrainstormComponent(err[0], err[1], color, i, router.query.id)
              );
            } else if (err[1] == "Medium") {
              color = "yellow";
              medm.push(
                BrainstormComponent(err[0], err[1], color, i, router.query.id)
              );
            } else {
              color = "red";
              low.push(
                BrainstormComponent(err[0], err[1], color, i, router.query.id)
              );
            }
            let arror = high.concat(medm, low);
            setRowsBrainstorm(arror);
          }
          setLoading(false);
        });
      let query = db.collection("startups").orderBy("level", "desc");
      query
        .get()
        .then(function (querySnapshot) {
          // Loop through the query results
          querySnapshot.forEach(function (doc) {
            // Get the value of the "name" field for each document
            let ido = doc.id;
            var stName = doc.data().startupName;
            var stLvl = String(Math.floor(doc.data().level / 100) + 1);
            let img = accessories[doc.data().selectedAccessory][1];
            console.log(startupName);
            console.log(stLvl);
            setRowsLeaderboards((prevLeaderboards) => [
              ...prevLeaderboards,
              Leaderboards(
                img,
                stLvl,
                stName,
                String(prevLeaderboards.length + 1),
                router.query.id == ido
              ),
            ]);
          });
        })
        .catch(function (error) {
          // Handle any errors that occurred during the query
          console.error(error);
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

  const changeVal = (e) => {
    e.preventDefault();
    db.collection("startups").doc(router.query.id).update({
      startupName: startupName2,
      startupLocation: startupLocation,
      description: startupDes,
    });
    setTimeout(() => {
      console.log("timer completed");
      window.location.reload();
    }, 500);
  };

  let audio = new Audio("/assets/alarm.mp3");

  const startTimer = () => {
    setIsRunning(true);
    let ot = time;
    var intId = setInterval(() => {
      ot--;
      setTime((timeLeft) => timeLeft - 1);
      //console.log("Time set: " + ot);
      if (ot < 1) {
        setIsRunning(false);
        clearInterval(intId);
        setCoins(parseInt(coins) + 5);
        db.collection("startups")
          .doc(router.query.id)
          .update({ coins: increment(5) });
        db.collection("startups")
          .doc(router.query.id)
          .update({ level: increment(5) });
        db.collection("startups")
          .doc(router.query.id)
          .update({
            completed: arrayUnion(
              JSON.stringify([
                "Completed " + time / 60 + " minutes of intense work time",
              ])
            ),
          });
        toast({
          title: "Work time finished!",
          description:
            "You have successfully earned 5 coins from this session.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose5();
        audio.play();
      }
    }, 1000);
    setIntervalId(intId);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  const buyFactory = (ind) => {
    if (acc.includes(ind)) {
      if (selectedAcc != ind) {
        db.collection("startups")
          .doc(router.query.id)
          .update({ selectedAccessory: ind });
        setTimeout(() => {
          console.log("timer completed");
          window.location.reload();
        }, 500);
      } else {
        toast3({
          title: "Factory already selected",
          description: "This factory is already selected right now.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      if (coins >= accessories[ind][3]) {
        setCoins(coins - accessories[ind][3]);
        db.collection("startups")
          .doc(router.query.id)
          .update({
            coins: increment(-accessories[ind][3]),
          });
        db.collection("startups")
          .doc(router.query.id)
          .update({ selectedAccessory: ind });
        db.collection("startups")
          .doc(router.query.id)
          .update({ accessories: arrayUnion(ind) });
        setTimeout(() => {
          console.log("timer completed");
          window.location.reload();
        }, 500);
      } else {
        toast3({
          title: "Not enough coins",
          description: "You need to work more on the startup to afford this.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
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
      <AlertDialog
        isOpen={isOpen7}
        leastDestructiveRef={cancelRef}
        onClose={onClose7}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Stop timer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose7}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose5();
                  clearInterval(intervalId);
                  setIsRunning(false);
                  setTime(900);
                  onClose7();
                }}
                ml={3}
              >
                Stop Timer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>To Do List</ModalHeader>
          <ModalCloseButton color={"white"} />
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
                  <Text color={"white"}>Message</Text>
                  <Input
                    color={"white"}
                    value={startupText}
                    placeHolder={"This should be simple..."}
                    width={"20vw"}
                    onChange={(e) => setStartupText(e.target.value)}
                    minLength={3}
                    maxLength={45}
                    required
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text color={"white"}>Urgency</Text>
                  <Select
                    required
                    onChange={(val) => setUrgency(val.target.value)}
                    value={urgency}
                    color={"white"}
                    backgroundColor={"#323232"}
                  >
                    <option value={"Urgent"}>Urgent</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"No Urgency"}>No Urgency</option>
                  </Select>
                </Flex>
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"white"}>Due Date</Text>
                  <Input
                    value={date}
                    type="date"
                    min={maxDate}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    width={"20vw"}
                    color={"white"}
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
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>Brainstorm List</ModalHeader>
          <ModalCloseButton color={"white"} />
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
                  <Text color={"white"}>Message</Text>
                  <Input
                    value={startupText2}
                    placeHolder={"This should be simple..."}
                    width={"20vw"}
                    color="white"
                    minLength={3}
                    maxLength={45}
                    onChange={(e) => setStartupText2(e.target.value)}
                    required
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text color={"white"}>Probability of Reality</Text>
                  <Select
                    color={"white"}
                    backgroundColor={"#323232"}
                    required
                    onChange={(val) => setUrgency2(val.target.value)}
                    value={urgency2}
                  >
                    <option value={"High"}>High</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Low"}>Low</option>
                  </Select>
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
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>Leaderboards</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Flex direction={"column"} alignItems={"center"} gap={"3vh"}>
              {rowsLeaderboards}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen4} onClose={onClose4}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>Startup Info</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <form onSubmit={(e) => changeVal(e)}>
              <Flex
                direction={"column"}
                gap={"3vh"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingBottom={"1vh"}
                maxHeight={"65vh"}
              >
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"white"}>Startup Name</Text>
                  <Input
                    minLength={3}
                    value={startupName2}
                    width={"20vw"}
                    color={"white"}
                    required
                    onChange={(e) => setStartupName2(e.target.value)}
                  />
                </Flex>
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"white"}>Startup Location</Text>
                  <Input
                    type="text"
                    color={"white"}
                    required
                    value={startupLocation}
                    width={"20vw"}
                    minLength={3}
                    onChange={(e) => setStartupLocation(e.target.value)}
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text color={"white"}>Startup Description</Text>
                  <Textarea
                    minLength={3}
                    value={startupDes}
                    color={"white"}
                    required
                    width={"20vw"}
                    minHeight={"10vh"}
                    maxHeight={"20vh"}
                    onChange={(e) => setStartupDes(e.target.value)}
                  />
                </Flex>

                <Flex>
                  <Button type={"submit"} colorScheme="blue" mr={3}>
                    Submit Edits
                  </Button>
                  <Button
                    colorScheme="ghost"
                    onClick={onClose4}
                    mr={3}
                    color={"white"}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen5} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#323232"}>
          <ModalHeader color={"white"}>Work Alarm</ModalHeader>
          <ModalBody>
            <Flex
              direction="column"
              align="center"
              justify="center"
              marginTop={5}
              marginBottom={5}
              backgroundColor={"#cdcdcd"}
              padding={5}
              borderRadius={10}
            >
              <Heading>Work Time</Heading>
              <Select
                onChange={(e) => setTime(e.target.value * 60)}
                marginTop={2}
                disabled={isRunning}
                backgroundColor={"#bcbcbc"}
                borderColor={"#ababab"}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1 hour 30 minute</option>
              </Select>
              <Text fontSize="4xl" marginTop={3} marginBottom={3}>
                {time} seconds
              </Text>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Button
                  colorScheme={"blue"}
                  // onClick={isRunning ? stopTimer : startTimer}
                  onClick={startTimer}
                  disabled={isRunning}
                >
                  {/* {isRunning ? "Pause" : "Start"} */}
                  Start
                </Button>
                <Button
                  onClick={isRunning ? onOpen7 : onClose5}
                  variant={"ghost"}
                  colorScheme={"transparent"}
                >
                  Close
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen6} onClose={onClose6}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#323232"}>
          <ModalCloseButton color={"white"} />
          <ModalHeader color={"white"}>Shop</ModalHeader>
          <ModalBody maxH={"60vh"} overflowY="scroll">
            <Flex direction={"column"} alignItems={"center"} gap={5}>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"5%"}
              >
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"47%"}
                  padding={7}
                  borderRadius={5}
                  gap={5}
                  backgroundColor={"#fff"}
                >
                  <Image src={accessories[0][0]} width={300} height={300} />
                  <Text fontSize={"12pt"} textAlign={"center"}>
                    {accessories[0][2]}
                  </Text>
                  <Button
                    colorScheme={"blue"}
                    width={"100%"}
                    onClick={() => buyFactory(0)}
                  >
                    {acc.includes(0)
                      ? selectedAcc == 0
                        ? "Selected"
                        : "Select"
                      : "Free"}
                  </Button>
                </Flex>
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"47%"}
                  padding={7}
                  borderRadius={5}
                  gap={5}
                  backgroundColor={"#fff"}
                >
                  <Image src={accessories[1][0]} width={300} height={300} />
                  <Text fontSize={"12pt"} textAlign={"center"}>
                    {accessories[1][2]}
                  </Text>
                  <Button
                    colorScheme={"blue"}
                    width={"100%"}
                    onClick={() => buyFactory(1)}
                  >
                    {acc.includes(1)
                      ? selectedAcc == 1
                        ? "Selected"
                        : "Select"
                      : "🌕 " + accessories[1][3]}
                  </Button>
                </Flex>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"5%"}
              >
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"47%"}
                  padding={7}
                  borderRadius={5}
                  gap={5}
                  backgroundColor={"#fff"}
                >
                  <Image src={accessories[2][0]} width={300} height={300} />
                  <Text fontSize={"12pt"} textAlign={"center"}>
                    {accessories[2][2]}
                  </Text>
                  <Button
                    colorScheme={"blue"}
                    width={"100%"}
                    onClick={() => buyFactory(2)}
                  >
                    {acc.includes(2)
                      ? selectedAcc == 2
                        ? "Selected"
                        : "Select"
                      : "🌕 " + accessories[2][3]}
                  </Button>
                </Flex>
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"47%"}
                  padding={7}
                  borderRadius={5}
                  gap={5}
                  backgroundColor={"#fff"}
                >
                  <Image src={accessories[3][0]} width={300} height={300} />
                  <Text fontSize={"12pt"} textAlign={"center"}>
                    {accessories[3][2]}
                  </Text>
                  <Button
                    colorScheme={"blue"}
                    width={"100%"}
                    onClick={() => buyFactory(3)}
                  >
                    {acc.includes(3)
                      ? selectedAcc == 3
                        ? "Selected"
                        : "Select"
                      : "🌕 " + accessories[3][3]}
                  </Button>
                </Flex>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"5%"}
                width={"100%"}
              >
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"47%"}
                  padding={7}
                  borderRadius={5}
                  gap={5}
                  backgroundColor={"#fff"}
                >
                  <Image src={accessories[4][0]} width={300} height={300} />
                  <Text fontSize={"12pt"} textAlign={"center"}>
                    {accessories[4][2]}
                  </Text>
                  <Button
                    colorScheme={"blue"}
                    width={"100%"}
                    onClick={() => buyFactory(4)}
                  >
                    {acc.includes(4)
                      ? selectedAcc == 4
                        ? "Selected"
                        : "Select"
                      : "🌕 " + accessories[4][3]}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
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
        <Flex alignItems={"center"} justifyContent={"center"}>
          <NextLink href={"/app/startuplist"}>
            <Link color={"white"} fontSize={"20pt"}>
              Gloppa
            </Link>
          </NextLink>
          <Tooltip label={"Intense working alarm"} aria-label="A tooltip">
            <Button
              onClick={onOpen5}
              colorScheme={"transparent"}
              variant={"ghost"}
            >
              <Image
                src={"/assets/lawyer.png"}
                alt={"Gloppa lawyer"}
                width={35}
                height={35}
              />
            </Button>
          </Tooltip>
        </Flex>
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
                <Text
                  fontWeight={900}
                  fontSize={{ base: "11pt", md: "13pt", lg: "15pt" }}
                >
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
          <Link
            colorScheme={"transparent"}
            color={"white"}
            fontSize={{ base: "16pt", md: "19pt", lg: "22pt" }}
            fontWeight={700}
            onClick={onOpen4}
          >
            {startupName}
          </Link>
        </Flex>
        <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Tooltip label={"Leaderboards"} aria-label="A tooltip">
              <Button variant={"ghost"} colorScheme={"none"} onClick={onOpen3}>
                <Image
                  src={"/assets/leaderboard.png"}
                  alt={"Gloppa Leaderboard"}
                  width={40}
                  height={40}
                />
              </Button>
            </Tooltip>
            <Tooltip label={"Coins are all self-made."} aria-label="A tooltip">
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Image
                  src={"/assets/coin.png"}
                  alt={"Coin Gloppa"}
                  width={30}
                  height={30}
                />
                <Text color={"white"}>{coins}</Text>
              </Flex>
            </Tooltip>
            <Tooltip label={"Shop"} aria-label="A tooltip">
              <Button onClick={onOpen6} variant={"ghost"} colorScheme={"none"}>
                <Image
                  src={"/assets/shop.png"}
                  alt={"Gloppa Shop"}
                  width={40}
                  height={40}
                />
              </Button>
            </Tooltip>
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
            src={accessories[selectedAcc][0]}
            alt={"Gloppa Spacer"}
            width={280}
            height={280}
          />
          <Text
            color={"white"}
            fontSize={{ base: "9pt", md: "12pt", lg: "15pt" }}
          >
            {accessories[selectedAcc][2]}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"left"}
          justifyContent={"center"}
          width={"30vw"}
          gap={"1.4vh"}
        >
          <Text
            color={"white"}
            fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
            marginBottom={"2vh"}
          >
            {quota}
          </Text>
          <Text
            color={"white"}
            fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
            fontWeight={900}
          >
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
          boxShadow={"0 0 5px 1px rgba(0, 0, 0, 0.9)"}
        >
          <Flex direction={"row"} alignItems={"center"}>
            <Text
              fontWeight={400}
              color={"white"}
              fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
            >
              To-Do List
            </Text>
            <Tooltip label={"Add to task list"} aria-label="A tooltip">
              <Button colorScheme="transparent" onClick={onOpen}>
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
            width={"100%"}
            height={"25vh"}
            marginTop={"1vh"}
            overflowY={"scroll"}
            gap={"1vh"}
            style={{ overflowY: "scroll" }}
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
          boxShadow={"0 0 5px 1px rgba(0, 0, 0, 0.9)"}
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
            <Tooltip label={"Add to brainstorm list"} aria-label="A tooltip">
              <Button colorScheme="transparent" onClick={onOpen2}>
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
            width={"100%"}
            marginTop={"1vh"}
            height={"25vh"}
            overflowY={"scroll"}
            gap={"1vh"}
            style={{ overflowY: "scroll" }}
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
