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
import FundingComponent from "./fundingcomponent";
import Router, { useRouter } from "next/router";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";

const Funding = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [funds, setFunds] = useState([]);
  const [boost, setBoost] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        const tempSetBoostRev = [];
        const tempSetFundRev = [];
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            let n = val.get("startups");
            n.reverse();
            if (n.length < 1) setLoading(false);
            db.collection("funding")
              .orderBy("timestamp", "desc")
              .onSnapshot((val) => {
                setFunds([]);
                val.forEach(function (doc) {
                  let des = doc.data().description;
                  let email = doc.data().email;
                  let stid = doc.data().startupId;
                  let equity = doc.data().investment[0];
                  let price = doc.data().investment[1];
                  let name = doc.data().startupName;
                  let foundedDate = doc.data().foundedDate;
                  let website = doc.data().website;
                  let img = doc.data().img;

                  if (n != []) {
                    let to = false;
                    if (n.includes(stid)) {
                      to = true;
                    } else {
                      to = false;
                    }
                    db.collection("startups")
                      .doc(stid)
                      .onSnapshot((val2) => {
                        let dot = val2.data();
                        db.collection("users")
                          .doc(dot.owner)
                          .onSnapshot((val3) => {
                            let dat = val3.data();
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, "0");
                            var mm = String(today.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); //January is 0!
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
                                tempSetBoostRev.push(
                                  FundingComponent(
                                    img,
                                    name,
                                    [equity, price],
                                    des,
                                    email,
                                    foundedDate,
                                    website,
                                    to,
                                    doc.id,
                                    stid,
                                    toast
                                  )
                                );
                                setBoost(tempSetBoostRev);
                              } else {
                                tempSetFundRev.push(
                                  FundingComponent(
                                    img,
                                    name,
                                    [equity, price],
                                    des,
                                    email,
                                    foundedDate,
                                    website,
                                    to,
                                    doc.id,
                                    stid,
                                    toast
                                  )
                                );
                                setFunds(tempSetFundRev);
                              }
                            } else {
                              tempSetFundRev.push(
                                FundingComponent(
                                  img,
                                  name,
                                  [equity, price],
                                  des,
                                  email,
                                  foundedDate,
                                  website,
                                  to,
                                  doc.id,
                                  stid,
                                  toast
                                )
                              );
                              setFunds(tempSetFundRev);
                            }
                          });
                      });
                    setFunds((prevProd) => [...prevProd, ...boost]);
                    setLoading(false);
                  }
                });
                setLoading(false);
              });
          });
      } else {
        router.push("/c/main");
      }
    }
  }, [router, db]);

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  if (loading) {
    return <MyLoadingScreen />;
  }

  if (!loading) {
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
          height={"90vh"}
          width={"65vw"}
          backgroundColor={"#1C1c1c"}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          paddingTop={10}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}
            top={{ base: "5vh", md: "4.5vh", lg: "4vh" }}
          >
            <Text
              color={"white"}
              fontWeight={700}
              fontSize={{ base: "30pt", md: "35pt", lg: "40pt" }}
              textShadow={"0px 4px 1px rgba(0,0,0,0.6)"}
            >
              Funding
            </Text>
            <Tooltip
              label={"Add startup to public funding!"}
              aria-label="A tooltip"
            >
              <Button
                colorScheme="transparent"
                onClick={() => router.push("/app/fundingregistration")}
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
          >
            {/* <Text
              color={"white"}
              textAlign={"center"}
              fontSize={{ base: "9pt", md: "10.5pt", lg: "12pt" }}
              marginLeft={"5vw"}
              marginRight={"5vw"}
            >
              ⚠️ Note: You need to have at least a level 3 startup to be able to
              apply for funding.
            </Text> */}
            {boost}
            {
              //funds.length > 0 ? (
              funds
              // ) : (
              //   <Flex
              //     direction={"column"}
              //     alignItems={"center"}
              //     justifyContent={"center"}
              //     width={"90%"}
              //     height={"90%"}
              //   >
              //     <Image
              //       src={"/assets/nodata.png"}
              //       alt={"No data"}
              //       width={400}
              //       height={400}
              //     />
              //     <Text color={"white"} textAlign={"center"} fontSize={"25pt"}>
              //       No funding <br />
              //       found here yet... 😔
              //     </Text>
              //   </Flex>
              //)
            }
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default Funding;
