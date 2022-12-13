import { Flex, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";

const Achievements = (txt, coins) => {
  return (
    <ListItem>
      <Flex direction={"row"} alignItems={"center"}>
        <Text color={"white"} marginRight={"1vw"}>
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
  );
};

export default Achievements;
