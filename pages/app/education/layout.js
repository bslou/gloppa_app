import { Box, Flex, Text } from "@chakra-ui/react";

const Layout = (title, info) => {
  return (
    <>
      <Text color={"white"} fontWeight={400} fontSize={"23pt"}>
        {title}
      </Text>
      <Flex
        direction={"column"}
        width={"100%"}
        mask="rounded"
        overflowX={"scroll"}
        overflowY={"scroll"}
        alignItems={"flex-start"}
        gap={2}
      >
        <Box
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={5}
        >
          {info.map((val) => (
            <Flex
              direction={"column"}
              as={"a"}
              href={"/app/education/" + val[2]}
              width={200}
              height={220}
            >
              <img height={180} src={val[0]} alt={"video"} />
              <Text
                height={40}
                color={"white"}
                fontSize={"10pt"}
                textAlign={"center"}
                _hover={{
                  textDecoration: "underline",
                }}
              >
                {val[1]}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
