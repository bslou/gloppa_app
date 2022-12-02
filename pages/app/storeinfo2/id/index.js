import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { auth, db } from "../../../api/firebaseconfig";

const ProcessPayment = () => {
  const PRICE = 150;
  useEffect(() => {
    let id = localStorage.getItem("id");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    db.collection("users")
      .doc(id)
      .update({ premium: ["fulltime", today] });
    Router.push("/app/startuplist");
  }, []);
};

export default ProcessPayment;
