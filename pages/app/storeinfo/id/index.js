import Router, { useRouter } from "next/router";
import { auth, db } from "../../../api/firebaseconfig";
import { useEffect, useState } from "react";
import MyLoadingScreen from "./myloadingscreen";

const ProcessPayment = () => {
  const PRICE = 10;
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
    Router.push("/app/boost/monthlyofficialactivation");
  }, []);

  return <MyLoadingScreen />;
};

export default ProcessPayment;
