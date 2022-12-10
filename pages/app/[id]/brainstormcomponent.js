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
import { arrayRemove } from "firebase/firestore";

const BrainstormComponent = (task, probability, color, index, id) => {
  const deleteIt = () => {
    db.collection("startups")
      .doc(id)
      .update({ brainstorm: arrayRemove(JSON.stringify([task, probability])) });
    setTimeout(() => {
      console.log("timer completed");
      window.location.reload();
    }, 500);
  };

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      borderTop={"1px solid white"}
      borderBottom={"1px solid white"}
      width={"45vw"}
      paddingTop={5}
      paddingBottom={5}
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
        <Text color={color} fontSize={"15pt"} fontWeight={700}>
          {probability}
        </Text>
        <Checkbox size={"lg"} marginRight={"1vw"} />
      </Flex>
    </Flex>
  );
};

export default BrainstormComponent;
