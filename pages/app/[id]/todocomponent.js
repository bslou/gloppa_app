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

const ToDoComponent = (task, urgency, date, color, index, id) => {
  const deleteIt = () => {
    db.collection("startups")
      .doc(id)
      .update({ tasks: arrayRemove(JSON.stringify([task, urgency, date])) });
    setTimeout(() => {
      console.log("timer completed");
      window.location.reload();
    }, 500);
  };

  const finished = () => {
    if (
      window.confirm(
        'Are you sure you are done with this task: \n"' + task + '"?'
      )
    ) {
      db.collection("startups")
        .doc(id)
        .update({
          completed: arrayUnion(JSON.stringify([task, urgency, date])),
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
        .update({ tasks: arrayRemove(JSON.stringify([task, urgency, date])) });
      setTimeout(() => {
        console.log("timer completed");
        window.location.reload();
      }, 500);
    }
  };

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor={"#303030"}
      width={"90%"}
      paddingTop={0.5}
      paddingBottom={0.5}
      paddingLeft={2}
      borderRadius={2}
      boxShadow={"0 5px 5px rgba(0, 0, 0, 0.5)"}
      _hover={{
        boxShadow: "0 5px 5px rgba(100,100,100,0.9)",
      }}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        marginRight={2}
      >
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
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            color={color == "green" ? "lightgreen" : color}
            fontSize={{ base: "12pt", md: "16pt", lg: "20pt" }}
            fontWeight={700}
          >
            {urgency}
          </Text>
          <Text
            color={color == "green" ? "lightgreen" : color}
            fontSize={{ base: "5pt", md: "8pt", lg: "11pt" }}
          >
            {date}
          </Text>
        </Flex>
        <Flex zIndex={10}>
          <Button
            marginRight={"1vw"}
            onClick={finished}
            colorScheme={"transparent"}
          >
            <Checkbox
              size={{ base: "sm", md: "md", lg: "lg" }}
              colorScheme={color}
              defaultChecked
              isReadOnly
              zIndex={-1}
            />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ToDoComponent;
