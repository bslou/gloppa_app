import {
  Button,
  Flex,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { isMobile } from "react-device-detect";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

const ForumReg = () => {
  const [idd, setIdd] = useState("");
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [statement, setStatement] = useState("");
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMobile) {
        function handleOrientationChange() {
          if (window.matchMedia("(orientation: portrait)").matches) {
            //setOrientation("vertical");
            router.push("/");
          }
        }
        window.addEventListener("resize", handleOrientationChange);
        handleOrientationChange();
        return () => {
          window.removeEventListener("resize", handleOrientationChange);
        };
      }
      if (localStorage.getItem("id") !== null) {
      } else {
        router.push("/c/main");
      }
    }
  }, []);

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && tags.length < 3 && value.length >= 2) {
      setTags([...tags, value]);
      event.target.value = "";
    }
  };

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const handleClose = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const submitForum = (e) => {
    e.preventDefault();
    // if (startupName == null) {
    //   toast({
    //     title: "No hashtags selected",
    //     status: "error",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    //   return;
    // }
    if (tags.length < 1) {
      toast({
        title: "No hashtags",
        description:
          "You have to select hashtags. Make sure each hashtag is at least 2 characters.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else {
      db.collection("forum")
        .add({
          statement: statement,
          ownerId: localStorage.getItem("id"),
          hashtags: tags,
          likes: [],
          replies: [],
          timestamp: serverTimestamp(),
        })
        .then((docRef) => {
          db.collection("users")
            .doc(localStorage.getItem("id"))
            .update({ forumsId: arrayUnion(docRef.id) });
          router.push("/app/forum");
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
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingLeft={3}
        paddingRight={4}
        paddingTop={5}
        width={"100vw"}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2.5vw"}
        >
          <Button colorScheme={"transparent"} onClick={() => router.back()}>
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
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </MenuList>
        </Menu> */}
      </Flex>
      <form onKeyDown={onKeyDown} onSubmit={(e) => submitForum(e)}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          backgroundColor={"#fff"}
          width={"60vw"}
          gap={2}
          borderTopLeftRadius={2}
          borderTopRightRadius={2}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          paddingTop={1}
          paddingBottom={3}
        >
          <Text
            fontWeight={300}
            color={"black"}
            fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
          >
            Forum Post
          </Text>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Question or idea to post on public forum:
            </Text>
            <Textarea
              backgroundColor={"white"}
              borderRadius={5}
              required
              minLength={3}
              maxLength={200}
              maxHeight={200}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Hashtags:
            </Text>

            <Input
              backgroundColor={"white"}
              placeholder="Press enter after inputing hashtag"
              onKeyDown={handleChange}
              maxLength={25}
              minLength={2}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
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
          <Button
            backgroundColor={"white"}
            fontWeight={300}
            fontSize={{ base: "11pt", md: "17pt", lg: "25pt" }}
            type={"submit"}
            height={"8vh"}
            border={"none"}
            boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          >
            Post on form
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ForumReg;
