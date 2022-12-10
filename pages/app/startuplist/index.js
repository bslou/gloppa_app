import {
  Button,
  Flex,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import StartupComponent from "./startupcomponent";
import MyLoadingScreen from "./myloadingscreen";

const StartupList = () => {
  const router = useRouter();

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);

  const fetchData = () => {
    let id = localStorage.getItem("id");
    db.collection("users")
      .doc(id)
      .get()
      .then((val) => {
        if (!val.exists) {
          setLoading(false);
          return;
        }
        if (rows.length > 0) {
          setLoading(false);
          return;
        }
        let n = val.get("startups");
        n.reverse();
        n.forEach((document) => {
          db.collection("startups")
            .doc(document)
            .get()
            .then((res) => {
              let startupName = String(res.get("startupName"));
              let lvl = String(res.get("level"));
              let img = "/assets/spacer.png";
              console.log(
                "Name " + startupName + " Level " + lvl + " Image " + img
              );
              setRows((prevRows) => [
                ...prevRows,
                StartupComponent(img, lvl, startupName, String(document)),
              ]);
              setLoading(false);
            });
        });
      });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  if (loading) {
    return <MyLoadingScreen />;
  }

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

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
        paddingLeft={7}
        paddingRight={4}
        paddingTop={5}
        width={"100vw"}
      >
        <NextLink href={"/app/startuplist"}>
          <Link color={"white"} fontWeight={600} fontSize={"20pt"}>
            Gloppa
          </Link>
        </NextLink>
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
            <MenuItem>Update Info</MenuItem>
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        gap={0}
        backgroundColor={"#1C1C1C"}
        width={"55vw"}
        maxHeight={"90vh"}
        minHeight={"90vh"}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        paddingTop={10}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          position={"absolute"}
          top={{ base: 7, lg: 4 }}
        >
          <Text
            textShadow={"0px 4px 1px rgba(255,255,255,0.6)"}
            fontWeight={800}
            color={"white"}
            fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
          >
            Startups
          </Text>
          <Button
            colorScheme="transparent"
            onClick={() => router.push("/app/startupregistration")}
          >
            <Image
              src={"/assets/plus.png"}
              alt={"Gloppa plus"}
              width={30}
              height={30}
            />
          </Button>
        </Flex>
        <Flex
          width={"100%"}
          height={"100%"}
          overflowY={"scroll"}
          direction={"column"}
          alignItems={"center"}
        >
          {rows.length < 1 ? (
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"90%"}
              height={"90%"}
            >
              <Image
                src={"/assets/nodata.png"}
                alt={"No data"}
                width={400}
                height={400}
              />
              <Text color={"white"} textAlign={"center"} fontSize={"25pt"}>
                No startups <br />
                found here... 😔
              </Text>
            </Flex>
          ) : (
            rows
          )}
          {/* {StartupComponent("/assets/spacer.png", "13", "DreamMate")}
          {StartupComponent("/assets/spacer.png", "13", "Krunker")}
          {StartupComponent("/assets/spacer.png", "13", "Lol")}
          {StartupComponent("/assets/spacer.png", "13", "Gloppa")} */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StartupList;
