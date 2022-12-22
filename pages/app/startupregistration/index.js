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
import { auth, db, storage } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const StartupRegistration = () => {
  const router = useRouter();

  const [startupName, setStartupName] = useState();
  const [foundedDate, setFoundedDate] = useState();
  const [startupLocation, setStartupLocation] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") === null) {
        // db.collection("users")
        //   .doc(localStorage.getItem("id"))
        //   .get()
        //   .then((val) => {
        //     if (!val.exists) return;
        //     if (typeof val.get("premium")[0] !== "undefined") {
        //       // does not exist
        //       if (val.get("premium")[0] == "fulltime") {
        //         // router.push("/app/startuplist");
        //       } else if (val.get("premium")[0] == "parttime") {
        //         const date1 = new Date(String(val.get("premium")[1]));
        //         var today = new Date();
        //         var dd = String(today.getDate()).padStart(2, "0");
        //         var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        //         var yyyy = today.getFullYear();

        //         today = mm + "/" + dd + "/" + yyyy;
        // const date2 = new Date(String(today));
        // const diffTime = Math.abs(date2 - date1);
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // if (diffDays <= 31) {
        //router.push("/app/startuplist");
        // } else {
        //   router.push("/app/pricing");
        // }
        //         }
        //       }
        //     });
        // } else {
        router.push("/");
      }
    }
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const submitStartup = (e) => {
    e.preventDefault();

    if (image == null) {
      return;
    }
    let id = localStorage.getItem("id");
    const url = URL.createObjectURL(image);
    const imgname = image.name;

    storage
      .ref(`/images/${imgname}`)
      .put(image)
      .then(() => {
        console.log("Process was successful");
      })
      .catch((err) => {
        console.log("Error " + err);
      });

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
        tasks: [],
        brainstorm: [],
        completed: {},
        fundingId: "",
        productReviewId: "",
        website: "",
        boost: [],
        jobs: [],
        img: `/images/${imgname}`,
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
          <Button colorScheme={"transparent"} onClick={() => router.back()}>
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
      <form onSubmit={(e) => submitStartup(e)}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={4}
          backgroundColor={"#1C1C1C"}
          width={"60vw"}
          maxHeight={"90vh"}
          minHeight={"90vh"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingTop={7}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            position={"absolute"}
            top={{ base: "5.5vh", md: "4.5vh", lg: "4vh" }}
          >
            <Text
              textShadow={"0px 4px 1px rgba(0,0,0,1)"}
              fontWeight={800}
              color={"white"}
              fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
            >
              Startup
            </Text>
          </Flex>
          <Flex>
            <Button
              borderRadius="50%"
              backgroundColor="#ccc"
              width={75}
              height={75}
              fontSize="8pt"
            >
              <Input
                type={"file"}
                width={"100%"}
                height={"100%"}
                position={"absolute"}
                opacity={0}
                onChange={handleImageChange}
                accept="image/png, image/gif, image/jpeg"
                required
              />
              Select Logo
            </Button>
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={75}
                height={75}
              />
            )}
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
              minLength={2}
              maxLength={18}
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
              minLength={3}
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
              minLength={3}
              maxLength={150}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Flex>
          <Button
            backgroundColor={"white"}
            fontWeight={300}
            fontSize={{ base: "11pt", md: "17pt", lg: "25pt" }}
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

export default StartupRegistration;
