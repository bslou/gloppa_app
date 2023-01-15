import {
  Button,
  Flex,
  Input,
  Link,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const StartupComp = (img, name, des, jobs, prodRev, funding, id) => {
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
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <img src={img} alt={"Gloppa spacer"} width={50} height={50} />
          <Flex direction={"column"} justifyContent={"center"} gap={1}>
            <Text color={"black"} fontWeight={600}>
              {name}
            </Text>

            {/* <Button
              as={"a"}
              colorScheme={"transparent"}
              maxWidth={"45vw"}
            > */}
            <Link
              color={"black"}
              fontWeight={300}
              fontSize={{ base: "5pt", md: "7pt", lg: "9pt" }}
            >
              {des}
            </Link>
            {/* </Button> */}
            <Flex direction={"row"} alignItems={"center"} gap={2}>
              <Tag colorScheme="teal" size={"md"}>
                {prodRev.length == 0 ? "0 Product Reviews" : "1 Product Review"}
              </Tag>
              <Tag colorScheme="teal" size={"md"}>
                {jobs.length} Jobs
              </Tag>
              <Tag colorScheme="teal" size={"md"}>
                {funding.length == 0 ? "0 Funds" : "1 Fund"}
              </Tag>
            </Flex>
          </Flex>
        </Flex>
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
