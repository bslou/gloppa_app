import { Button, Flex, Tag, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";
import NavBar from "../navbar";
import ForumComponent from "./forumcomponent";

const Forum = () => {
  const router = useRouter();
  const [fors, setFors] = useState([]);
  useEffect(() => {
    db.collection("forum").onSnapshot((val) => {
      setFors([]);
      val.forEach((docs) => {
        let data = docs.data();
        db.collection("users")
          .doc(data.ownerId)
          .get()
          .then((val2) => {
            let thi = true;
            if (data.likes.includes(localStorage.getItem("id"))) {
              thi = true;
            } else {
              thi = false;
            }
            let mine = true;
            if (data.ownerId == localStorage.getItem("id")) {
              mine = true;
            } else {
              mine = false;
            }
            setFors((prevF) => [
              ...prevF,
              ForumComponent(
                val2.get("username"),
                docs.id,
                data.statement,
                data.hashtags,
                data.likes,
                thi,
                data.replies,
                mine
              ),
            ]);
          });
      });
    });
  }, [db]);
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      direction={"column"}
      alignItems={"center"}
    >
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        height={"90vh"}
        width={"65vw"}
        overflowY={"scroll"}
        mask={"rounded"}
        backgroundColor={"#1C1c1c"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        paddingTop={10}
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
            Public Forum
          </Text>
          <Tooltip label={"Post public forum post!"} aria-label="A tooltip">
            <Button
              colorScheme="transparent"
              onClick={() => router.push("/app/forumreg")}
            >
              <Image
                src={"/assets/plus.png"}
                alt={"Gloppa plus"}
                width={30}
                height={30}
              />
            </Button>
          </Tooltip>
        </Flex>
        <Flex direction={"column"} alignItems={"center"} gap={3} width={"100%"}>
          {fors}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Forum;
