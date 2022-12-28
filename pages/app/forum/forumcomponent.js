import { Button, Flex, Link, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import { db } from "../../api/firebaseconfig";
import { arrayRemove, arrayUnion } from "firebase/firestore";

const ForumComponent = (uname, id, msg, tags, likes, liked, comments, mine) => {
  const deleteIt = () => {
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

  const addLikes = () => {
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
  return (
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
            @{uname}
          </Text>
          {mine ? (
            <Button
              objectFit={"cover"}
              height={"2vw"}
              colorScheme={"transparent"}
              onClick={deleteIt}
            >
              <Image src={"/assets/trash.png"} alt={"trash"} layout={"fill"} />
            </Button>
          ) : null}
        </Flex>
        <Text color={"white"} fontSize={"15pt"}>
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
          <Link color={"white"} fontWeight={900} href={"/app/forum/" + id}>
            {comments !== undefined ? comments.length : 0} replies
          </Link>
        </Flex>
      </Flex>
      <Button
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        border={liked ? "1px solid #1F90FF" : "1px solid white"}
        borderRadius={3}
        colorScheme={"transparent"}
        height={"100%"}
        backgroundColor={mine ? "#545454" : "#323232"}
        onClick={addLikes}
        // onClick={addLikes}
      >
        <Image
          src={liked ? "/assets/blueup.png" : "/assets/up.png"}
          alt="Gloppa up"
          width={40}
          height={40}
        />
        <Text color={"#fff"} fontSize={"17pt"}>
          {Object.keys(likes).length === 0 ? 0 : likes.length}
        </Text>
      </Button>
    </Flex>
  );
};

export default ForumComponent;
