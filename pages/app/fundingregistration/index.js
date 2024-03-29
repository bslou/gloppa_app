import {
  Button,
  Flex,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";
import { isMobile } from "react-device-detect";

const FundingRegistration = () => {
  const router = useRouter();

  const toast = useToast();

  const [loading, setLoading] = useState(true);

  const [idd, setIdd] = useState("");
  const [startups, setStartups] = useState([]);
  const [startupName, setStartupName] = useState(null);
  const [foundedDate, setFoundedDate] = useState();
  const [website, setWebsite] = useState();
  const [eml, setEml] = useState();
  const [price, setPrice] = useState();
  const [equity, setEquity] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .onSnapshot((snapshot) => {
            //setEml(data.email);
            const data = snapshot.data();
            let n = data.startups;
            //console.log(Object.keys(n).length);
            if (Object.keys(n).length == 0) {
              setLoading(false);
              return;
            }
            n.reverse();
            if (n.length < 1) setLoading(false);
            n.forEach((document) => {
              db.collection("startups")
                .doc(document)
                .get()
                .then((res) => {
                  let startupName = String(res.get("startupName"));
                  let lvl = Math.floor(res.get("level") / 100) + 1;
                  // if (lvl >= 3) {
                  if (res.get("fundingId") == "") {
                    console.log(String(document));
                    setStartups((prevStartups) => [
                      ...prevStartups,
                      <option
                        value={res.get("startupName")}
                        id={String(document)}
                      >
                        {res.get("startupName")}
                      </option>,
                    ]);
                  }
                  //}
                });
            });
          });
      } else {
        router.push("/c/main");
      }
    }
  }, []);

  const updateInfo = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setIdd(option);
    db.collection("startups")
      .doc(option)
      .get()
      .then((val) => {
        setDescription(String(val.get("description")));
        setStartupName(String(val.get("startupName")));
        setFoundedDate(String(val.get("foundedDate")));
      });
  };

  const submitFund = (e) => {
    e.preventDefault();
    if (startupName == null) {
      toast({
        title: "No company selected",
        description: "There is no company selected.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    let id = localStorage.getItem("id");
    db.collection("startups")
      .doc(idd)
      .get()
      .then((val) => {
        if (val.get("fundingId") == "") {
          // if (image == null) {
          //   return;
          // }

          if (!isValidHttpUrl(website)) {
            toast({
              title: "Invalid website",
              description: "Make sure the url http/https and an extension",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          // const url = URL.createObjectURL(image);
          // const imgname = image.name;

          // console.log(image);

          // db.collection("startups")
          //   .doc(idd)
          //   .get()
          //   .then((val) => {
          // let img = val.get("img");
          // if (img != "") {
          //   storage.ref(img).delete();
          // }
          db.collection("startups")
            .doc(idd)
            .update({ foundedDate: foundedDate });
          // db.collection("startups")
          //   .doc(idd)
          //   .update({ description: description });

          // storage
          //   .ref(`/images/${imgname}`)
          //   .put(image)
          //   .then(() => {
          //     console.log("Process was successful");
          //   })
          //   .catch((err) => {
          //     console.log("Error " + err);
          //   });

          // db.collection("startups")
          //   .doc(idd)
          //   .update({ img: `/images/${imgname}` });
          db.collection("startups").doc(idd).update({ website: website });

          storage
            .ref(val.get("img"))
            .getDownloadURL()
            .then((url) => {
              db.collection("funding")
                .add({
                  startupName: startupName,
                  startupId: idd,
                  owner: id,
                  description: description,
                  investment: [parseInt(equity), parseInt(price)],
                  email: eml,
                  website: website,
                  foundedDate: foundedDate,
                  img: url,
                  timestamp: serverTimestamp(),
                })
                .then(function (docRef) {
                  console.log("Document written with ID: ", docRef.id);
                  db.collection("users")
                    .doc(id)
                    .update({ fundingStartupId: arrayUnion(idd) });
                  db.collection("startups")
                    .doc(idd)
                    .update({ fundingId: docRef.id });
                  router.push("/app/funding");
                })
                .catch(function (error) {
                  console.error("Error adding document: ", error);
                });
            });
          // });
        } else {
          toast({
            title: "Company already exists",
            description: "Company already exists for funding.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
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
      height={!isMobile ? "100vh" : "100%"}
      backgroundColor={"#f2f2f2"}
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
            <Link color={"black"}>
              <img
                style={{ filter: "brightness(0)" }}
                src={"/assets/back.png"}
                alt={"Back"}
                width={60}
                height={60}
              />
            </Link>
          </Button>
        </Flex>
        {/* <Menu>
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
          </Menu> */}
      </Flex>
      <form onSubmit={(e) => submitFund(e)}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          backgroundColor={"#fff"}
          width={"60vw"}
          gap={2}
          borderTopLeftRadius={2}
          borderTopRightRadius={2}
          boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          paddingTop={1}
          paddingBottom={3}
        >
          {/* <Text
              color={"white"}
              textAlign={"center"}
              fontSize={{ base: "9pt", md: "10.5pt", lg: "12pt" }}
              marginLeft={"2vw"}
              marginRight={"2vw"}
            >
              ⚠️ Note: You need to have at least a level 3 startup to be able to
              apply for funding.
            </Text> */}

          <Text
            fontWeight={300}
            color={"black"}
            fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
          >
            Funding Post
          </Text>
          {/* <Flex>
              <Button
                borderRadius="50%"
                backgroundColor="#ccc"
                width={100}
                height={100}
                fontSize="11pt"
              >
                <Input
                  type={"file"}
                  width={"100%"}
                  height={"100%"}
                  position={"absolute"}
                  opacity={0}
                  onChange={handleChange}
                  accept="image/png, image/gif, image/jpeg"
                  required
                />
                Select Logo
              </Button>
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  width={100}
                  height={100}
                />
              )}
            </Flex> */}
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"50vw"}
            gap={6}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Company Name:
            </Text>
            <Select
              backgroundColor={"white"}
              borderRadius={5}
              required
              minLength={2}
              maxLength={18}
              value={startupName}
              onChange={(e) => updateInfo(e)}
            >
              <option disabled selected value>
                {" "}
                - select option -{" "}
              </option>
              {startups}
            </Select>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"50vw"}
            gap={6}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Founded Date:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              type={"date"}
              max={maxDate}
              value={foundedDate}
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
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Website:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              minLength={3}
              placeholder={"https://"}
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
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
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Email:
            </Text>
            <Input
              type={"email"}
              backgroundColor={"white"}
              borderRadius={5}
              required
              minLength={3}
              value={eml}
              onChange={(e) => {
                setEml(e.target.value);
              }}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"50vw"}
            gap={6}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Price:
            </Text>
            <Input
              type={"number"}
              backgroundColor={"white"}
              borderRadius={5}
              required
              min={100}
              max={1000000000000}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"50vw"}
            gap={6}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Equity percentage:
            </Text>
            <Input
              type={"number"}
              backgroundColor={"white"}
              borderRadius={5}
              required
              min={0}
              max={100}
              value={equity}
              onChange={(e) => {
                setEquity(e.target.value);
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
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Description:
            </Text>
            <Textarea
              backgroundColor={"white"}
              borderRadius={5}
              height={"18vh"}
              resize={"none"}
              required
              value={description}
              minLength={3}
              maxLength={150}
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
            height={"8vh"}
            border={"none"}
            boxShadow={"0 2px 5px rgba(0, 0, 0, 0.5)"}
          >
            Register for Funds
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default FundingRegistration;
