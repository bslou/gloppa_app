import { Button, Flex, Tag, Text, Tooltip } from "@chakra-ui/react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";
import NavBar from "../navbar";

const Forum = () => {
  const router = useRouter();
  const [fors, setFors] = useState([]);
  const deleteIt = (id, msg) => {
    if (
      window.confirm(
        "Are you sure you want to delete this forum post:\n" + msg + "?"
      )
    ) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ forumsId: arrayRemove(id) });
      db.collection("forum").doc(id).delete();
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  const addLikes = (id, likes) => {
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
    db.collection("forum")
      .orderBy("timestamp", "desc")
      .onSnapshot((val) => {
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
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"90%"}
                  padding={5}
                  borderRadius={5}
                  backgroundColor={mine ? "#545454" : "#323232"}
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
                      <Text color={"white"} fontWeight={900} fontSize={"10pt"}>
                        @{val2.get("username")}
                      </Text>
                      {mine ? (
                        <Button
                          objectFit={"cover"}
                          height={"2vw"}
                          colorScheme={"transparent"}
                          onClick={() => deleteIt(docs.id, data.statement)}
                        >
                          <Image
                            src={"/assets/trash.png"}
                            alt={"trash"}
                            layout={"fill"}
                          />
                        </Button>
                      ) : null}
                    </Flex>
                    <Text color={"white"} fontSize={"15pt"}>
                      {data.statement}
                    </Text>
                    <Flex
                      direction={"row"}
                      alignItems={"center"}
                      //justifyContent={"center"}
                      gap={2.5}
                    >
                      {data.hashtags.map((val) => (
                        <Tag
                          colorScheme={"green"}
                          fontSize={"10pt"}
                          size={"lg"}
                        >
                          {val}
                        </Tag>
                      ))}
                      <Link href={"/app/forum/" + docs.id}>
                        <Text
                          color={"white"}
                          fontWeight={900}
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          {data.replies !== undefined ? data.replies.length : 0}{" "}
                          replies
                        </Text>
                      </Link>
                    </Flex>
                  </Flex>
                  <Button
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    border={thi ? "1px solid #1F90FF" : "1px solid white"}
                    borderRadius={3}
                    colorScheme={"transparent"}
                    height={"100%"}
                    backgroundColor={mine ? "#545454" : "#323232"}
                    onClick={() => addLikes(docs.id, data.likes)}
                    // onClick={addLikes}
                  >
                    <Image
                      src={thi ? "/assets/blueup.png" : "/assets/up.png"}
                      alt="Gloppa up"
                      width={40}
                      height={40}
                    />
                    <Text color={"#fff"} fontSize={"17pt"}>
                      {Object.keys(data.likes).length === 0
                        ? 0
                        : data.likes.length}
                    </Text>
                  </Button>
                </Flex>,
                // ForumComponent(
                //   val2.get("username"),
                //   docs.id,
                //   data.statement,
                //   data.hashtags,
                //   data.likes,
                //   thi,
                //   data.replies,
                //   mine
                // ),
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
