import { Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const StartupComponent = (img, level, name, id) => {
  let idd = localStorage.getItem("id");

  const deleteIt = () => {
    db.collection("startups").doc(id).delete();
    db.collection("users")
      .doc(idd)
      .update({ startups: arrayRemove(id) });
    setTimeout(() => {
      console.log("timer completed");
      window.location.reload();
    }, 500);
  };

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      borderTop={"1px solid white"}
      borderBottom={"1px solid white"}
      width={"100%"}
      paddingTop={5}
      paddingBottom={5}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"absolute"}
        left={"24vw"}
      >
        <Image src={img} alt={"Gloppa spacer"} width={70} height={70} />
        <Text color={"white"} fontWeight={300}>
          {level}
        </Text>
      </Flex>
      <NextLink href={"/app/" + id}>
        <Link
          color={"white"}
          fontWeight={900}
          fontSize={{ base: "14pt", md: "18pt", lg: "25pt" }}
        >
          {name}
        </Link>
      </NextLink>
      <Button
        onClick={deleteIt}
        position={"absolute"}
        right={"22vw"}
        colorScheme={"transparent"}
      >
        <Image
          src={"/assets/trash.png"}
          alt={"Gloppa menu"}
          width={35}
          height={35}
        />
      </Button>
    </Flex>
  );
};

export default StartupComponent;
