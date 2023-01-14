import {
  Button,
  Flex,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../api/firebaseconfig";
import { saveAs } from "file-saver";
import NavBar from "../navbar";

const RecordPitch = () => {
  const router = useRouter();

  const [oguname, setOgUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const videoRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };
  const changeData = (e) => {
    e.preventDefault();
    let nummers = db.collection("users").where("username", "==", uname);
    nummers
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty && uname != oguname) {
          toast({
            title: "Username exists.",
            description: "The username already exists in our database.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.log("Doesn't exist!");
          let id = localStorage.getItem("id");
          db.collection("users").doc(id).update({ username: uname });
          toast({
            title: "Username updated.",
            description: "The username got updated successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setRecorder(new MediaRecorder(stream));
        videoRef.current.srcObject = stream;
      });
    if (typeof window !== "undefined") {
      return () => {
        window.location.reload();
      };
      if (localStorage.getItem("id") === null) {
        router.push("/");
        return;
      } else {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .onSnapshot((val) => {
            let n = val.data();
            setUname(n.username);
            setOgUname(n.username);
            setEmail(n.email);
          });
      }
    }
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    recorder.start();
    // recorder.ondataavailable = (e) => {
    //   if (e.data.size > 0) {
    //     setDownloadURL(URL.createObjectURL(e.data));
    //   }
    // };
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (recorder.state === "recording") {
      recorder.stop();
      //   const videoBlob = recorder.getBlob();
      //   setDownloadURL(URL.createObjectURL(videoBlob));

      const videoBlob = await new Promise((resolve) => {
        recorder.ondataavailable = (e) => {
          resolve(e.data);
        };
      });
      const file = new File([videoBlob], "fundingpitch.webm", {
        type: "video/webm",
      });
      saveAs(file);

      //   const formData = new FormData();
      //   formData.append("video", videoBlob);

      //   try {
      //     const res = await fetch("/api/upload-video", {
      //       method: "POST",
      //       body: formData,
      //     });

      //     // handle the server-side response
      //   } catch (err) {
      //     // handle the error
      //   }
    }
  };

  // if (loading) {
  //   return <MyLoadingScreen />;
  // }

  // if (!loading) {
  return (
    <Flex
      direction={"column"}
      backgroundColor={"#f2f2f2"}
      width={"100vw"}
      height={"100vh"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#fff"}>
          <ModalHeader color={"black"}>My info</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody>
            <form onSubmit={changeData}>
              <Flex direction={"column"} alignItems={"center"} gap={"1vh"}>
                <Flex
                  width={"95%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"0.3vw"}
                >
                  <Text color={"black"}>Username: </Text>
                  <Input
                    color={"black"}
                    value={uname}
                    onChange={(e) => setUname(e.target.value.toLowerCase())}
                    minLength={4}
                    maxLength={12}
                  />
                </Flex>
                <Flex
                  width={"95%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"0.3vw"}
                >
                  <Text color={"black"}>Email: </Text>
                  <Input
                    color={"black"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  />
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"1vw"}
                  marginTop={3}
                  marginBottom={3}
                >
                  <Button type="submit" colorScheme={"blue"}>
                    Change Information
                  </Button>
                  <Button
                    variant={"ghost"}
                    color={"black"}
                    colorScheme={"transparent"}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Flex>
                <Button onClick={Logout}>Logout</Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"#fff"}
        borderBottom={"1px solid #dfdfdf"}
        padding={"1vw"}
        paddingLeft={200}
      >
        <Button
          border={"none"}
          background={"transparent"}
          fontSize={"13pt"}
          fontWeight={600}
          color={"#202020"}
          colorScheme={"transparent"}
        >
          {/* 📦&nbsp;&nbsp;Product Review */}
          ⏺️&nbsp;&nbsp;Record Funding Pitch
        </Button>
        {/* <Button
          border={"none"}
          _hover={{
            backgroundColor: "#efefef",
          }}
          fontSize={"25pt"}
          fontWeight={100}
          color={"#202020"}
          colorScheme={"transparent"}
          onClick={() => router.push("/app/startupregistration")}
        >
          +
        </Button> */}
      </Flex>
      <Flex
        position={"fixed"}
        direction={"column"}
        alignItems={"flex-start"}
        backgroundColor={"#fff"}
        borderRight={"1px solid #dfdfdf"}
        height={"100vh"}
        width={200}
        gap={30}
        paddingTop={"3vh"}
        paddingBottom={"3vh"}
      >
        <Button
          border={"none"}
          background={"transparent"}
          fontSize={"13pt"}
          fontWeight={600}
          color={"#202020"}
          colorScheme={"transparent"}
          onClick={() => router.push("/app/startuplist")}
        >
          Gloppa
        </Button>
        <Flex direction={"column"} width={"100%"} gap={2}>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/productreview")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              📦&nbsp;&nbsp;Product Review
            </Text>
          </Button>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/updatereview")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              🆕&nbsp;&nbsp;Update Review
            </Text>
          </Button>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/funding")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              💸&nbsp;&nbsp;Funding
            </Text>
          </Button>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/jobs")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              💻&nbsp;&nbsp;Jobs
            </Text>
          </Button>
        </Flex>
        <Flex direction={"column"} width={"100%"} gap={2}>
          <Button
            backgroundColor="#efefef"
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/fundingcam")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              ⏺️&nbsp;&nbsp;Record Funding Pitch
            </Text>
          </Button>
        </Flex>
        <Flex direction={"column"} width={"100%"} gap={2}>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/messages")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              💬&nbsp;&nbsp;Private Messages
            </Text>
          </Button>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/forum")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              📢&nbsp;&nbsp;Public Forum
            </Text>
          </Button>
        </Flex>
        <Flex direction={"column"} width={"100%"} gap={2}>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={() => router.push("/app/education")}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              🎥&nbsp;&nbsp;Educational Videos
            </Text>
          </Button>
          <Button
            background={"transparent"}
            border={"none"}
            colorScheme={"transparent"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            paddingLeft={"1.25vw"}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={0}
            _hover={{
              backgroundColor: "#efefef",
              cursor: "pointer",
            }}
            onClick={onOpen}
          >
            <Text color={"#474747"} fontSize="11pt" fontWeight={400}>
              👤&nbsp;&nbsp;Profile
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Flex
        position={"absolute"}
        direction={"column"}
        alignItems={"center"}
        paddingTop={5}
        paddingBottom={5}
        marginLeft={{ base: 150, md: 175, lg: 250 }}
        width={"80%"}
        top={{ base: 45, md: 53, lg: 61 }}
        gap={3}
      >
        {/**Put code here */}
        <>
          <video ref={videoRef} autoPlay /*playsInline*/ controls={false} />
          {isRecording ? (
            <Tooltip label="Stop Recording">
              <Button
                colorScheme={"transparent"}
                onClick={stopRecording}
                color={"black"}
                position={"absolute"}
                top={420}
              >
                <img
                  src="/assets/stoprec.png"
                  width={70}
                  height={70}
                  alt={"Recording"}
                />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip label="Start Recording">
              <Button
                colorScheme={"transparent"}
                onClick={startRecording}
                color={"black"}
                position={"absolute"}
                top={420}
              >
                <img
                  src="/assets/startrec.png"
                  width={95}
                  height={95}
                  alt={"Recording"}
                />
              </Button>
            </Tooltip>
          )}
          {isRecording ? (
            <Text fontSize={"18pt"}>😊 Recording in progress...</Text>
          ) : (
            <Text fontSize={"18pt"}>🤨 Not recording...</Text>
          )}
        </>
      </Flex>
    </Flex>
  );
};
//   };

export default RecordPitch;
