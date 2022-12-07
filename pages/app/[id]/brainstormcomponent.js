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

const BrainstormComponent = (task, probability, color, checked) => {
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor={"#1C1C1C"}
      width={"45vw"}
      paddingTop={5}
      paddingBottom={5}
      borderRadius={10}
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
        <Text
          as={checked ? "s" : "normal"}
          color={"white"}
          fontWeight={500}
          fontSize={"18pt"}
        >
          {task}
        </Text>
      </Flex>
      <Flex gap={"1vw"}>
        <Text color={color} fontSize={"15pt"} fontWeight={700}>
          {probability}
        </Text>
        <Checkbox defaultChecked={checked} size={"lg"} marginRight={"1vw"} />
      </Flex>
    </Flex>
  );
};

export default BrainstormComponent;
