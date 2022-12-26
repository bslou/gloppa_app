import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../api/firebaseconfig";
import Router, { useRouter } from "next/router";
import JobsComponent from "./jobscomponent";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";

const Jobs = () => {
  //figure out loading situation, it is strange af
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const [jobs, setJobs] = useState([]);
  const [boost, setBoost] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      router.push("/");
      return;
    } else {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .get()
        .then((val) => {
          let n = val.get("startups");
          n.reverse();
          if (n.length < 1) setLoading(false);
          db.collection("jobs")
            .get()
            .then((val2) => {
              setJobs([]);
              setBoost([]);
              if (Object.keys(val2).length < 1) {
                setLoading(false);
              }
              val2.forEach(function (doc) {
                let category = doc.data().category;
                let contactemail = doc.data().contactemail;
                let jobtitle = doc.data().jobtitle;
                let linkjob = doc.data().linkjob;
                let location = doc.data().location;
                let name = doc.data().startupName;
                let tagline = doc.data().tagline;
                let img = doc.data().img;
                let mine = false;
                if (val.get("startups").includes(doc.data().startupId)) {
                  mine = true;
                } else {
                  mine = false;
                }
                db.collection("startups")
                  .doc(doc.data().startupId)
                  .onSnapshot((val2) => {
                    let dot = val2.data();
                    db.collection("users")
                      .doc(dot.owner)
                      .onSnapshot((val3) => {
                        let dat = val3.data();
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, "0");
                        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                        var yyyy = today.getFullYear();
                        today = mm + "/" + dd + "/" + yyyy;

                        if (dat.boost !== undefined) {
                          const date1 = new Date(String(dat.boost[1]));
                          const date2 = new Date(String(today));
                          const diffTime = Math.abs(date2 - date1);
                          const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                          );
                          if (
                            dat.boost[0] == "yes" &&
                            diffDays <= dat.boost[2]
                          ) {
                            const tempSetBoost = [];
                            tempSetBoost.push(
                              JobsComponent(
                                linkjob,
                                doc.id,
                                doc.data().startupId,
                                name,
                                jobtitle,
                                img,
                                location,
                                toast,
                                mine,
                                router
                              )
                            );
                            setBoost((prevBoost) =>
                              prevBoost.concat(tempSetBoost)
                            );
                          } else {
                            const tempSetJobs = [];
                            tempSetJobs.push(
                              JobsComponent(
                                linkjob,
                                doc.id,
                                doc.data().startupId,
                                name,
                                jobtitle,
                                img,
                                location,
                                toast,
                                mine,
                                router
                              )
                            );
                            setJobs((prevJobs) => prevJobs.concat(tempSetJobs));
                          }
                        } else {
                          const tempSetJobs = [];
                          tempSetJobs.push(
                            JobsComponent(
                              linkjob,
                              doc.id,
                              doc.data().startupId,
                              name,
                              jobtitle,
                              img,
                              location,
                              toast,
                              mine,
                              router
                            )
                          );
                          setJobs((prevJobs) => prevJobs.concat(tempSetJobs));
                        }
                      });
                  });
                setLoading(false);
              });
            });
        });
    }
  }, []);

  if (loading) {
    <MyLoadingScreen />;
  }

  // if (!loading) {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
      direction={"column"}
      alignItems={"center"}
    >
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        backgroundColor={"#1c1c1c"}
        height={"90%"}
        width={"65vw"}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          position={"absolute"}
          top={{ base: "5.5vh", md: "4.5vh", lg: "4vh" }}
        >
          <Text
            textShadow={"0px 4px 1px rgba(0,0,0,0.6)"}
            fontWeight={800}
            color={"white"}
            fontSize={{ base: "26pt", md: "33pt", lg: "40pt" }}
          >
            Jobs
          </Text>
          <Tooltip label={"Post job for review!"} aria-label="A tooltip">
            <Button
              colorScheme="transparent"
              onClick={() => router.push("/app/jobsreg")}
            >
              <Image
                src={"/assets/plus.png"}
                alt={"Gloppa plus"}
                width={30}
                height={30}
              />
            </Button>
          </Tooltip>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={"2vh"}
          width={"100%"}
          overflowY={"scroll"}
          paddingTop={10}
        >
          <Text
            color={"white"}
            textAlign={"center"}
            fontSize={{ base: "9pt", md: "10.5pt", lg: "12pt" }}
            marginLeft={"5vw"}
            marginRight={"5vw"}
          >
            ⚠️ Note: You need to have at least a level 4 startup to be able to
            <br />
            post a job. You can only post two available jobs per startup.
          </Text>
          {boost}
          {jobs}
        </Flex>
      </Flex>
    </Flex>
  );
};
//};

export default Jobs;
