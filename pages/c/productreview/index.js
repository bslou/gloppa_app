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
import ProdRevComponent from "./prodrevcomponent";
import MyLoadingScreen from "./myloadingscreen";
import NavBar from "../navbar";

const ProductReview = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [prodRev, setProdRev] = useState([]);
  const [boostRev, setBoostRev] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (db && router) {
        db.collection("productReview").onSnapshot((yal) => {
          console.log("Length + " + Object.keys(yal).length);
          if (Object.keys(yal).length < 3) {
            setLoading(false);
          }
          console.log("like");

          setProdRev([]);
          setBoostRev([]);
          yal.forEach(function (doc) {
            let stid = doc.data().startupId;
            let cathp = doc.data().catchPhrase;
            let commentss = Object.values(doc.data().comments);
            let likess = Object.values(doc.data().likes);
            let title = doc.data().startupName;
            let hashtags = Object.values(doc.data().hashtags);
            let website = doc.data().website;
            let img = doc.data().img;

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
                      if (dat.boost[0] == "yes" && diffDays <= dat.boost[2]) {
                        setBoostRev((prevRows) => [
                          ...prevRows,
                          ProdRevComponent(
                            doc.id,
                            stid,
                            website,
                            img,
                            title,
                            cathp,
                            hashtags,
                            commentss,
                            likess,
                            router
                          ),
                        ]);
                        setLoading(false);
                      } else {
                        setProdRev((prevRows) => [
                          ...prevRows,
                          ProdRevComponent(
                            doc.id,
                            stid,
                            website,
                            img,
                            title,
                            cathp,
                            hashtags,
                            commentss,
                            likess,
                            router
                          ),
                        ]);
                        setLoading(false);
                      }
                    } else {
                      setProdRev((prevRows) => [
                        ...prevRows,
                        ProdRevComponent(
                          doc.id,
                          stid,
                          website,
                          img,
                          title,
                          cathp,
                          hashtags,
                          commentss,
                          likess,
                          router
                        ),
                      ]);
                      setLoading(false);
                    }
                  });
              });
          });
        });
      }
    }
  }, [db, router]);

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
          backgroundColor={"#1c1c1c"}
          height={"90%"}
          width={"65vw"}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          marginTop={5}
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
              Product Review
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            alignItems={"center"}
            gap={"2vh"}
            width={"100%"}
            overflowY={"scroll"}
            paddingTop={10}
          >
            {boostRev}
            {prodRev}
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default ProductReview;
