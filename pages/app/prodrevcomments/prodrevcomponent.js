import { Button, Flex, Link, Tag, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { db } from "../../api/firebaseconfig";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";

const ProdRevComponent2 = (
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
) => {
  const router = useRouter();
  const deleteIt = () => {
    if (
      window.confirm(
        "Do you really want to delete " + title + " product review?"
      )
    ) {
      db.collection("startups")
        .doc(idts)
        .update({ productReviewId: arrayRemove(id) });
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ productReviewStartupId: arrayRemove(idts) });
      db.collection("productReview").doc(id).delete();
      router.push("/app/productreview");
    }
  };
  const addLikes = () => {
    if (likes.includes(localStorage.getItem("id"))) {
      db.collection("productReview")
        .doc(id)
        .update({ likes: arrayRemove(localStorage.getItem("id")) });
    } else {
      db.collection("productReview")
        .doc(id)
        .update({ likes: arrayUnion(localStorage.getItem("id")) });
    }
  };
  return (
    <Flex
      direction={"row"}
      width={"90%"}
      backgroundColor={mine ? "#545454" : "#323232"}
      boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
      _hover={{
        boxShadow: "0 5px 5px rgba(100,100,100,0.9)",
      }}
      justifyContent={"space-between"}
      padding={5}
      borderRadius={5}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <img src={img} alt={"startup logo"} width={70} height={70} />
        <Flex
          direction={"column"}
          alignItems={"left"}
          justifyContent={"center"}
          gap={0.75}
        >
          <Flex alignItems={"center"} direction={"row"}>
            <Link color={"white"} fontWeight={700} fontSize={"15pt"}>
              <NextLink href={website} passHref target={"_blank"}>
                {title}
              </NextLink>
            </Link>
            {mine ? (
              <Button onClick={deleteIt} colorScheme={"transparent"}>
                <Image
                  src={"/assets/trash.png"}
                  alt="Delete"
                  width={25}
                  height={25}
                />
              </Button>
            ) : null}
          </Flex>
          <Text color={"#efefef"} fontSize={"13pt"}>
            {phrase}
          </Text>
          <Flex direction={"row"} alignItems={"center"} gap={4}>
            <Link
              colorScheme={"transparent"}
              alignItems={"left"}
              gap={1}
              display={"flex"}
              flexDirection={"row"}
              color={"white"}
              onClick={() => {
                router.push("/app/prodrevcomments/" + id);
              }}
            >
              <Image
                src={"/assets/message.png"}
                alt="Message"
                width={25}
                height={25}
              />
              <Text color={"white"} fontWeight={900}>
                {Object.keys(comments).length === 0 ? 0 : comments.length}
              </Text>
            </Link>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              {tags.map(function (tag, index) {
                console.log("Tag " + tag);
                return (
                  <Tag
                    key={index}
                    colorScheme={"green"}
                    fontSize={"12pt"}
                    size={"lg"}
                  >
                    {String(tag)}
                  </Tag>
                );
              })}
            </Flex>
          </Flex>
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

export default ProdRevComponent2;
