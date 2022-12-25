import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { db } from "./api/firebaseconfig";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import Image from "next/image";

const Direction = () => {
  const router = useRouter();
  useEffect(() => {
    //localStorage.removeItem("id");
    if (isMobile) {
    } else {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("id") !== null) {
          db.collection("users")
            .doc(localStorage.getItem("id"))
            .get()
            .then((val) => {
              if (!val.exists) {
                localStorage.removeItem("id");
                return;
              }
            });
          router.push("/app/startuplist");
        } else {
          router.push("/c/main");
        }
      }
    }
  });
  if (isMobile) {
    return (
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={"100vh"}
        gap={"3vh"}
      >
        <Flex borderRadius={10} position={"absolute"} top={"5vh"} left={"8vw"}>
          <Image
            src={"/assets/gloppalogo.png"}
            alt={"Gloppa Logo"}
            layout={"responsive"}
            width={100}
            height={100}
          />
        </Flex>
        <Heading textAlign={"center"}>Hey, Mobile Friend!</Heading>
        <Text textAlign={"center"}>
          The Glppa Website is best viewed on a tablet or desktop computer. We
          do not support usage of our website on mobile at this moment!
        </Text>
        <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Text textAlign={"center"}>Check us out on Twitter meanwhile?</Text>
          <Link href={"https://twitter.com/GloppaG"} passHref target={"_blank"}>
            <Button colorScheme={"transparent"} as={"a"} color={"blue"}>
              @Gloppa
            </Button>
          </Link>
        </Flex>
      </Flex>
    );
  }
};

export default Direction;
