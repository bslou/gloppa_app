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
import { isMobile } from "react-device-detect";
import { auth, db, storage } from "../../api/firebaseconfig";
import { arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

const JobsReg = () => {
  const [idd, setIdd] = useState("");
  const router = useRouter();
  const [startupName, setStartupName] = useState(null);
  const [tagline, setTagline] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [categories, setCategories] = useState("Engineering");
  const [location, setLocation] = useState("");
  const [linkjob, setLinkjob] = useState("");
  const [contactemail, setContactemail] = useState("");
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [startups, setStartups] = useState([]);

  const updateInfo = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setIdd(option);
    db.collection("startups")
      .doc(option)
      .get()
      .then((val) => {
        setStartupName(String(val.get("startupName")));
        //add image later
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMobile) {
        function handleOrientationChange() {
          if (window.matchMedia("(orientation: portrait)").matches) {
            //setOrientation("vertical");
            router.push("/");
          }
        }
        window.addEventListener("resize", handleOrientationChange);
        handleOrientationChange();
        return () => {
          window.removeEventListener("resize", handleOrientationChange);
        };
      }
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
                  let jobs = res.get("jobs");
                  if (/*lvl >= 4 &&*/ jobs.length < 2) {
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

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const RegJob = (e) => {
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
        if (val.get("jobs").length < 2) {
          if (!isValidHttpUrl(linkjob)) {
            toast({
              title: "Invalid website",
              description: "Make sure the url http/https and an extension",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          storage
            .ref(val.get("img"))
            .getDownloadURL()
            .then((url) => {
              db.collection("jobs")
                .add({
                  startupName: startupName,
                  tagline: tagline,
                  jobtitle: jobtitle,
                  category: categories,
                  location: location,
                  linkjob: linkjob,
                  contactemail: contactemail,
                  startupId: idd,
                  img: url,
                  timestamp: serverTimestamp(),
                })
                .then(function (docRef) {
                  console.log("Document written with ID: ", docRef.id);
                  db.collection("users")
                    .doc(id)
                    .update({ jobs: arrayUnion(idd) });
                  db.collection("startups")
                    .doc(idd)
                    .update({ jobs: arrayUnion(docRef.id) });
                  router.push("/app/jobs");
                })
                .catch(function (error) {
                  console.error("Error adding document: ", error);
                });
            });
        } else {
          toast({
            title: "Over job limit",
            description: "Posted too many job positions.",
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
      <form onSubmit={(e) => RegJob(e)}>
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
              marginLeft={"2vw"}
              marginRight={"2vw"}
            >
              ⚠️ Note: You need to have at least a level 4 startup to be able to
              apply for funding. 2 job posts max!
            </Text> */}

          <Text
            fontWeight={300}
            color={"black"}
            fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
          >
            Jobs Post
          </Text>

          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Company Name:
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
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Company Tagline:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              required
              minLength={3}
              maxLength={75}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
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
              Job Title:
            </Text>
            <Input
              backgroundColor={"white"}
              borderRadius={5}
              minLength={3}
              value={jobtitle}
              onChange={(e) => setJobtitle(e.target.value)}
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
              Categories:
            </Text>

            <Select
              required
              backgroundColor={"white"}
              onChange={(e) => {
                setCategories(e.target.value);
              }}
            >
              <option value={"Engineering"}>Engineering</option>
              <option value={"Design"}>Design</option>
              <option value={"Marketing"}>Marketing</option>
              <option value={"Sales"}>Sales</option>
              <option value={"Customer Support"}>Customer Support</option>
              <option value={"Product"}>Product</option>
              <option value={"Other"}>Other</option>
            </Select>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={6}
            width={"50vw"}
          >
            <Text color={"black"} fontWeight={300} width={"15vw"}>
              Location:
            </Text>
            <Input
              required
              backgroundColor={"white"}
              borderRadius={5}
              minLength={2}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder={
                "Separate multiple locations with commas | Say remote if remote"
              }
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
              Link to the job description:
            </Text>
            <Input
              required
              backgroundColor={"white"}
              borderRadius={5}
              minLength={5}
              placeholder={"https://"}
              value={linkjob}
              onChange={(e) => setLinkjob(e.target.value)}
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
              Contact email:
            </Text>
            <Input
              type={"email"}
              required
              backgroundColor={"white"}
              borderRadius={5}
              minLength={5}
              value={contactemail}
              onChange={(e) => setContactemail(e.target.value)}
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
            Post Job Position
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default JobsReg;
