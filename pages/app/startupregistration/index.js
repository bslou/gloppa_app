import {
  Button,
  Flex,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const StartupList = () => {
  const router = useRouter();

  const [startupName, setStartupName] = useState();
  const [foundedDate, setFoundedDate] = useState();
  const [startupLocation, setStartupLocation] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            if (!val.exists) return;
            if (typeof val.get("premium")[0] !== "undefined") {
              // does not exist
              if (val.get("premium")[0] == "fulltime") {
                // router.push("/app/startuplist");
              } else if (val.get("premium")[0] == "parttime") {
                const date1 = new Date(String(val.get("premium")[1]));
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + "/" + dd + "/" + yyyy;
                const date2 = new Date(String(today));
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays <= 31) {
                  // router.push("/app/startuplist");
                } else {
                  router.push("/app/pricing");
                }
              }
            }
          });
      } else {
        router.push("/c/main");
      }
    }
  });

  const submitStartup = (e) => {
    e.preventDefault();
    let id = localStorage.getItem("id");

    db.collection("startups")
      .add({
        startupName: startupName,
        owner: id,
        foundedDate: foundedDate,
        startupLocation: startupLocation,
        description: description,
        level: 0,
        coins: 0,
        accessories: [0],
        selectedAccessory: 0,
        factoryCoinsDate: "",
        people: {},
        tasks: {},
        brainstorm: {},
        completed: {},
        //completedTasks: {},
        //completedBrainstorm: {},
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        db.collection("users")
          .doc(id)
          .update({ startups: arrayUnion(docRef.id) });
        router.push("/app/" + docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;

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
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <form onSubmit={(e) => submitStartup(e)}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={4}
          backgroundColor={"#1C1C1C"}
          width={"60vw"}
          maxHeight={"91.6vh"}
          minHeight={"91.6vh"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingTop={14}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            position={"absolute"}
            top={{ base: 7, lg: 4 }}
          >
            <Text
              textShadow={"0px 4px 1px rgba(0,0,0,1)"}
              fontWeight={800}
              color={"white"}
              fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
            >
              Startups
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"white"} fontWeight={300} width={"15vw"}>
              Startup Name:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              onChange={(e) => {
                setStartupName(e.target.value);
              }}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"white"} fontWeight={300} width={"15vw"}>
              Founded Date:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              type={"date"}
              max={maxDate}
              onChange={(e) => {
                setFoundedDate(e.target.value);
              }}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"white"} fontWeight={300} width={"15vw"}>
              Startup Location:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              onChange={(e) => {
                setStartupLocation(e.target.value);
              }}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"white"} fontWeight={300} width={"15vw"}>
              Description:
            </Text>
            <Textarea
              backgroundColor={"white"}
              borderRadius={5}
              maxHeight={"45vh"}
              minHeight={"35vh"}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Flex>
          <Button
            backgroundColor={"white"}
            fontWeight={300}
            fontSize={"25pt"}
            type={"submit"}
            width={"22vw"}
            height={"8vh"}
          >
            Register Startup
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default StartupList;
