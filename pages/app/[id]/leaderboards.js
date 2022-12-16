import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";

const Leaderboards = (img, lvl, startupName, index, eq) => {
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"90%"}
      backgroundColor={eq ? "#1F90FF" : "#dfdfdf"}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={5}
      paddingRight={5}
      borderRadius={2}
      boxShadow={
        eq ? "0 0 5px 1px #004C97" : "0 0 5px 1px rgba(255, 255, 255, 0.9)"
      }
      _hover={{
        boxShadow: "0 0 5px 1px rgba(100, 100, 100, 0.9)",
      }}
    >
      <Box position="relative" display="flex">
        <Box as="img" width={50} src={"/assets/coina.png"} alt="My Image" />
        <Box
          position="absolute"
          top="50%"
          right={"38.5%"}
          transform="translateY(-50%)"
          textAlign="center"
        >
          <Text
            fontFamily={"monospace"}
            color={eq ? "#fff" : "#000"}
            fontWeight={500}
            fontSize={"15pt"}
          >
            <Tooltip
              label={"Position " + index + " on leaderboard"}
              aria-label="A tooltip"
            >
              {index}
            </Tooltip>
          </Text>
        </Box>
      </Box>

      <Text color={eq ? "#fff" : "#000"} fontWeight={700}>
        {startupName}
      </Text>
      <Flex>
        <Image src={img} width={30} height={30} alt={"Gloppa Image"} />
        <Text color={eq ? "#fff" : "#000"}>{lvl}</Text>
      </Flex>
    </Flex>
  );
};

export default Leaderboards;
