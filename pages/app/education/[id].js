import {
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../navbar";
import YoutubeEmbed from "./YoutubeEmbed";

const Video = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };
  useEffect(() => {
    if (router.isReady) {
      let uid = router.query.id;
      setId(uid);
    }
  }, [router]);
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      direction={"column"}
      alignItems={"center"}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingLeft={3}
        paddingRight={4}
        paddingTop={5}
        width={"100vw"}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"2.5vw"}
        >
          <Button
            colorScheme={"transparent"}
            onClick={() => router.push("/app/education")}
          >
            <Link color={"white"}>
              <Image
                src={"/assets/back.png"}
                alt={"Back"}
                width={60}
                height={60}
              />
            </Link>
          </Button>
        </Flex>
        <Menu>
          <MenuButton colorScheme={"transparent"}>
            <Image
              src={"/assets/profile.png"}
              alt={"Gloppa profile"}
              width={50}
              height={50}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* <Flex
        direction={"column"}
        alignItems={"center"}
        height={"90vh"}
        width={"90vw"}
        backgroundColor={"#1C1c1c"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        paddingTop={10}
      >

      </Flex> */}
      <YoutubeEmbed embedId={id} />
    </Flex>
  );
};

export default Video;
