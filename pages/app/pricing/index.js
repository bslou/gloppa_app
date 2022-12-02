import { Flex, Text, Button } from "@chakra-ui/react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

loadStripe(
  "pk_test_51M7Ro4GeoqyJBYDECjxzLIS0mmOak6AX7wxWGKhnMQILtAWIj8vqtFnsTSzDsaBKS55oiavFulwWMVYxcvPtNNyO00rjWkemcz"
);

const Payment = () => {
  const router = useRouter();

  const { success, canceled } = router.query;

  useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"10vw"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
    >
      <Button
        variant="ghost"
        onClick={() => router.back()}
        colorScheme={"transparent"}
        position={"absolute"}
        top={10}
        left={5}
      >
        <Image
          src={"/assets/back.png"}
          alt={"Gloppa back"}
          width={60}
          height={60}
        />
      </Button>
      <form action="/api/checkout_sessions" method="POST">
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundColor={"#1C1C1C"}
          width={{ base: "40vw", md: "30vw", lg: "30vw" }}
          height={"75vh"}
          borderRadius={15}
          gap={3}
        >
          <Text
            fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
            color={"white"}
            fontWeight={700}
          >
            Basic
          </Text>
          <Text
            fontSize={{ base: "14pt", md: "17pt", lg: "20pt" }}
            fontWeight={300}
            textAlign={"center"}
            color={"white"}
            width={"27vw"}
          >
            This is a monthly package which will give you access to all of
            Gloppa’s current and future features including the beta version!
          </Text>
          <Text
            fontSize={{ base: "14pt", md: "18pt", lg: "22pt" }}
            as="s"
            color={"gray"}
          >
            $15
          </Text>
          <Text
            fontSize={{ base: "14pt", md: "18pt", lg: "22pt" }}
            color={"white"}
            fontWeight={650}
          >
            $10 / month
          </Text>
          <Button
            width={"90%"}
            paddingTop={7}
            paddingBottom={7}
            backgroundColor={"#fff"}
            color={"black"}
            fontWeight={700}
            fontSize={{ base: "17pt", md: "20pt", lg: "23pt" }}
            type="submit"
            role="link"
          >
            Finish
          </Button>
        </Flex>
      </form>
      <form action="/api/checkout_sessionsTwo" method="POST">
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundColor={"#1C1C1C"}
          width={{ base: "40vw", md: "30vw", lg: "30vw" }}
          height={"75vh"}
          borderRadius={15}
          gap={3}
        >
          <Text
            fontSize={{ base: "20pt", md: "30pt", lg: "40pt" }}
            color={"white"}
            fontWeight={700}
          >
            Premium
          </Text>
          <Text
            fontSize={{ base: "14pt", md: "17pt", lg: "20pt" }}
            fontWeight={300}
            textAlign={"center"}
            color={"white"}
            width={"27vw"}
          >
            This is a full time premium package which will give you access to
            all of Gloppa’s current and future features including the beta
            version!
          </Text>
          <Text
            fontSize={{ base: "14pt", md: "18pt", lg: "22pt" }}
            as="s"
            color={"gray"}
          >
            $200
          </Text>
          <Text
            fontSize={{ base: "14pt", md: "18pt", lg: "22pt" }}
            color={"white"}
            fontWeight={650}
          >
            $150 / Full Time
          </Text>
          <Button
            width={"90%"}
            paddingTop={7}
            paddingBottom={7}
            backgroundColor={"#fff"}
            color={"black"}
            fontWeight={700}
            fontSize={{ base: "17pt", md: "20pt", lg: "23pt" }}
            type={"submit"}
            role={"link"}
          >
            Finish
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Payment;
