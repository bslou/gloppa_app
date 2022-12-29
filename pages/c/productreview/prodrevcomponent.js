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
  tags,
  comments,
  likes,
  router
) => {
  if (website) {
    return (
      <Flex
        direction={"row"}
        width={"90%"}
        backgroundColor={"#323232"}
        boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
        _hover={{
          //boxShadow: "0 5px 5px rgba(100,100,100,0.9)",
          opacity: 0.8,
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
          <img src={img} alt={title} width={70} height={70} />
          <Flex
            direction={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            gap={0.75}
          >
            <Flex alignItems={"center"} direction={"row"}>
              <Link color={"white"} fontWeight={700} fontSize={"18pt"}>
                <NextLink href={website} passHref target={"_blank"}>
                  {title}
                </NextLink>
              </Link>
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
                onClick={() => router.push("/app/register")}
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
          border={"1px solid white"}
          borderRadius={3}
          colorScheme={"transparent"}
          height={"100%"}
          backgroundColor={"#323232"}
          onClick={() => router.push("/app/register")}
        >
          <Image
            src={"/assets/up.png"}
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
  }
};

export default ProdRevComponent;
