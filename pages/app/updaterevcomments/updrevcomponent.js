import { Button, Flex, Link, Tag, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { db } from "../../api/firebaseconfig";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";

const ProdRevComponent = (
  id,
  idts,
  website,
  img,
  title,
  phrase,
  desphrase,
  tags,
  comments,
  likes,
  liked,
  mine
) => {
  const deleteIt = () => {
    if (
      window.confirm(
        "Do you really want to delete " + title + " update review?"
      )
    ) {
      db.collection("startups")
        .doc(idts)
        .update({ updateReviewId: arrayRemove(id) });
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ updateReviewStartupId: arrayRemove(id) });
      db.collection("updateReview").doc(id).delete();
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };
  const addLikes = () => {
    if (likes.includes(localStorage.getItem("id"))) {
      db.collection("updateReview")
        .doc(id)
        .update({ likes: arrayRemove(localStorage.getItem("id")) });
    } else {
      db.collection("updateReview")
        .doc(id)
        .update({ likes: arrayUnion(localStorage.getItem("id")) });
    }
  };

  if (website) {
    return (
      <Flex
        direction={"row"}
        width={"90%"}
        alignItems={"center"}
        //backgroundColor={mine ? "#dcdcdc" : "#fff"}
        backgroundColor={"#fff"}
        boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
        _hover={{
          //boxShadow: "0 5px 5px rgba(100,100,100,0.9)",
          opacity: 0.8,
        }}
        justifyContent={"space-between"}
        padding={2}
        //borderRadius={5}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <img src={img} alt={title} width={70} height={70} />
          <Flex
            direction={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            gap={0.75}
          >
            <Flex alignItems={"center"} direction={"row"}>
              <Link
                color={"black"}
                fontWeight={700}
                fontSize={{ base: "11pt", md: "13pt", lg: "15pt" }}
              >
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
            <Text
              color={"black"}
              fontSize={{ base: "9pt", md: "11pt", lg: "13pt" }}
              fontWeight={700}
            >
              {phrase}
            </Text>
            <Text
              maxWidth={"40vw"}
              color={"#808080"}
              fontSize={{ base: "6pt", md: "8pt", lg: "10pt" }}
            >
              {desphrase}
            </Text>
            <Flex direction={"row"} alignItems={"center"} gap={4}>
              <Link
                colorScheme={"transparent"}
                alignItems={"left"}
                gap={1}
                display={"flex"}
                flexDirection={"row"}
                color={"black"}
              >
                <img
                  style={{ filter: "brightness(0)" }}
                  src={"/assets/message.png"}
                  alt="Message"
                  width={25}
                  height={25}
                />
                <Text color={"black"} fontWeight={900}>
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
                      fontSize={{
                        base: "4pt",
                        md: "7pt",
                        lg: "10pt",
                      }}
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
          border={liked ? "1px solid #1F90FF" : "1px solid black"}
          borderRadius={2}
          colorScheme={"transparent"}
          height={"100%"}
          backgroundColor={"transparent"}
          onClick={addLikes}
          paddingBottom={3}
          paddingTop={3}
        >
          <img
            src={liked ? "/assets/blueup.png" : "/assets/up.png"}
            alt="Gloppa up"
            width={40}
            height={40}
          />
          <Text color={"#000"} fontSize={"17pt"}>
            {Object.keys(likes).length === 0 ? 0 : likes.length}
          </Text>
        </Button>
      </Flex>
    );
  }
};

export default ProdRevComponent;
