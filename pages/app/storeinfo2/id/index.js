import { Toast, useToast } from "@chakra-ui/react";
import { increment } from "firebase/firestore";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { auth, db } from "../../../api/firebaseconfig";

const ProcessPayment = () => {
  const PRICE = 100;
  const toast = useToast();
  useEffect(() => {
    let id = localStorage.getItem("id");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    db.collection("users")
      .doc(id)
      .update({ boost: ["yes", today, 366] });
    db.collection("users")
      .doc(id)
      .get()
      .then((val) => {
        let startups = Object.values(val.get("startups"));
        console.log(startups);
        console.log(typeof startups);
        if (startups.length > 0) {
          startups.forEach(function (startup) {
            db.collection("startups")
              .doc(startup)
              .update({ coins: increment(5000) });
            db.collection("startups")
              .doc(startup)
              .update({ level: increment(200) });
            Router.push("/app/boost/yearlyofficialactivation");
            toast({
              title: "Perks received",
              description:
                "All of your startups received extra perks such as coins, level, and product boost.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          });
        } else {
          Router.push("/app/boost/yearlyofficialactivation");
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
};

export default ProcessPayment;
