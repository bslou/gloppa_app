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

  const finished = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        'Are you sure you are done with this task: "' + task + '"?'
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
      borderTop={"1px solid white"}
      borderBottom={"1px solid white"}
      width={"45vw"}
      paddingTop={2}
      paddingBottom={2}
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
              width={35}
              height={35}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={deleteIt}>Remove</MenuItem>
          </MenuList>
        </Menu>
        <Text color={"white"} fontWeight={500} fontSize={"18pt"}>
          {task}
        </Text>
      </Flex>
      <Flex gap={"1vw"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={color} fontSize={"15pt"} fontWeight={700}>
            {urgency}
          </Text>
          <Text color={color} fontSize={"15pt"}>
            {date}
          </Text>
        </Flex>
        <Checkbox
          size={"lg"}
          marginRight={"1vw"}
          onChange={(e) => finished(e)}
        />
      </Flex>
    </Flex>
  );
};

export default ToDoComponent;
