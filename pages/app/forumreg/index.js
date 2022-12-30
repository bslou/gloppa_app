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
      backgroundColor={"#323232"}
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
            <Link color={"white"}>
              <Image
                src={"/assets/back.png"}
                alt={"Back"}
                width={60}
                height={60}
              />
            </Link>
          </Button>
        </Flex>
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
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <form onKeyDown={onKeyDown} onSubmit={(e) => submitForum(e)}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={4}
          backgroundColor={"#1C1C1C"}
          width={"60vw"}
          maxHeight={"90vh"}
          minHeight={"90vh"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingTop={8}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            position={"absolute"}
            top={{ base: "5.5vh", md: "4.5vh", lg: "4vh" }}
          >
            <Text
              textShadow={"0px 4px 1px rgba(0,0,0,1)"}
              fontWeight={800}
              color={"white"}
              fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
            >
              Forum Post
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"white"} fontWeight={300} width={"15vw"}>
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
            <Text color={"white"} fontWeight={300} width={"15vw"}>
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
            fontSize={{ base: "8pt", md: "15pt", lg: "20pt" }}
            type={"submit"}
            width={"22vw"}
            height={"8vh"}
          >
            Post on form
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ForumReg;
