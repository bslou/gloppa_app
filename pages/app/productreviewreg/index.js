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
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const ProductReviewReg = () => {
  const [idd, setIdd] = useState("");
  const router = useRouter();
  const [startupName, setStartupName] = useState(null);
  const [tags, setTags] = useState([]);
  const [catchPhrase, setCatchPhrase] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState(null);
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [startups, setStartups] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const updateInfo = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setIdd(option);
    db.collection("startups")
      .doc(option)
      .get()
      .then((val) => {
        setWebsite(String(val.get("website")));
        setStartupName(String(val.get("startupName")));
        //add image later
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            if (!val.exists) return;
            let n = val.get("startups");
            // if (Object.keys(n).length == 0) {
            //   setLoading(false);
            //   return;
            // }
            n.reverse();
            if (n.length < 1) setLoading(false);
            n.forEach((document) => {
              db.collection("startups")
                .doc(document)
                .get()
                .then((res) => {
                  let startupName = String(res.get("startupName"));
                  let lvl = Math.floor(res.get("level") / 100) + 1;
                  if (lvl >= 2) {
                    if (res.get("productReviewId") == "") {
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
                  }
                });
            });
          });
      } else {
        router.push("/c/main");
      }
    }
  }, []);

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && tags.length < 3) {
      setTags([...tags, value]);
      event.target.value = "";
    }
  };

  const handleClose = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const submitProdReview = (e) => {
    e.preventDefault();
    if (startupName == null) {
      toast({
        title: "No startup selected",
        description: "There is no startup selected.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (tags.length < 1) {
      toast({
        title: "No hashtags",
        description: "You have to select hashtags.",
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
        if (val.get("productReviewId") == "") {
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

          db.collection("startups")
            .doc(idd)
            .get()
            .then((val) => {
              // let img = val.get("img");
              // if (img != "") {
              //   storage.ref(img).delete();
              // }
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
                  db.collection("productReview")
                    .add({
                      startupName: startupName,
                      startupId: idd,
                      owner: id,
                      catchPhrase: catchPhrase,
                      hashtags: [...tags],
                      likes: [],
                      comments: [],
                      website: website,
                      img: url,
                    })
                    .then(function (docRef) {
                      console.log("Document written with ID: ", docRef.id);
                      db.collection("users")
                        .doc(id)
                        .update({ productReviewStartupId: arrayUnion(idd) });
                      db.collection("startups")
                        .doc(idd)
                        .update({ productReviewId: docRef.id });
                      router.push("/app/productreview");
                    })
                    .catch(function (error) {
                      console.error("Error adding document: ", error);
                    });
                });
            });
        } else {
          toast({
            title: "Startup already exists",
            description: "Startup already exists for funding.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      });
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
      <form onKeyDown={onKeyDown} onSubmit={(e) => submitProdReview(e)}>
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
          paddingTop={8}
        >
          <Text
            color={"white"}
            textAlign={"center"}
            marginLeft={"2vw"}
            marginRight={"2vw"}
          >
            ⚠️ Note: You need to have at least a level 2 startup to be able to
            apply for funding.
          </Text>
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
              Product Review Post
            </Text>
          </Flex>
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
                width={100}
                height={100}
              />
            )}
          </Flex> */}
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
            <Select
              backgroundColor={"white"}
              value={startupName}
              onChange={(e) => updateInfo(e)}
              borderRadius={5}
              required
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
            gap={6}
            width={"50vw"}
          >
            <Text color={"white"} fontWeight={300} width={"15vw"}>
              Catch phrase:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              minLength={3}
              maxLength={75}
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
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
              Website:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              minLength={5}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
              Hashtags:
            </Text>

            <Input
              backgroundColor={"white"}
              placeholder="Press enter after inputing hashtag"
              onKeyDown={handleChange}
              maxLength={25}
              minLength={2}
            />
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
          >
            {tags.map((tag, index) => (
              <Tag
                alignItems={"center"}
                justifyContent={"center"}
                size={"lg"}
                borderRadius="full"
                variant="solid"
                colorScheme={"green"}
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton
                  onClick={(e) => {
                    handleClose(index);
                  }}
                />
              </Tag>
            ))}
          </Flex>
          <Button
            backgroundColor={"white"}
            fontWeight={300}
            fontSize={{ base: "8pt", md: "15pt", lg: "20pt" }}
            type={"submit"}
            width={"22vw"}
            height={"8vh"}
          >
            Post Product Review
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ProductReviewReg;
