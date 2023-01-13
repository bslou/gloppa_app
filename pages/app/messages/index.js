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
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import NavBar from "../navbar";
import { arrayUnion, serverTimestamp } from "firebase/firestore";

const Messages = () => {
  const router = useRouter();

  const [inp, setInp] = useState("");
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [myuname, setmyUname] = useState("");
  const [messagePost, setMessagePost] = useState([]);
  const [comments, setComments] = useState([]);
  const [id, setId] = useState("");
  const buttonRef = useRef(null);
  const [name, setName] = useState("");
  const [namee, setNamee] = useState("");
  const toast = useToast();
  const flexRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);

  const [uname, setUname] = useState("");
  const [oguname, setOgUname] = useState("");
  const [email, setEmail] = useState("");
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
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
          onClose2();
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
          onClose2();
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  const scrollToBottom = () => {
    if (flexRef.current !== null)
      if (flexRef.current.lastChild !== null)
        flexRef.current.lastChild.scrollIntoView({ behavior: "smooth" });
  };

  const changeId = (ide) => {
    // if (id == "") {
    db.collection("messages")
      .doc(ide)
      .onSnapshot((val) => {
        if (val.data() !== undefined) {
          console.log("Length " + val.data().usernames.length);
          let name = "";
          val.data().usernames.map((val2, index) => {
            if (
              (index == val.data().usernames.length - 2 &&
                val.data().usernames[index + 1] == myuname) ||
              (index >= val.data().usernames.length - 1 && val2 != myuname)
            ) {
              name += val2;
            } else if (
              index < val.data().usernames.length - 1 &&
              val2 != myuname
            ) {
              name += val2 + ", ";
            }
          });
          setName(name);
        }
      });

    setId(ide);
    scrollToBottom();
    // }
    // else {
    //   setComments([]);
    //   setName("");
    //   setId("");
    // }
  };

  const handleComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inp.length > 0) {
        setComments([]);
        var m = new Date();
        var dateString =
          m.getUTCFullYear() +
          "/" +
          ("0" + (m.getUTCMonth() + 1)).slice(-2) +
          "/" +
          ("0" + m.getUTCDate()).slice(-2) +
          " " +
          ("0" + m.getUTCHours()).slice(-2) +
          ":" +
          ("0" + m.getUTCMinutes()).slice(-2) +
          ":" +
          ("0" + m.getUTCSeconds()).slice(-2);
        db.collection("messages")
          .doc(id)
          .update({ timestamp: serverTimestamp() });
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            db.collection("messages")
              .doc(id)
              .get()
              .then((valo) => {
                console.log("Valo = " + valo.get("messages").length);
                console.log(
                  valo.get("messages").length == 0
                    ? "null"
                    : String(valo.get("messages")[0].id)
                );
                db.collection("messages")
                  .doc(id)
                  .update({
                    messages: arrayUnion({
                      msg: inp,
                      uname: val.get("username"),
                      id: localStorage.getItem("id"),
                      prevId:
                        valo.get("messages").length == 0
                          ? "null"
                          : String(
                              valo.get("messages")[
                                valo.get("messages").length - 1
                              ].id
                            ),
                      date: dateString,
                    }),
                  });
              });
          });
        setInp("");
        setComments([]);
        //scrollToBottom();
      } else {
        toast({
          title: "Message box is empty...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter") {
      event.preventDefault();
      if (users.includes(value) && !tags.includes(value)) {
        setTags([...tags, value]);
        event.target.value = "";
      } else {
        toast({
          title: "User does not exist, or already in messages",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const handleClose = (index) => {
    const newTags = [...tags];
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        if (tags[index] == val.get("username")) {
          toast({
            title: "Can't remove your username...",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          newTags.splice(index, 1);
          setTags(newTags);
        }
      });
  };

  const deleteIt = (id) => {
    console.log("ID " + id);
    if (window.confirm("Are you sure you want to remove this conversation?")) {
      db.collection("messages")
        .doc(id)
        .onSnapshot((val) => {
          setId("");
          val.data().users.forEach((va) => {
            db.collection("users")
              .doc(va)
              .update({ messagesId: arrayRemove(id) });
          });
          db.collection("messages").doc(id).delete();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
    }
  };

  const createMessages = (e) => {
    e.preventDefault();
    console.log(tags);
    if (tags.length > 1) {
      db.collection("messages")
        .add({
          users: [],
          usernames: [],
          messages: [],
          timestamp: serverTimestamp(),
        })
        .then((docRef) => {
          let id = docRef.id;
          tags.forEach((tag) => {
            console.log("Tag " + tag);
            db.collection("messages")
              .doc(id)
              .update({ usernames: arrayUnion(tag) });
            const query = db.collection("users").where("username", "==", tag);
            query.get().then((querySnapshot) => {
              console.log("One ");
              querySnapshot.forEach((doc) => {
                console.log("Two ");
                const docId = doc.id;
                console.log("Doc id " + docId);
                db.collection("messages")
                  .doc(id)
                  .update({ users: arrayUnion(docId) });
                db.collection("users")
                  .doc(docId)
                  .update({ messagesId: arrayUnion(id) });
              });
            });
          });
        })
        .catch((err) => {
          console.log("ERror =" + err);
        });
      setTags([]);
      onClose();
    } else {
      toast({
        title: "No people selected...",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem == null) {
      router.push("/");
      return;
    }
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .onSnapshot((val) => {
        let n = val.data();
        setUname(n.username);
        setOgUname(n.username);
        setEmail(n.email);
      });
    db.collection("users")
      .get()
      .then((val) => {
        val.forEach((valo) => {
          let data = valo.data();
          if (valo.id == localStorage.getItem("id")) {
            setmyUname(data.username);
          }
          setUsers((prevUsers) => [...prevUsers, data.username]);
          if (valo.id == localStorage.getItem("id")) {
            setTags([data.username]);
          }
        });
        console.log("Users " + users);
      });
    // db.collection("users")
    //   .doc(localStorage.getItem("id"))
    //   .onSnapshot((val) => {
    //     let data = val.data();
    //     if (data.messagesId !== undefined) {
    //       setMessagePost([]);
    //       data.messagesId.forEach((ido, index) => {
    db.collection("messages")
      .where("users", "array-contains", localStorage.getItem("id"))
      // .orderBy("timestamp", "desc")
      .onSnapshot((val2) => {
        setMessagePost([]);
        val2.forEach((doc) => {
          let dat = doc.data();
          console.log("Complete " + Object.keys(dat));
          setMessagePost((prevMessagePost) => [
            ...prevMessagePost,
            <Button
              ref={buttonRef}
              onClick={() => {
                changeId(doc.id);
              }}
              colorScheme={"transparent"}
              width={"90%"}
              height={75}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              backgroundColor={"#efefef"}
              padding={1.5}
              paddingTop={3}
              paddingBottom={3}
              borderRadius={0}
              _hover={{
                opacity: 0.8,
              }}
            >
              {/* <Image
                        src={"/assets/profile.png"}
                        alt={"profile"}
                        width={50}
                        height={50}
                    /> */}
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
                width={"60%"}
                marginLeft={3}
                gap={1}
              >
                <Text
                  color={"black"}
                  fontSize={"11pt"}
                  fontWeight={900}
                  whiteSpace={"nowrap"}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {dat.usernames.map((user, index) => {
                    console.log("Indo " + index);
                    console.log("Inds " + dat.usernames.length);
                    if (
                      (index == dat.usernames.length - 2 &&
                        dat.usernames[index + 1] == myuname) ||
                      (index >= dat.usernames.length - 1 && user != myuname)
                    ) {
                      return user;
                    } else if (
                      index < dat.usernames.length - 1 &&
                      user != myuname
                    ) {
                      return user + ", ";
                    }
                  })}
                </Text>
                <Text
                  color={"black"}
                  fontSize={"8pt"}
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  as={"i"}
                  fontWeight={400}
                >
                  {dat.messages.length == 0
                    ? "No messages yet..."
                    : dat.messages[dat.messages.length - 1].msg}
                </Text>
              </Flex>
              <Button
                onClick={() => deleteIt(doc.id)}
                colorScheme={"transparent"}
                minWidth={"30%"}
                minHeight={"30%"}
              >
                <Image
                  src={"/assets/trash.png"}
                  alt={"trash"}
                  width={25}
                  height={25}
                />
              </Button>
            </Button>,
          ]);
        });
      });
    //     });
    //   }
    // });
    if (id != "") {
      db.collection("messages")
        .doc(id)
        .onSnapshot((val) => {
          let msgs = val.data().messages;
          setComments([]);
          msgs.forEach((val2, index) => {
            setComments((prevC) => [
              ...prevC,
              <Flex
                direction={"column"}
                alignItems={
                  val2.id == localStorage.getItem("id")
                    ? "flex-end"
                    : "flex-start"
                }
                width={"100%"}
                marginRight={val2.id == localStorage.getItem("id") ? 5 : 0}
                gap={1}
              >
                {val2.id == val2.prevId ? null : (
                  <Text
                    color={"#202020"}
                    fontSize={"11pt"}
                    marginLeft={1}
                    marginRight={1}
                  >
                    {" "}
                    @{val2.uname}
                  </Text>
                )}
                <Flex
                  backgroundColor={
                    val2.id == localStorage.getItem("id")
                      ? "#41A3E7"
                      : "#848484"
                  }
                  maxWidth={"50%"}
                  borderRadius={20}
                  padding={3}
                  marginBottom={1}
                  flexWrap={"wrap"}
                >
                  <Text color={"white"}>{val2.msg}</Text>
                </Flex>
              </Flex>,
            ]);
          });
        });
    }
  }, [db, id, myuname]);

  //   if (loading) {
  //     return <MyLoadingScreen />;
  //   }

  //   if (!loading) {
  return (
    <Flex
      direction={"column"}
      backgroundColor={"#f2f2f2"}
      width={"100vw"}
      height={"100vh"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Messages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => createMessages(e)}>
              <Flex direction={"column"} alignItems={"center"} width={"100%"}>
                {/* <Flex direction={"column"} width={"90%"}>
                  <Text>Name (Optional)</Text>
                  <Input
                    type={"text"}
                    value={namee}
                    onChange={(e) => {
                      setNamee(e.target.value);
                    }}
                  />
                </Flex> */}
                <Flex direction={"column"} width={"90%"}>
                  <Text>People(s) Usernames (ex: bslou10)</Text>
                  <Input type={"text"} onKeyDown={handleChange} />
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={3}
                  width={"100%"}
                  marginTop={3}
                >
                  {tags.map((tag, index) => (
                    <Tag
                      alignItems={"center"}
                      justifyContent={"center"}
                      size={"lg"}
                      borderRadius="full"
                      variant="solid"
                      colorScheme={"green"}
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton
                        onClick={(e) => {
                          handleClose(index);
                        }}
                      />
                    </Tag>
                  ))}
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"100%"}
                  marginTop={5}
                >
                  <Button colorScheme={"blue"} type="submit">
                    Submit
                  </Button>
                  <Button variant={"ghost"} onClick={onClose}>
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
                    onClick={onClose2}
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
          💬&nbsp;&nbsp;Private Messages
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
          onClick={onOpen}
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
            //background={"transparent"}
            background={"#efefef"}
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
            onClick={onOpen2}
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
        <Flex
          direction={"column"}
          alignItems={"center"}
          height={"80vh"}
          width={"65vw"}
          backgroundColor={"transparent"}
          //paddingTop={10}
        >
          <Flex
            direction={"row"}
            height={"100%"}
            width={"100%"}
            backgroundColor={"#fff"}
            boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
          >
            <Flex
              direction={"column"}
              alignItems={"center"}
              width={"40%"}
              height={"100%"}
              gap={2}
              overflowY={"scroll"}
              border={"0.3px solid #dfdfdf"}
              paddingTop={3}
            >
              {/* Under messages */}
              {messagePost.length > 0 ? (
                messagePost
              ) : (
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"100%"}
                >
                    <Image src = {"/assets/nodata2.png"} alt = {"No data Gloppa"} width = {500} height = {500} layout = {'responsive'} />
                  <Text color={"black"} textAlign={"center"} fontSize={"15pt"}>
                    No peoples messages here...
                  </Text>
                  <Button onClick={onOpen}>Create message</Button>
                </Flex>
              )}
            </Flex>
            {console.log(id)}
            {id == "" ? null : (
              <>
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  width={"100%"}
                  border={"0.3px solid #dfdfdf"}
                >
                  <Text
                    color={"black"}
                    paddingTop={"1vh"}
                    paddingBottom={"1vh"}
                    fontSize={"24pt"}
                    fontWeight={900}
                  >
                    {name}
                  </Text>
                  <Flex
                    overflowY={"scroll"}
                    overflowX={"hidden"}
                    direction={"column"}
                    width={"100%"}
                    height={"100%"}
                    paddingBottom={100}
                    paddingLeft={15}
                    paddingRight={18}
                    ref={flexRef}
                  >
                    {comments}
                  </Flex>
                </Flex>
                <Input
                  position={"fixed"}
                  bottom={0}
                  color={"black"}
                  placeholder={"Message here..."}
                  width={"45vw"}
                  left={"36.85vw"}
                  marginBottom={"1.5vh"}
                  value={inp}
                  onChange={(e) => setInp(e.target.value)}
                  onKeyDown={handleComment}
                  backgroundColor={"#fff"}
                  boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
                />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
// };

export default Messages;
