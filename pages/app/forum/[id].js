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
  Textarea,
  Tag,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";
import { arrayRemove, arrayUnion } from "firebase/firestore";

const ForumReplies = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [oguname, setOgUname] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [usname, setUsname] = useState("");
  const [msg, setMsg] = useState("");
  const [tags, setTags] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [comments, setComments] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();
  const [comment, setComment] = useState("");

  const deleteIt = (ind) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      db.collection("forum")
        .doc(router.query.id)
        .get()
        .then((val) => {
          let arr = val.get("replies");
          arr.splice(ind, 1);
          db.collection("forum").doc(router.query.id).update({ replies: arr });
        });
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 400);
    }
  };

  const addLikes = (ind) => {
    console.log("ID " + router.query.id);
    console.log("Index " + String(ind));
    db.collection("forum")
      .doc(router.query.id)
      .get()
      .then((val) => {
        let arr = val.get("replies");
        console.log(
          "First arr " + Object.keys(arr) + "\nThird arr" + Object.values(arr)
        );
        console.log("Second arr " + Object.values(arr[ind])[3]);
        if (arr[ind].upvotes !== undefined) {
          if (arr[ind].upvotes.includes(localStorage.getItem("id"))) {
            const index = arr[ind].upvotes.indexOf(localStorage.getItem("id"));
            arr[ind].upvotes.splice(index, 1);
          } else {
            arr[ind].upvotes.push(localStorage.getItem("id"));
          }
          db.collection("forum").doc(router.query.id).update({ replies: arr });
        }
      });
  };

  const deleteIt2 = (id, msg) => {
    if (
      window.confirm(
        "Are you sure you want to delete this forum post:\n" + msg + "?"
      )
    ) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ forumsId: arrayRemove(id) });
      db.collection("forum").doc(id).delete();
      router.push("/app/forum");
    }
  };

  const addLikes2 = (id, likes) => {
    if (likes.includes(localStorage.getItem("id"))) {
      db.collection("forum")
        .doc(id)
        .update({ likes: arrayRemove(localStorage.getItem("id")) });
    } else {
      db.collection("forum")
        .doc(id)
        .update({ likes: arrayUnion(localStorage.getItem("id")) });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      router.push("/");
      return;
    }
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .onSnapshot((val) => {
        setEmail(val.data().email);
        setUname(val.data().username);
      });
    if (router.isReady) {
      console.log("ID " + router.query.id);
      setId(router.query.id);
      db.collection("forum")
        .doc(router.query.id)
        .onSnapshot((val) => {
          let data = val.data();
          db.collection("users")
            .doc(data.ownerId)
            .get()
            .then((val2) => {
              setUsname(val2.get("username"));
            });
          setMsg(data.statement);
          setTags(data.hashtags);
          setLikes(data.likes);
          setComments([]);
          data.replies.map((val4, index) =>
            setComments((prevCom) => [
              <Flex
                direction={"column"}
                alignItems={"left"}
                justifyContent={"center"}
                boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
                // backgroundColor={
                //   typeof window !== "undefined"
                //     ? val4.id == localStorage.getItem("id")
                //       ? "#545454"
                //       : "#323232"
                //     : "#323232"
                // }
                backgroundColor={"white"}
                gap={2}
                padding={3}
                width={"90%"}
                borderRadius={0}
              >
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={3}
                  width={"100%"}
                >
                  <Button
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    border={
                      val4.upvotes !== undefined
                        ? val4.upvotes.includes(localStorage.getItem("id"))
                          ? "1px solid #1F90FF"
                          : "1px solid black"
                        : "1px solid black"
                    }
                    borderRadius={3}
                    colorScheme={"transparent"}
                    height={"100%"}
                    //   backgroundColor={"#323232"}
                    padding={3}
                    onClick={(e) => addLikes(index)}
                  >
                    <Image
                      src={
                        val4.upvotes !== undefined
                          ? val4.upvotes.includes(localStorage.getItem("id"))
                            ? "/assets/blueup.png"
                            : "/assets/up.png"
                          : "/assets/up.png"
                      }
                      alt="Gloppa up"
                      width={40}
                      height={40}
                    />
                    <Text color={"#000"} fontSize={"17pt"}>
                      {val4.upvotes !== undefined
                        ? Object.keys(val4.upvotes).length === 0
                          ? 0
                          : val4.upvotes.length
                        : 0}
                    </Text>
                  </Button>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"100%"}
                  >
                    <Flex direction={"row"}>
                      <Flex
                        direction={"column"}
                        gap={2}
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                      >
                        <Text
                          fontSize={"12pt"}
                          color={"black"}
                          fontWeight={800}
                        >
                          @{val4.username}
                        </Text>
                        <Text color={"black"} fontSize={"13pt"}>
                          {val4.comment}
                        </Text>
                      </Flex>
                      {val4.id == localStorage.getItem("id") ? (
                        <Button
                          objectFit={"cover"}
                          height={"2vw"}
                          colorScheme={"transparent"}
                          onClick={() => deleteIt(index)}
                        >
                          <img
                            src={"/assets/trash.png"}
                            alt={"trash"}
                            width={30}
                            height={30}
                            layout={"responsive"}
                          />
                        </Button>
                      ) : null}
                    </Flex>
                  </Flex>
                  <Text fontSize={"10pt"} color={"#404040"}>
                    {String(val4.time)}
                  </Text>
                  {/* <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"100%"}
                  > */}
                  {/* <Text color={"white"} fontSize={"13pt"}>
                      {val4.comment}
                    </Text> */}
                  {/* <Button
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      border={
                        val4.upvotes !== undefined
                          ? val4.upvotes.includes(localStorage.getItem("id"))
                            ? "1px solid #1F90FF"
                            : "1px solid white"
                          : "1px solid white"
                      }
                      borderRadius={3}
                      colorScheme={"transparent"}
                      height={"100%"}
                      //   backgroundColor={"#323232"}
                      padding={3}
                      onClick={(e) => addLikes(index)}
                    >
                      <Image
                        src={
                          val4.upvotes !== undefined
                            ? val4.upvotes.includes(localStorage.getItem("id"))
                              ? "/assets/blueup.png"
                              : "/assets/up.png"
                            : "/assets/up.png"
                        }
                        alt="Gloppa up"
                        width={40}
                        height={40}
                      />
                      <Text color={"#fff"} fontSize={"17pt"}>
                        {val4.upvotes !== undefined
                          ? Object.keys(val4.upvotes).length === 0
                            ? 0
                            : val4.upvotes.length
                          : 0}
                      </Text>
                    </Button> */}
                  {/* </Flex> */}
                </Flex>
              </Flex>,
              ...prevCom,
            ])
          );
          setOwnerId(data.ownerId);
        });
    }
  }, [router, db]);

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
  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const submitComment = () => {
    if (comment.length > 2) {
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .get()
        .then((val) => {
          db.collection("forum")
            .doc(id)
            .update({
              replies: arrayUnion({
                id: localStorage.getItem("id"),
                username: val.get("username"),
                comment: comment,
                upvotes: [],
                time: datetime,
              }),
            });
          setComment("");
        });
    } else {
      toast({
        title: "Message has to be at least 3 characters long...",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
      </Modal> */}
      {/* <Modal isOpen={isOpen2} onClose={onClose2}>
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
        paddingLeft={4}
        paddingRight={4}
        paddingTop={2.5}
        paddingBottom={2.5}
        width={"100vw"}
      >
        <NextLink href={"/app/forum"}>
          <Link color={"black"}>
            <img
              style={{ filter: "brightness(0)" }}
              src={"/assets/back.png"}
              alt={"Back"}
              width={60}
              height={60}
            />
          </Link>
        </NextLink>
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
        height={"89%"}
        width={"65vw"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        paddingTop={8}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"90%"}
          padding={3}
          borderRadius={0}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          // backgroundColor={
          //   typeof window !== "undefined"
          //     ? localStorage.getItem("id") == ownerId
          //       ? "#545454"
          //       : "#323232"
          //     : "#323232"
          // }
          backgroundColor={"white"}
          _hover={{
            opacity: 0.8,
          }}
        >
          <Flex
            direction={"column"}
            //alignItems={"left"}
            justifyContent={"center"}
            width={"80%"}
            gap={0.5}
          >
            <Flex direction={"row"} alignItems={"center"}>
              <Text color={"black"} fontWeight={900} fontSize={"10pt"}>
                @{usname}
              </Text>
              {typeof window !== "undefined" ? (
                localStorage.getItem("id") == ownerId ? (
                  <Button
                    objectFit={"cover"}
                    height={"2vw"}
                    colorScheme={"transparent"}
                    onClick={() => deleteIt2(id, msg)}
                  >
                    <Image
                      src={"/assets/trash.png"}
                      alt={"trash"}
                      layout={"fill"}
                    />
                  </Button>
                ) : null
              ) : null}
            </Flex>
            <Text color={"black"} fontSize={"15pt"}>
              {msg}
            </Text>
            <Flex
              direction={"row"}
              alignItems={"center"}
              //justifyContent={"center"}
              gap={2.5}
            >
              {tags.map((val) => (
                <Tag colorScheme={"green"} fontSize={"10pt"} size={"lg"}>
                  {val}
                </Tag>
              ))}
              <Link color={"black"} fontWeight={900} href={"/app/forum/" + id}>
                {comments !== undefined ? comments.length : 0} replies
              </Link>
            </Flex>
          </Flex>
          <Button
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            border={
              typeof window !== "undefined"
                ? likes.includes(localStorage.getItem("id"))
                  ? "1px solid #1F90FF"
                  : "1px solid black"
                : "1px solid black"
            }
            borderRadius={3}
            colorScheme={"transparent"}
            height={"100%"}
            // backgroundColor={
            //   typeof window !== "undefined"
            //     ? localStorage.getItem("id") == ownerId
            //       ? "#545454"
            //       : "#323232"
            //     : "#323232"
            // }
            background={"transparent"}
            onClick={() => addLikes2(id, likes)}
            // onClick={addLikes}
          >
            <Image
              src={
                typeof window !== "undefined"
                  ? likes.includes(localStorage.getItem("id"))
                    ? "/assets/blueup.png"
                    : "/assets/up.png"
                  : "/assets/up.png"
              }
              alt="Gloppa up"
              width={40}
              height={40}
            />
            <Text color={"#000"} fontSize={"17pt"}>
              {Object.keys(likes).length === 0 ? 0 : likes.length}
            </Text>
          </Button>
        </Flex>
        {/* {ForumComponent(
          usname,
          id,
          msg,
          tags,
          likes,
          typeof window !== "undefined"
            ? likes.includes(localStorage.getItem("id"))
            : false,
          comments,
          typeof window !== "undefined"
            ? localStorage.getItem("id") == ownerId
            : false
        )} */}
        <Flex
          width={"90%"}
          direction={"row"}
          marginTop={5}
          alignItems={"center"}
          justifyContent={"center"}
          borderTop={"1px solid black"}
          borderBottom={"1px solid black"}
        >
          <Textarea
            placeholder="Comment..."
            color="black"
            border={"none"}
            resize={"none"}
            style={{
              ":focus": {
                outline: "none",
                border: "none",
                boxShadow: "none",
              },
            }}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          {/*onClick={submitComment}*/}
          <Button type="submit" onClick={submitComment}>
            Submit Comment
          </Button>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={"2vh"}
          width={"100%"}
          overflowY={"scroll"}
          paddingBottom={5}
          paddingTop={3}
        >
          {/* {commento} */}
          {comments}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForumReplies;
