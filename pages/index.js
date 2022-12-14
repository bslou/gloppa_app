import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { db } from "./api/firebaseconfig";

const Direction = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("id") !== null) {
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((val) => {
            if (!val.exists) return;
            if (typeof val.get("premium")[0] !== "undefined") {
              // does not exist
              if (val.get("premium")[0] == "fulltime") {
                router.push("/app/startuplist");
              } else if (val.get("premium")[0] == "parttime") {
                const date1 = new Date(String(val.get("premium")[1]));
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + "/" + dd + "/" + yyyy;
                const date2 = new Date(String(today));
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays <= 31) {
                  router.push("/app/startuplist");
                } else {
                  router.push("/app/pricing");
                }
              }
            }
          });
      } else {
        router.push("/c/main");
      }
    }
  });
  return <Flex></Flex>;
};

export default Direction;
