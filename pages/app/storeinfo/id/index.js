import Router, { useRouter } from "next/router";
import { auth, db } from "../../../api/firebaseconfig";
import { useEffect, useState } from "react";
import MyLoadingScreen from "./myloadingscreen";
import { increment } from "firebase/firestore";
import { Toast, useToast } from "@chakra-ui/react";

const ProcessPayment = () => {
  const PRICE = 10;
  const toast = useToast();
  useEffect(() => {
    let id = localStorage.getItem("id");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    // db.collection("users")
    //   .doc(id)
    //   .update({ premium: ["parttime", today] });
    db.collection("users")
      .doc(id)
      .update({ boost: ["yes", today, 31] });
    db.collection("users")
      .doc(id)
      .get()
      .then((val) => {
        let startups = Object.values(val.get("startups"));
        console.log(typeof startups);
        console.log(startups);
        if (startups.length > 0) {
          startups.forEach(function (startup) {
            db.collection("startups")
              .doc(startup)
              .update({ coins: increment(1000) });
            db.collection("startups")
              .doc(startup)
              .update({ level: increment(100) });
          });
          Router.push("/app/boost/monthlyofficialactivation");
          toast({
            title: "Perks received",
            description:
              "All of your startups received extra perks such as coins, level, and product boost.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          Router.push("/app/boost/monthlyofficialactivation");
          toast({
            title: "Perks received",
            description:
              "All of your startups will receive extra perks such as product boost.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  }, []);

  return <MyLoadingScreen />;
};

export default ProcessPayment;
