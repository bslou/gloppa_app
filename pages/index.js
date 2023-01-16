import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "./api/firebaseconfig";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import Image from "next/image";

const Direction = () => {
  const router = useRouter();
  const toast = useToast();
  //const [orientation, setOrientation] = useState(null);

  useEffect(() => {
    //localStorage.removeItem("id");
    if (isMobile) {
      function handleOrientationChange() {
        if (window.matchMedia("(orientation: portrait)").matches) {
          //setOrientation("vertical");
        } else if (window.matchMedia("(orientation: landscape)").matches) {
          //setOrientation("horizontal");
          router.push("/app/productreview");
        }
      }
      window.addEventListener("resize", handleOrientationChange);
      handleOrientationChange();
      return () => {
        window.removeEventListener("resize", handleOrientationChange);
      };
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
          // router.push("/app/startuplist");
          router.push("/app/productreview");
          //router.push("/c/main");
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
          Please flip your screen to landscape (horizontally) for the best
          experience and in order to view the application. Thank you :)
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
