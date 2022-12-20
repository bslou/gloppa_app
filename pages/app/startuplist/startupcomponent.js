import { Button, Flex, Input, Link, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const StartupComponent = (img, level, name, id) => {
  let idd = localStorage.getItem("id");

  const deleteIt = () => {
    db.collection("startups")
      .doc(id)
      .get()
      .then((val) => {
        let fundid = val.get("fundingId");
        if (fundid != "") {
          db.collection("funding").doc(fundid).delete();
          db.collection("startups").doc(id).delete();
          db.collection("users")
            .doc(idd)
            .update({ startups: arrayRemove(id) });
          db.collection("users")
            .doc(idd)
            .update({ startups: arrayRemove(fundid) });
        } else {
          db.collection("startups").doc(id).delete();
          db.collection("users")
            .doc(idd)
            .update({ startups: arrayRemove(id) });
        }
      });
  };

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"#303030"}
      width={"90%"}
      paddingTop={5}
      paddingBottom={5}
      paddingLeft={5}
      borderRadius={3}
      boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
      _hover={{
        boxShadow: "0 5px 5px rgba(100,100,100,0.9)",
      }}
    >
      <Flex
        position={"absolute"}
        left={"28vw"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image src={img} alt={"Gloppa spacer"} width={70} height={70} />
        <Text color={"white"} fontWeight={300}>
          {level}
        </Text>
      </Flex>
      <NextLink href={"/app/" + id}>
        <Link
          color={"white"}
          fontWeight={600}
          fontSize={{ base: "14pt", md: "18pt", lg: "25pt" }}
        >
          {name}
        </Link>
      </NextLink>
      <Tooltip label={"Delete " + name + "..."} aria-label="A tooltip">
        <Button
          position={"absolute"}
          right={"28vw"}
          onClick={deleteIt}
          colorScheme={"transparent"}
        >
          <Image
            src={"/assets/trash.png"}
            alt={"Gloppa menu"}
            width={35}
            height={35}
          />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default StartupComponent;
