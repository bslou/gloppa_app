import { Button, Flex, Input, Link, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const StartupComp = (img, level, name, id) => {
  const deleteIt = () => {
    if (window.confirm("Do you really want to delete " + name + "?")) {
      let idd = localStorage.getItem("id");
      db.collection("startups")
        .doc(id)
        .get()
        .then((val) => {
          let fundid = val.get("fundingId");
          let prodid = val.get("productReviewId");
          if (prodid != "" && fundid != "") {
            db.collection("productReview").doc(prodid).delete();
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ productReviewStartupId: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ fundingStartupId: arrayRemove(idd) });
            db.collection("funding").doc(fundid).delete();
          } else if (prodid != "") {
            db.collection("productReview").doc(prodid).delete();
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ productReviewStartupId: arrayRemove(id) });
          } else if (fundid != "") {
            db.collection("funding").doc(fundid).delete();
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
            db.collection("users")
              .doc(idd)
              .update({ fundingStartupId: arrayRemove(idd) });
          } else {
            db.collection("startups").doc(id).delete();
            db.collection("users")
              .doc(idd)
              .update({ startups: arrayRemove(id) });
          }
        });
    }
  };

  if (name) {
    return (
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"#fff"}
        width={"70%"}
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={2}
        //borderRadius={3}
        boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
      >
        <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Image src={img} alt={"Gloppa spacer"} width={50} height={50} />
          <Text color={"black"} fontWeight={300}>
            {level}
          </Text>
        </Flex>
        <NextLink href={"/app/" + id}>
          <Link
            color={"black"}
            fontWeight={300}
            fontSize={{ base: "8pt", md: "13pt", lg: "17pt" }}
          >
            {name}
          </Link>
        </NextLink>
        <Tooltip label={"Delete " + name + "..."} aria-label="A tooltip">
          <Button onClick={deleteIt} colorScheme={"transparent"}>
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
  }
};

export default StartupComp;
