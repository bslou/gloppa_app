import { Button, Collapse, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { db } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const FundingComponent = (
  img,
  startupName,
  investment,
  des,
  eml,
  foundedYear,
  website,
  mine,
  id,
  idts,
  toast
  // show,
  // setShow
) => {
  const deleteIt = () => {
    if (
      window.confirm(
        "Do you really want to delete " + startupName + " fund post?"
      )
    ) {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .update({ fundingStartupId: arrayRemove(idts) });
      db.collection("startups").doc(idts).update({ fundingId: "" });
      db.collection("funding").doc(id).delete();
      toast({
        title: "Deleting Fund",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 400);
      //change out of bottom code in the future!
      //window.location.reload();
    }
  };

  //comment out below line later if needed!
  if (eml) {
    console.log("Output");
    return (
      <Flex
        direction={"row"}
        alignItems={"center"}
        boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
        _hover={{
          opacity: 0.8,
        }}
        //backgroundColor={mine ? "#dcdcdc" : "#fff"}
        backgroundColor={"#fff"}
        width={"70%"}
        paddingLeft={5}
        paddingRight={5}
        paddingTop={3}
        paddingBottom={3}
        justifyContent={"space-between"}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2vw"}
          maxWidth={"77%"}
        >
          <img src={img} alt={startupName} width={"13%"} height={"13%"} />
          <Flex
            direction={"column"}
            alignItems={"left"}
            justifyContent={"center"}
            width={"100%"}
          >
            <Flex direction={"row"} alignItems={"center"}>
              <Text
                color={"black"}
                fontWeight={500}
                fontSize={{ base: "15pt", md: "17pt", lg: "20pt" }}
              >
                {startupName}
              </Text>
              {/* <Tooltip
              label={"Show " + (show ? "less!" : "more!")}
              aria-label="A tooltip"
            >
              <Button
                borderRadius={"50%"}
                fontSize={"20pt"}
                colorScheme={"transparent"}
                color={"white"}
                size="sm"
                onClick={() => setShow(!show)}
              >
                {show ? "-" : "+"}
              </Button>
            </Tooltip> */}
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"35vw"}
            >
              <Text
                color={"black"}
                fontWeight={900}
                fontSize={{ base: "7pt", md: "9.5pt", lg: "12pt" }}
              >
                {String(investment[0])}% equity for ${String(investment[1])}
              </Text>
              <Text
                color={"black"}
                fontWeight={900}
                fontSize={{ base: "7pt", md: "9.5pt", lg: "12pt" }}
              >
                Founded: {String(foundedYear)}
              </Text>
            </Flex>
            {/* <Collapse startingHeight={22} in={show}> */}
            <Text
              color={"black"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
            >
              {des}
            </Text>
            {/* </Collapse> */}
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"1vh"}
        >
          {!mine ? (
            <Text
              color={"black"}
              fontSize={{ base: "9pt", md: "11pt", lg: "13pt" }}
              fontWeight={900}
              textAlign={"center"}
            >
              Contact them!&nbsp;
            </Text>
          ) : (
            <Text
              color={"red"}
              fontSize={{ base: "9pt", md: "11pt", lg: "13pt" }}
              fontWeight={900}
              textAlign={"center"}
            >
              Delete fund!&nbsp;
            </Text>
          )}
          {!mine ? (
            <Tooltip label={"Send email!"} aria-label="A tooltip">
              <NextLink href={"mailto:" + eml} passHref target={"_blank"}>
                <Link>
                  <img
                    style={{ filter: "brightness(0)" }}
                    src={"/assets/Envelope.png"}
                    alt={"Envelope"}
                    width={30}
                    height={30}
                  />
                </Link>
              </NextLink>
            </Tooltip>
          ) : (
            <Tooltip label={"Delete startup fund!"} aria-label="A tooltip">
              <Button colorScheme={"transparent"} onClick={deleteIt}>
                <Image
                  src={"/assets/trash.png"}
                  alt={"Trash"}
                  width={30}
                  height={30}
                />
              </Button>
            </Tooltip>
          )}
          <NextLink href={website} passHref target={"_blank"}>
            <Link
              color={"black"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
            >
              Website
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    );
  }
};

export default FundingComponent;
