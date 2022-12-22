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
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, storage } from "../../api/firebaseconfig";
import ProdRevComponent2 from "./prodrevcomponent";
import { arrayUnion } from "firebase/firestore";
import Comments from "./comments";

const ProdRevComments = () => {
  const router = useRouter();
  console.log(router.query.id);

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
  const [comment, setComment] = useState("");

  const [id, setId] = useState("");
  const [idts, setIdts] = useState("");
  const [website, setWebsite] = useState("");
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [phrase, setPhrase] = useState("");
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [mine, setMine] = useState(false);

  const [commento, setCommento] = useState([]);

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
    if (router.isReady) {
      db.collection("productReview")
        .doc(router.query.id)
        .onSnapshot((snapshot) => {
          if (typeof snapshot.data() !== "undefined") {
            console.log("Test often Test totototot");
            const data = snapshot.data();
            setPhrase(data.catchPhrase);
            setComments(data.comments);
            data.comments.reverse().map((comment, index) => {
              db.collection("users")
                .doc(comment.id)
                .get()
                .then((snapshot3) => {
                  let doto = snapshot3.data();
                  setCommento((prevc) => [
                    ...prevc,
                    Comments(
                      doto.username,
                      String(comment.time),
                      comment.comment
                    ),
                  ]);
                });
            });
            setTags(data.hashtags);
            setLikes(data.likes);
            setTitle(data.startupName);
            setIdts(data.startupId);
            setId(router.query.id);
            if (
              data.likes.length > 0 &&
              data.likes.includes(localStorage.getItem("id"))
            ) {
              setLiked(true);
            } else {
              setLiked(false);
            }
            if (data.owner == localStorage.getItem("id")) {
              setMine(true);
            } else {
              setMine(false);
            }
            db.collection("startups")
              .doc(data.startupId)
              .onSnapshot((snapshot2) => {
                let dot = snapshot2.data();
                setWebsite(dot.website);
                storage
                  .ref(dot.img)
                  .getDownloadURL()
                  .then((url) => {
                    setImg(url);
                  });
              });
          }
          setLoading(false);
        });
    }
  }, [router]);

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

  const submitComment = () => {
    if (comment.length < 3) {
      toast({
        title: "Comment too short",
        description: "You have to make the comment size at least 3 letter...",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
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
    db.collection("productReview")
      .doc(router.query.id)
      .update({
        comments: arrayUnion({
          comment: comment,
          id: localStorage.getItem("id"),
          time: datetime,
        }),
      });

    setComment("");
  };

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

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
        paddingLeft={4}
        paddingRight={4}
        paddingTop={2.5}
        paddingBottom={2.5}
        width={"100vw"}
      >
        <NextLink href={"/app/productreview"}>
          <Link color={"white"}>
            <Image
              src={"/assets/back.png"}
              alt={"Back"}
              width={60}
              height={60}
            />
          </Link>
        </NextLink>
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
        backgroundColor={"#1c1c1c"}
        height={"89%"}
        width={"65vw"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        paddingTop={8}
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
            {title} Comments
          </Text>
        </Flex>
        {/* {ProdRevComponent()} */}
        {ProdRevComponent2(
          id,
          idts,
          website,
          img,
          title,
          phrase,
          tags,
          comments,
          likes,
          liked,
          mine
        )}
        <Flex
          width={"90%"}
          direction={"row"}
          marginTop={5}
          alignItems={"center"}
          justifyContent={"center"}
          borderTop={"1px solid white"}
          borderBottom={"1px solid white"}
        >
          <Textarea
            placeholder="Comment..."
            color="white"
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
          <Button type="submit" onClick={submitComment} borderRadius={5}>
            Submit Comment
          </Button>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={"2vh"}
          width={"100%"}
          overflowY={"scroll"}
          paddingTop={3}
        >
          {commento}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProdRevComments;
