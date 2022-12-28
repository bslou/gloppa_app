import { Button, Flex, Input, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Messagee = (person, message, mine) => {
  return (
    <Flex
      direction={"column"}
      alignItems={mine ? "flex-end" : "flex-start"}
      width={"100%"}
      marginRight={mine ? 5 : 0}
      gap={1}
    >
      <Text color={"#bcbcbc"} fontSize={"11pt"} marginLeft={1} marginRight={1}>
        {" "}
        @{person}
      </Text>
      <Flex
        backgroundColor={mine ? "#41A3E7" : "#323232"}
        maxWidth={"50%"}
        borderRadius={20}
        padding={3}
        marginBottom={1}
        flexWrap={"wrap"}
      >
        <Text color={"white"}>{message}</Text>
      </Flex>
    </Flex>
  );
};

export default Messagee;
