import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { db } from "../../api/firebaseconfig";
import NavBar from "../navbar";

const Messages = () => {
  const router = useRouter();
  const [inp, setInp] = useState("");
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [messagePost, setMessagePost] = useState([]);
  const [comments, setComments] = useState([]);
  const [id, setId] = useState("");
  const buttonRef = useRef(null);
  const [name, setName] = useState("");
  const [namee, setNamee] = useState("");
  const toast = useToast();
  const flexRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            if (index < val.data().usernames.length - 1) {
              name += val2 + ", ";
            } else {
              name += val2;
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
          .update({
            messages: arrayUnion({
              msg: inp,
              id: localStorage.getItem("id"),
              date: dateString,
            }),
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
    db.collection("users")
      .get()
      .then((val) => {
        val.forEach((valo) => {
          let data = valo.data();
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
              backgroundColor={"#2c2c2c"}
              padding={1.5}
              paddingTop={3}
              paddingBottom={3}
              borderRadius={5}
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
                width={"90%"}
                marginLeft={3}
              >
                <Text
                  color={"white"}
                  fontSize={"9pt"}
                  fontWeight={700}
                  width={"70%"}
                  whiteSpace={"nowrap"}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {dat.usernames.map((user, index) => {
                    if (index >= dat.usernames.length - 1) {
                      return user;
                    } else {
                      return user + ", ";
                    }
                  })}
                </Text>
                <Text
                  color={"white"}
                  fontSize={"8pt"}
                  whiteSpace={"nowrap"}
                  width={"70%"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  as={"i"}
                >
                  {"No messages yet..."}
                </Text>
              </Flex>
              <Button
                onClick={() => deleteIt(doc.id)}
                colorScheme={"transparent"}
                minWidth={"10%"}
                minHeight={"10%"}
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
            db.collection("users")
              .doc(val2.id)
              .get()
              .then((valk) => {
                {
                  index - 1 != -1
                    ? db
                        .collection("users")
                        .doc(msgs[index - 1].id)
                        .get()
                        .then((valki) => {
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
                              marginRight={
                                val2.id == localStorage.getItem("id") ? 5 : 0
                              }
                              gap={1}
                            >
                              {valki.get("username") ==
                              valk.get("username") ? null : (
                                <Text
                                  color={"#bcbcbc"}
                                  fontSize={"11pt"}
                                  marginLeft={1}
                                  marginRight={1}
                                >
                                  {" "}
                                  @{valk.get("username")}
                                </Text>
                              )}
                              <Flex
                                backgroundColor={
                                  val2.id == localStorage.getItem("id")
                                    ? "#41A3E7"
                                    : "#323232"
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
                        })
                    : setComments((prevC) => [
                        ...prevC,
                        <Flex
                          direction={"column"}
                          alignItems={
                            val2.id == localStorage.getItem("id")
                              ? "flex-end"
                              : "flex-start"
                          }
                          width={"100%"}
                          marginRight={
                            val2.id == localStorage.getItem("id") ? 5 : 0
                          }
                          gap={1}
                        >
                          <Text
                            color={"#bcbcbc"}
                            fontSize={"11pt"}
                            marginLeft={1}
                            marginRight={1}
                          >
                            {" "}
                            @{valk.get("username")}
                          </Text>
                          <Flex
                            backgroundColor={
                              val2.id == localStorage.getItem("id")
                                ? "#41A3E7"
                                : "#323232"
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
                }
              });
          });
        });
    }
    // if (id != "") {
    //   db.collection("messages")
    //     .doc(id)
    //     .onSnapshot((val) => {
    //       let msgs = val.data().messages;
    //       msgs.forEach((val2) => {
    //         setComments(
    //           ...(prevC) => [
    //             ...prevC,
    //             Messagee(
    //               val2.id,
    //               val2.msg,
    //               val2.id == localStorage.getItem("id")
    //             ),
    //           ]
    //         );
    //       });
    //     });
    // }
  }, [db, id]);

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
                  <Text>People</Text>
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
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        height={"90vh"}
        width={"65vw"}
        backgroundColor={"#1C1c1c"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
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
            Messages
          </Text>
          <Tooltip label={"Add new private message!"} aria-label="A tooltip">
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
        <Flex direction={"row"} height={"100%"} width={"100%"}>
          <Flex
            direction={"column"}
            alignItems={"center"}
            width={"40%"}
            height={"100%"}
            gap={2}
            overflowY={"scroll"}
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
                <Text color={"white"} textAlign={"center"} fontSize={"30pt"}>
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
                borderTop={"1px solid #323232"}
                borderLeft={"1px solid #323232"}
              >
                <Text
                  color={"white"}
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
                color={"white"}
                placeholder={"Message here..."}
                width={"45vw"}
                left={"36.85vw"}
                marginBottom={"1.5vh"}
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                onKeyDown={handleComment}
                backgroundColor={"#1c1c1c"}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Messages;
