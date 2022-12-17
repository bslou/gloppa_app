import {
  Button,
  Checkbox,
  Flex,
  Link,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";
import { arrayRemove, arrayUnion, increment } from "firebase/firestore";

const BrainstormComponent = (task, probability, color, index, id) => {
  const deleteIt = () => {
    db.collection("startups")
      .doc(id)
      .update({ brainstorm: arrayRemove(JSON.stringify([task, probability])) });
  };

  const finished = () => {
    if (
      window.confirm(
        'Are you sure you are done with this brainstorm: \n"' + task + '"?'
      )
    ) {
      db.collection("startups")
        .doc(id)
        .update({
          completed: arrayUnion(JSON.stringify([task, probability])),
        });
      db.collection("startups")
        .doc(id)
        .update({
          level: increment(5),
        });
      db.collection("startups")
        .doc(id)
        .update({
          coins: increment(5),
        });
      db.collection("startups")
        .doc(id)
        .update({
          brainstorm: arrayRemove(JSON.stringify([task, probability])),
        });
    }
  };

  return (
    <Flex
      ddirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor={"#303030"}
      width={"90%"}
      paddingTop={2}
      paddingBottom={2}
      paddingLeft={2}
      borderRadius={2}
      gap={5}
      boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
      _hover={{
        boxShadow: "0 5px 5px rgba(100,100,100,0.9)",
      }}
    >
      <Flex>
        <Menu>
          <MenuButton
            paddingLeft={5}
            paddingRight={5}
            variant={"ghost"}
            colorScheme={"transparent"}
          >
            <Image
              src={"/assets/Braille.png"}
              alt={"options"}
              width={28}
              height={28}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={deleteIt}>Remove</MenuItem>
          </MenuList>
        </Menu>
        <Text
          color={"white"}
          fontWeight={500}
          fontSize={{ base: "10pt", md: "14pt", lg: "18pt" }}
          maxWidth={"22vw"}
        >
          {task}
        </Text>
      </Flex>
      <Flex gap={"1vw"} alignItems={"center"} justifyContent={"center"}>
        <Text
          color={color == "green" ? "lightgreen" : color}
          fontSize={{ base: "8pt", md: "11.5pt", lg: "15pt" }}
          fontWeight={700}
        >
          {probability}
        </Text>
        <Flex zIndex={10}>
          <Button
            marginRight={"1vw"}
            onClick={finished}
            colorScheme={"transparent"}
          >
            <Checkbox
              size={{ base: "sm", md: "md", lg: "lg" }}
              colorScheme={color}
              defaultChecked={true}
              isReadOnly={true}
              zIndex={-1}
            />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BrainstormComponent;
