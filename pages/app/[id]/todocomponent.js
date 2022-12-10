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

const ToDoComponent = (task, urgency, date, color, index) => {
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
            <MenuItem>Remove</MenuItem>
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
        <Checkbox size={"lg"} marginRight={"1vw"} />
      </Flex>
    </Flex>
  );
};

export default ToDoComponent;
