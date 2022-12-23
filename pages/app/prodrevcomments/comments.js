import { Flex, Text } from "@chakra-ui/react";

const Comments = (username, time, message) => {
  return (
    <Flex
      direction={"column"}
      alignItems={"left"}
      justifyContent={"center"}
      backgroundColor={"#323232"}
      gap={2}
      padding={5}
      width={"90%"}
      borderRadius={5}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"17pt"} color={"white"} fontWeight={700}>
          @{username}
        </Text>
        <Text fontSize={"10pt"} color={"#dfdfdf"}>
          {time}
        </Text>
      </Flex>
      <Text color={"white"} fontSize={"13pt"}>
        {message}
      </Text>
    </Flex>
  );
};

export default Comments;
