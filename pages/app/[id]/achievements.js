import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";

const Achievements = (txt, coins) => {
  return (
    // comment out list
    <List>
      <ListItem>
        <Flex direction={"row"} alignItems={"center"}>
          <Text
            color={"white"}
            marginRight={"1vw"}
            fontSize={{ base: "6pt", md: "9pt", lg: "12pt" }}
          >
            {txt}
          </Text>
          <Image
            src={"/assets/coin.png"}
            alt={"Gloppa coin"}
            width={25}
            height={25}
            marginRight={"0.2vw"}
          />
          <Text>+{coins}</Text>
        </Flex>
      </ListItem>
    </List>
  );
};

export default Achievements;
