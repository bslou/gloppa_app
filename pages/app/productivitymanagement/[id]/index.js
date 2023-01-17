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
  Progress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { arrayUnion, arrayRemove, increment } from "firebase/firestore";
import MyLoadingScreen from "./myloadingscreen";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { db } from "../../../api/firebaseconfig";

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
  const [rowsAchievements, setRowsAchievements] = useState([]);
  const [rowsLeaderboards, setRowsLeaderboards] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todos2, setTodos2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quota, setQuota] = useState(quotes[getRandomInt(quotes.length)]);
  const [editData, setEditData] = useState([]);
  const [editData2, setEditData2] = useState([]);
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
  const {
    isOpen: isOpen8,
    onOpen: onOpen8,
    onClose: onClose8,
  } = useDisclosure();
  const {
    isOpen: isOpen9,
    onOpen: onOpen9,
    onClose: onClose9,
  } = useDisclosure();
  const {
    isOpen: isOpen10,
    onOpen: onOpen10,
    onClose: onClose10,
  } = useDisclosure();
  const {
    isOpen: isOpen11,
    onOpen: onOpen11,
    onClose: onClose11,
  } = useDisclosure();
  const {
    isOpen: isOpen12,
    onOpen: onOpen12,
    onClose: onClose12,
  } = useDisclosure();
  const {
    isOpen: isOpen13,
    onOpen: onOpen13,
    onClose: onClose13,
  } = useDisclosure();
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
  const [td, setTd] = useState({});

  const [intervalId, setIntervalId] = useState();
  const [progress, setProgress] = useState();

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
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") === null) {
        router.push("/c/main");
      }
    }
    if (router.isReady) {
      db.collection("startups")
        .doc(router.query.id)
        .onSnapshot((snapshot) => {
          if (typeof snapshot.data() !== "undefined") {
            console.log("Test often Test totototot");
            const data = snapshot.data();
            setRowsAchievements([]);
            setRowsLeaderboards([]);
            setTodos([]);
            setTodos2([]);

            setLvl(String(Math.floor(data.level / 100) + 1));
            setStartupName(String(data.startupName));
            setStartupName2(String(data.startupName));
            setStartupDes(String(data.description));
            setStartupLocation(String(data.startupLocation));
            setAcc(data.accessories);
            setSelectedAcc(data.selectedAccessory);
            setCoins(String(data.coins));
            let n = (lvl - 1) * 100;
            console.log(
              "Progress " +
                (data.level < 100
                  ? String(data.level)
                  : String(data.level - n)) +
                "One is " +
                data.level +
                " two is " +
                n +
                " Level is " +
                lvl
            );
            setProgress(
              Math.floor(data.level / 100) + 1 != 0
                ? data.level < 100
                  ? String(data.level)
                  : String(data.level - [Math.floor(data.level / 100) * 100]) +
                    "/100 level complete"
                : "Progress still processing..."
            );
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + "/" + dd + "/" + yyyy;

            if (data.factoryCoinsDate == "") {
              db.collection("startups")
                .doc(router.query.id)
                .update({
                  coins: increment(parseInt(accessories[selectedAcc][4])),
                });
              //setCoins(coins + accessories[selectedAcc][4]);
              db.collection("startups")
                .doc(router.query.id)
                .update({ factoryCoinsDate: today });
            } else {
              console.log("Command " + (data.factoryCoinsDate != today));
              if (data.factoryCoinsDate != today) {
                const date1 = new Date(String(data.factoryCoinsDate));
                const date2 = new Date(String(today));
                console.log("Dates " + date1 + " date 2 " + date2);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (isNaN(diffDays)) return;
                console.log("Diff days " + String(diffDays));
                db.collection("startups")
                  .doc(router.query.id)
                  .update({ factoryCoinsDate: today });
                db.collection("startups")
                  .doc(router.query.id)
                  .update({
                    coins: increment(
                      parseInt(accessories[selectedAcc][4] * diffDays)
                    ),
                  });
                //setCoins(String(coins + accessories[selectedAcc][4] * diffDays));
              }
            }

            let newItems = [];
            data.tasks.forEach(function (item, index) {
              newItems.push({
                id: router.query.id,
                index: index,
                msg: JSON.parse(item)[0],
                urgency: JSON.parse(item)[1],
                color:
                  JSON.parse(item)[1] == "Urgent"
                    ? "red"
                    : JSON.parse(item)[1] == "Medium"
                    ? "yellow"
                    : "green",
                date: JSON.parse(item)[2],
              });
            });
            setTodos((prevItems) => prevItems.concat(newItems));

            let newItems2 = [];
            data.brainstorm.forEach(function (item, index) {
              newItems2.push({
                id: router.query.id,
                index: index,
                msg: JSON.parse(item)[0],
                probability: JSON.parse(item)[1],
                color:
                  JSON.parse(item)[1] == "High"
                    ? "green"
                    : JSON.parse(item)[1] == "Medium"
                    ? "yellow"
                    : "red",
              });
            });
            setTodos2((prevItems) => prevItems.concat(newItems2));

            let achs = data.completed;
            for (let o = achs.length - 1; o >= achs.length - 4; o--) {
              if (typeof achs[o] === "undefined") {
                break;
              }
              let urr = JSON.parse(achs[o]);
              setRowsAchievements((prevAchs) => [
                ...prevAchs,
                <ListItem>
                  <Flex direction={"row"} alignItems={"center"}>
                    <Text
                      color={"black"}
                      marginRight={"1vw"}
                      fontSize={{ base: "6pt", md: "9pt", lg: "12pt" }}
                    >
                      {urr[0]}
                    </Text>
                    <Image
                      src={"/assets/coin.png"}
                      alt={"Gloppa coin"}
                      width={25}
                      height={25}
                      marginRight={"0.2vw"}
                    />
                    <Text>+5</Text>
                  </Flex>
                </ListItem>,
              ]);
            }
          } else {
            router.push("/app/startuplist");
            toast({
              title: "ID does not exist",
              description: "The id either got removed or it does not exist.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
          let query = db.collection("startups").orderBy("level", "desc");
          query
            .get()
            .then(function (querySnapshot) {
              // Loop through the query results
              const tempRowsLeaderboards = [];
              querySnapshot.docs.map(function (doc, index) {
                // Get the value of the "name" field for each document
                let ido = doc.id;
                var stName = doc.data().startupName;
                var stLvl = String(Math.floor(doc.data().level / 100) + 1);
                let img = accessories[doc.data().selectedAccessory][1];
                //console.log(startupName);
                //console.log(stLvl);
                tempRowsLeaderboards.push(
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"90%"}
                    backgroundColor={
                      router.query.id == ido ? "#1F90FF" : "#fff"
                    }
                    paddingTop={3}
                    paddingBottom={3}
                    paddingLeft={5}
                    paddingRight={5}
                    borderRadius={0}
                    boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    <Box position="relative" display="flex">
                      <Box
                        as="img"
                        width={50}
                        src={"/assets/coina.png"}
                        alt="My Image"
                      />
                      <Box
                        position="absolute"
                        top="50%"
                        right={"38.5%"}
                        transform="translateY(-50%)"
                        textAlign="center"
                      >
                        <Text
                          fontFamily={"monospace"}
                          color={router.query.id == ido ? "#fff" : "#000"}
                          fontWeight={500}
                          fontSize={"15pt"}
                        >
                          <Tooltip
                            label={"Position " + index + " on leaderboard"}
                          >
                            {String(index + 1)}
                          </Tooltip>
                        </Text>
                      </Box>
                    </Box>

                    <Text
                      color={router.query.id == ido ? "#fff" : "#000"}
                      fontWeight={700}
                    >
                      {stName}
                    </Text>
                    <Flex>
                      <Image
                        src={img}
                        width={30}
                        height={30}
                        alt={"Gloppa Image"}
                      />
                      <Text color={router.query.id == ido ? "#fff" : "#000"}>
                        {stLvl}
                      </Text>
                    </Flex>
                  </Flex>
                );
                // setRowsLeaderboards((prevLeaderboards) => [
                //   ...prevLeaderboards,
                //   Leaderboards(
                //     img,
                //     stLvl,
                //     stName,
                //     String(prevLeaderboards.length + 1),
                //     router.query.id == ido
                //   ),
                // ]);
              });
              setRowsLeaderboards(tempRowsLeaderboards);
            })
            .catch(function (error) {
              // Handle any errors that occurred during the query
              console.error(error);
            });
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
    onClose();
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
    setUrgency2("High");
    toast2({
      title: "Brainstorm Created",
      description: "Brainstorm was successfully created.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    onClose2();
  };

  const changeVal = (e) => {
    e.preventDefault();
    db.collection("startups").doc(router.query.id).update({
      startupName: startupName2,
      startupLocation: startupLocation,
      description: startupDes,
    });
    const o = startupName2;
    setStartupName(o);
    onClose4();
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
        //setCoins(parseInt(coins) + 5);
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
        //setCoins(parseInt(coins) - accessories[ind][3]);
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
      } else {
        toast3({
          title: "Not enough coins",
          description: "You need to work more on the company to afford this.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const deleteIt = (todo) => {
    db.collection("startups")
      .doc(todo.id)
      .update({
        tasks: arrayRemove(JSON.stringify([todo.msg, todo.urgency, todo.date])),
      });
  };

  const finished = (todo) => {
    db.collection("startups")
      .doc(todo.id)
      .update({
        completed: arrayUnion(
          JSON.stringify([todo.msg, todo.urgency, todo.date])
        ),
      });
    db.collection("startups")
      .doc(todo.id)
      .update({
        level: increment(5),
      });
    db.collection("startups")
      .doc(todo.id)
      .update({
        coins: increment(5),
      });
    db.collection("startups")
      .doc(todo.id)
      .update({
        tasks: arrayRemove(JSON.stringify([todo.msg, todo.urgency, todo.date])),
      });
  };

  const deleteIt2 = (todo) => {
    db.collection("startups")
      .doc(todo.id)
      .update({
        brainstorm: arrayRemove(JSON.stringify([todo.msg, todo.probability])),
      });
  };

  const finished2 = (todo) => {
    db.collection("startups")
      .doc(todo.id)
      .update({
        completed: arrayUnion(JSON.stringify([todo.msg, todo.probability])),
      });
    db.collection("startups")
      .doc(todo.id)
      .update({
        level: increment(5),
      });
    db.collection("startups")
      .doc(todo.id)
      .update({
        coins: increment(5),
      });
    db.collection("startups")
      .doc(todo.id)
      .update({
        brainstorm: arrayRemove(JSON.stringify([todo.msg, todo.probability])),
      });
  };

  const editTasks = (e) => {
    e.preventDefault();
    const arrora = [editData[0], editData[1], editData[2]];
    //console.log("Index " + editData[3]);
    db.collection("startups")
      .doc(router.query.id)
      .get()
      .then((val) => {
        if (!val.exists) return;
        let opa = val.get("tasks");
        opa[editData[3]] = JSON.stringify(arrora);
        db.collection("startups").doc(router.query.id).update({ tasks: opa });
      });
    onClose12();
  };

  const editBrainstorms = (e) => {
    e.preventDefault();
    const arrora = [editData2[0], editData2[1]];
    //console.log("Index " + editData2[2]);
    db.collection("startups")
      .doc(router.query.id)
      .get()
      .then((val) => {
        if (!val.exists) return;
        let opa = val.get("brainstorm");
        opa[editData2[2]] = JSON.stringify(arrora);
        db.collection("startups")
          .doc(router.query.id)
          .update({ brainstorm: opa });
      });
    onClose13();
  };

  // const onDragEnd = (result) => {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }

  //   //console.log("result data " + JSON.stringify(result));

  //   const reorderedList = reorder(
  //     todos,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   //console.log("Reordered list " + JSON.stringify(reorderedList));

  //   let it = [];
  //   for (let i = 0; i < reorderedList.length; i++) {
  //     let mos = reorderedList[i].msg;
  //     let dot = reorderedList[i].urgency;
  //     let det = reorderedList[i].date;
  //     it.push(JSON.stringify([mos, dot, det]));
  //   }
  //console.log(it);
  //   db.collection("startups").doc(router.query.id).update({ tasks: it });

  //   setTodos(reorderedList);
  // };

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
      height={!isMobile ? "100vh" : "100%"}
      backgroundColor={"#dfdfdf"}
    >
      <Modal isOpen={isOpen13} onClose={onClose13}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>Edit Brainstorm Task</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody>
            <form onSubmit={(e) => editBrainstorms(e)}>
              <Flex
                direction={"column"}
                gap={"3vh"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingBottom={"1vh"}
              >
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"black"}>Message</Text>
                  <Input
                    color={"black"}
                    value={editData2[0]}
                    placeHolder={"This should be simple..."}
                    width={"20vw"}
                    onChange={(e) => {
                      let tosks = [...editData2];
                      tosks[0] = e.target.value;
                      setEditData2(tosks);
                    }}
                    minLength={3}
                    maxLength={45}
                    required
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text color={"black"}>Probability</Text>
                  <Select
                    required
                    onChange={(e) => {
                      let tosks = [...editData2];
                      tosks[1] = e.target.value;
                      setEditData2(tosks);
                    }}
                    value={editData2[1]}
                    color={"black"}
                    backgroundColor={"#fff"}
                  >
                    <option value={"High"} name={"High"}>
                      High
                    </option>
                    <option value={"Medium"} name={"Medium"}>
                      Medium
                    </option>
                    <option value={"Low"} name={"Low"}>
                      Low
                    </option>
                  </Select>
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"1vw"}
                >
                  <Button onClick={onClose13} colorScheme="transparent" mr={3}>
                    Close
                  </Button>
                  <Button type={"submit"} colorScheme="blue" mr={3}>
                    Change Edits
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen12} onClose={onClose12}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>Edit To Do List Task</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody>
            <form onSubmit={(e) => editTasks(e)}>
              <Flex
                direction={"column"}
                gap={"3vh"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingBottom={"1vh"}
              >
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"black"}>Message</Text>
                  <Input
                    color={"black"}
                    value={editData[0]}
                    placeHolder={"This should be simple..."}
                    width={"20vw"}
                    onChange={(e) => {
                      let tosks = [...editData];
                      tosks[0] = e.target.value;
                      setEditData(tosks);
                    }}
                    minLength={3}
                    maxLength={45}
                    required
                  />
                </Flex>
                <Flex width={"20vw"} gap={"0.5vh"} direction={"column"}>
                  <Text color={"black"}>Urgency</Text>
                  <Select
                    required
                    onChange={(e) => {
                      let tosks = [...editData];
                      tosks[1] = e.target.value;
                      setEditData(tosks);
                    }}
                    value={editData[1]}
                    color={"black"}
                    backgroundColor={"#fff"}
                  >
                    <option value={"Urgent"} name={"Urgent"}>
                      Urgent
                    </option>
                    <option value={"Medium"} name={"Medium"}>
                      Medium
                    </option>
                    <option value={"No Urgency"} name={"No Urgency"}>
                      No Urgency
                    </option>
                  </Select>
                </Flex>
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"black"}>Due Date</Text>
                  <Input
                    value={editData[2]}
                    type="date"
                    min={maxDate}
                    required
                    onChange={(e) => {
                      let tosks = [...editData];
                      tosks[2] = e.target.value;
                      setEditData(tosks);
                    }}
                    width={"20vw"}
                    color={"black"}
                  />
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"1vw"}
                >
                  <Button onClick={onClose12} colorScheme="transparent" mr={3}>
                    Close
                  </Button>
                  <Button type={"submit"} colorScheme="blue" mr={3}>
                    Change Edits
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog isOpen={isOpen11} onClose={onClose11}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Done with Brainstorm
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you are done with this brainstorm "{td.msg}?"
              <br /> You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose11}>Cancel</Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  finished2(td);
                  onClose11();
                }}
                ml={3}
              >
                Done
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog isOpen={isOpen10} onClose={onClose10}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Done with Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you are done with this task "{td.msg}?"
              <br /> You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose10}>Cancel</Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  finished(td);
                  onClose10();
                }}
                ml={3}
              >
                Done
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog isOpen={isOpen9} onClose={onClose9}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Brainstorm
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{td.msg}?"
              <br /> You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose9}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteIt2(td);
                  onClose9();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog isOpen={isOpen8} onClose={onClose8}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{td.msg}?"
              <br /> You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose8}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteIt(td);
                  onClose8();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog isOpen={isOpen7} onClose={onClose7}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Stop timer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose7}>Cancel</Button>
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
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>To Do List</ModalHeader>
          <ModalCloseButton color={"black"} />
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
                  <Text color={"black"}>Message</Text>
                  <Input
                    color={"black"}
                    value={startupText}
                    placeHolder={"This should be simple..."}
                    width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                    onChange={(e) => setStartupText(e.target.value)}
                    minLength={3}
                    maxLength={45}
                    required
                  />
                </Flex>
                <Flex
                  width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                  gap={"0.5vh"}
                  direction={"column"}
                >
                  <Text color={"black"}>Urgency</Text>
                  <Select
                    required
                    onChange={(val) => setUrgency(val.target.value)}
                    value={urgency}
                    color={"black"}
                    backgroundColor={"#fff"}
                  >
                    <option value={"Urgent"} name={"Urgent"}>
                      Urgent
                    </option>
                    <option value={"Medium"} name={"Medium"}>
                      Medium
                    </option>
                    <option value={"No Urgency"} name={"No Urgency"}>
                      No Urgency
                    </option>
                  </Select>
                </Flex>
                <Flex gap={"0.5vh"} direction={"column"}>
                  <Text color={"black"}>Due Date</Text>
                  <Input
                    value={date}
                    type="date"
                    min={maxDate}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                    color={"black"}
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
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>Brainstorm List</ModalHeader>
          <ModalCloseButton color={"black"} />
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
                  <Text color={"black"}>Message</Text>
                  <Input
                    value={startupText2}
                    placeHolder={"This should be simple..."}
                    width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                    color="black"
                    minLength={3}
                    maxLength={45}
                    onChange={(e) => setStartupText2(e.target.value)}
                    required
                  />
                </Flex>
                <Flex
                  width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                  gap={"0.5vh"}
                  direction={"column"}
                >
                  <Text color={"black"}>Probability of Reality</Text>
                  <Select
                    color={"black"}
                    backgroundColor={"#fff"}
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
        <ModalContent backgroundColor={"#f2f2f2"}>
          <ModalHeader color={"black"}>Leaderboards</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody maxHeight={"70vh"} overflowY={"scroll"}>
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
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>Company Info</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody>
            <form onSubmit={(e) => changeVal(e)}>
              <Flex
                direction={"column"}
                gap={"3vh"}
                alignItems={"center"}
                justifyContent={"center"}
                paddingBottom={"1vh"}
                height={{ base: "80vh", md: "65vh", lg: "50vh" }}
                overflowY={"scroll"}
              >
                <Flex
                  width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                  gap={"0.5vh"}
                  direction={"column"}
                  paddingTop={{ base: 6, md: 3, lg: 0 }}
                >
                  <Text color={"black"}>Company Name</Text>
                  <Input
                    minLength={3}
                    value={startupName2}
                    width={"100%"}
                    color={"black"}
                    required
                    onChange={(e) => setStartupName2(e.target.value)}
                  />
                </Flex>
                <Flex
                  width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                  gap={"0.5vh"}
                  direction={"column"}
                >
                  <Text color={"black"}>Company Location</Text>
                  <Input
                    type="text"
                    color={"black"}
                    required
                    value={startupLocation}
                    width={"100%"}
                    minLength={3}
                    onChange={(e) => setStartupLocation(e.target.value)}
                  />
                </Flex>
                <Flex
                  width={{ base: "40vw", md: "30vw", lg: "20vw" }}
                  gap={"0.5vh"}
                  direction={"column"}
                >
                  <Text color={"black"}>Company Description</Text>
                  <Textarea
                    autoComplete="on"
                    minLength={3}
                    value={startupDes}
                    color={"black"}
                    required
                    width={"100%"}
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
                    color={"black"}
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
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>Work Alarm</ModalHeader>
          <ModalBody>
            <Flex
              direction="column"
              align="center"
              justify="center"
              marginTop={5}
              marginBottom={5}
              backgroundColor={"#f2f2f2"}
              padding={5}
              borderRadius={10}
            >
              <Heading>Work Time</Heading>
              <Select
                onChange={(e) => setTime(e.target.value * 60)}
                marginTop={2}
                disabled={isRunning}
                backgroundColor={"#fff"}
                //borderColor={"#ababab"}
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
        <ModalContent backgroundColor={"#f2f2f2"}>
          <ModalCloseButton color={"black"} />
          <ModalHeader color={"black"}>Shop</ModalHeader>
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
                  borderRadius={0}
                  gap={5}
                  backgroundColor={"#fff"}
                  boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
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
                  borderRadius={0}
                  gap={5}
                  backgroundColor={"#fff"}
                  boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
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
                  borderRadius={0}
                  gap={5}
                  backgroundColor={"#fff"}
                  boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
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
                  borderRadius={0}
                  gap={5}
                  backgroundColor={"#fff"}
                  boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
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
                  borderRadius={0}
                  gap={5}
                  backgroundColor={"#fff"}
                  boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
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
        backgroundColor={"#fff"}
        boxShadow={"0px 5px 5px 1px rgba(0, 0, 0, 0.5)"}
        padding={5}
      >
        <Flex alignItems={"center"} justifyContent={"center"}>
          <NextLink href={"/app/productivitymanagement"}>
            <Link color={"black"} fontSize={"20pt"}>
              Gloppa
            </Link>
          </NextLink>
          <Tooltip label={"Intense working alarm"} aria-label="A tooltip">
            <Button
              onClick={onOpen5}
              colorScheme={"transparent"}
              variant={"ghost"}
            >
              <img
                style={{ filter: "brightness(0)" }}
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
                right={"39%"}
                transform="translateY(-50%)"
                textAlign="center"
              >
                <Text
                  fontWeight={900}
                  fontSize={{ base: "11pt", md: "13pt", lg: "15pt" }}
                >
                  <Tooltip label={progress} aria-label="A tooltip">
                    {lvl}
                  </Tooltip>
                </Text>
              </Box>
            </Box>
          </Flex>
          <Link
            colorScheme={"transparent"}
            color={"black"}
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
                <img
                  style={{ filter: "brightness(0)" }}
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
                <Text color={"black"}>{coins}</Text>
              </Flex>
            </Tooltip>
            <Tooltip label={"Shop"} aria-label="A tooltip">
              <Button onClick={onOpen6} variant={"ghost"} colorScheme={"none"}>
                <img
                  style={{ filter: "brightness(0)" }}
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
        paddingBottom={"2vh"}
        //borderBottom={"1px solid white"}
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
            color={"black"}
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
            color={"black"}
            fontSize={{ base: "15pt", md: "20pt", lg: "25pt" }}
            marginBottom={"2vh"}
          >
            {quota}
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
            fontWeight={900}
          >
            Achievements:
          </Text>
          <UnorderedList listStyleType={"none"} color={"black"}>
            {rowsAchievements.length < 1 ? (
              <ListItem>
                <Flex direction={"row"} alignItems={"center"}>
                  <Text color={"black"} marginRight={"1vw"}>
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
          backgroundColor={"#fff"}
          boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Flex direction={"row"} alignItems={"center"}>
            <Text
              fontWeight={400}
              color={"black"}
              fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
            >
              To-Do List
            </Text>
            <Tooltip label={"Add to task list"} aria-label="A tooltip">
              <Button colorScheme="transparent" onClick={onOpen}>
                <img
                  style={{ filter: "brightness(0)" }}
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
            {Object.keys(todos).length > 0 ? (
              // <DragDropContext onDragEnd={onDragEnd}>
              //   <Droppable droppableId="droppable">
              //     {(provided) => (
              <UnorderedList
                display={"flex"}
                width={"100%"}
                gap={"1vh"}
                alignItems={"center"}
                flexDirection={"column"}
                paddingBottom={3}
                paddingTop={3}
                // {...provided.droppableProps}
                // ref={provided.innerRef}
              >
                {todos.map((todo, index) => (
                  // <Draggable
                  //   key={todo.id}
                  //   draggableId={todo.id}
                  //   index={index}
                  // >
                  //   {(provided) => (
                  <ListItem
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    backgroundColor={"#f2f2f2"}
                    width={"90%"}
                    marginRight={"2.5%"}
                    paddingTop={0.5}
                    paddingBottom={0.5}
                    paddingLeft={2}
                    borderRadius={2}
                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    boxShadow={"0 1px 5px rgba(0, 0, 0, 0.5)"}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    <Flex
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      marginRight={2}
                    >
                      <Menu>
                        <MenuButton
                          paddingLeft={5}
                          paddingRight={5}
                          variant={"ghost"}
                          colorScheme={"transparent"}
                        >
                          <img
                            style={{ filter: "brightness(0)" }}
                            src={"/assets/Braille.png"}
                            alt={"options"}
                            width={28}
                            height={28}
                          />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              setEditData([
                                todo.msg,
                                todo.urgency,
                                todo.date,
                                todo.index,
                              ]);
                              onOpen12();
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setTd(todo);
                              onOpen8();
                            }}
                          >
                            Remove
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Text
                        color={"black"}
                        fontWeight={500}
                        fontSize={{
                          base: "10pt",
                          md: "14pt",
                          lg: "18pt",
                        }}
                        maxWidth={"22vw"}
                      >
                        {todo.msg}
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"} justifyContent={"center"}>
                      <Flex
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text
                          color={
                            todo.urgency == ""
                              ? "red"
                              : todo.color == "green"
                              ? "lightgreen"
                              : todo.color
                          }
                          fontSize={{
                            base: "12pt",
                            md: "16pt",
                            lg: "20pt",
                          }}
                          fontWeight={700}
                        >
                          {todo.urgency == "" ? "Urgent" : todo.urgency}
                        </Text>
                        <Text
                          color={
                            todo.urgency == ""
                              ? "red"
                              : todo.color == "green"
                              ? "lightgreen"
                              : todo.color
                          }
                          fontSize={{
                            base: "5pt",
                            md: "8pt",
                            lg: "11pt",
                          }}
                        >
                          {todo.date}
                        </Text>
                      </Flex>
                      <Flex zIndex={10}>
                        <Button
                          marginRight={"1vw"}
                          colorScheme={"transparent"}
                          onClick={() => {
                            setTd(todo);
                            onOpen10();
                          }}
                        >
                          <Checkbox
                            size={{
                              base: "sm",
                              md: "md",
                              lg: "lg",
                            }}
                            colorScheme={
                              todo.urgency == "" ? "red" : todo.color
                            }
                            defaultChecked
                            isReadOnly
                            zIndex={-1}
                          />
                        </Button>
                      </Flex>
                    </Flex>
                  </ListItem>
                  //   )}
                  // </Draggable>
                ))}
                {/* {provided.placeholder} */}
              </UnorderedList>
            ) : (
              // )}
              //   </Droppable>
              // </DragDropContext>
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"90%"}
                height={"90%"}
              >
                {!isMobile ? (
                  <Image
                    src={"/assets/nodata.png"}
                    alt={"No data"}
                    width={170}
                    height={170}
                  />
                ) : null}
                <Text color={"black"} textAlign={"center"} fontSize={"12pt"}>
                  No brainstorms <br />
                  found here... 😔
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"48vw"}
          backgroundColor={"#fff"}
          boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text
              fontWeight={400}
              color={"black"}
              fontSize={{ base: "20pt", md: "24pt", lg: "28pt" }}
            >
              Brainstorming
            </Text>
            <Tooltip label={"Add to brainstorm list"} aria-label="A tooltip">
              <Button colorScheme="transparent" onClick={onOpen2}>
                <img
                  style={{ filter: "brightness(0)" }}
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
            {Object.keys(todos2).length > 0 ? (
              <UnorderedList
                listStyleType={"none"}
                width={"100%"}
                gap={"1vh"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                marginLeft={"10%"}
                paddingTop={3}
                paddingBottom={3}
              >
                {todos2.map((todo) => (
                  <ListItem width={"100%"}>
                    <Flex
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      backgroundColor={"#f2f2f2"}
                      width={"90%"}
                      paddingTop={2}
                      paddingBottom={2}
                      paddingLeft={2}
                      borderRadius={2}
                      gap={5}
                      boxShadow={"0 1px 5px rgba(0, 0, 0, 0.5)"}
                      _hover={{
                        opacity: 0.8,
                      }}
                    >
                      <Flex>
                        <Menu>
                          <MenuButton
                            paddingLeft={5}
                            paddingRight={5}
                            variant={"ghost"}
                            colorScheme={"transparent"}
                          >
                            <img
                              style={{ filter: "brightness(0)" }}
                              src={"/assets/Braille.png"}
                              alt={"options"}
                              width={28}
                              height={28}
                            />
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                setEditData2([
                                  todo.msg,
                                  todo.probability,
                                  todo.index,
                                ]);
                                onOpen13();
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setTd(todo);
                                onOpen9();
                              }}
                            >
                              Remove
                            </MenuItem>
                          </MenuList>
                        </Menu>
                        <Text
                          color={"black"}
                          fontWeight={500}
                          fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
                          maxWidth={"22vw"}
                        >
                          {todo.msg}
                        </Text>
                      </Flex>
                      <Flex
                        gap={"1vw"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text
                          color={
                            todo.color == "green" ? "lightgreen" : todo.color
                          }
                          fontSize={{ base: "8pt", md: "11.5pt", lg: "15pt" }}
                          fontWeight={700}
                        >
                          {todo.probability == "" ? "High" : todo.probability}
                        </Text>
                        <Flex zIndex={10}>
                          <Button
                            onClick={() => {
                              setTd(todo);
                              onOpen11();
                            }}
                            marginRight={"1vw"}
                            colorScheme={"transparent"}
                          >
                            <Checkbox
                              size={{ base: "sm", md: "md", lg: "lg" }}
                              colorScheme={
                                todo.color == "" ? "green" : todo.color
                              }
                              defaultChecked={true}
                              isReadOnly={true}
                              zIndex={-1}
                            />
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"90%"}
                height={"90%"}
              >
                {!isMobile ? (
                  <Image
                    src={"/assets/nodata.png"}
                    alt={"No data"}
                    width={170}
                    height={170}
                  />
                ) : null}
                <Text color={"black"} textAlign={"center"} fontSize={"12pt"}>
                  No brainstorms <br />
                  found here... 😔
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

export default Game;
