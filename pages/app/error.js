import { Text, Box, Link, Flex, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

function ErrorPage() {
  const router = useRouter();

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"2vh"}
      width={"100vw"}
      height={"100vh"}
    >
      <Image
        src={"/assets/gloppalogo.png"}
        width={150}
        height={150}
        alt={"Gloppa Icon"}
      />
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        404 Not Found
      </Text>
      <Text mb={4}>The page you are looking for was not found.</Text>
      <Link
        onClick={() => {
          router.back();
          router.back();
        }}
      >
        <Button as={"a"} color={"blue"} background={"transparent"}>
          Go back
        </Button>
      </Link>
    </Flex>
  );
}

export default ErrorPage;
