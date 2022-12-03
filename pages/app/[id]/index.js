import {
  Button,
  Flex,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../api/firebaseconfig";

const Game = () => {
  const [lvl, setLvl] = useState("0");
  const [startupName, setStartupName] = useState("Placeholder");
  const [coins, setCoins] = useState("0");
  const quotes = [
    "Keep going you will reach victory soon!",
    "Focusing on problems one step at a time.",
    "The people who don't quit are the ones that succeed!",
  ];
  const router = useRouter();
  console.log("ID " + router.query.id);
  useEffect(() => {
    db.collection("startups")
      .doc(router.query.id)
      .get()
      .then((val) => {
        setLvl(String(val.get("level")));
        setStartupName(String(val.get("startupName")));
        setCoins(String(val.get("coins")));
      });
  }, []);
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#323232"}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100vw"}
        backgroundColor={"#1C1C1C"}
        padding={5}
      >
        <NextLink href={"/app/startuplist"}>
          <Link color={"white"} fontSize={"20pt"}>
            Gloppa
          </Link>
        </NextLink>
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"1vw"}
        >
          <Flex>
            <Flex>
              <Image
                src={"/assets/award.png"}
                alt={"Award Gloppa"}
                width={50}
                height={50}
              />
            </Flex>
            <Flex
              position={"absolute"}
              marginLeft={"1.1vw"}
              marginTop={"0.5vh"}
            >
              <Text
                color={"black"}
                fontSize={"20pt"}
                fontWeight={800}
                zIndex={10000}
              >
                {lvl}
              </Text>
            </Flex>
          </Flex>
          <Text color={"white"} fontSize={"22pt"} fontWeight={700}>
            {startupName}
          </Text>
        </Flex>
        <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button variant={"ghost"}>
              <Image
                src={"/assets/leaderboard.png"}
                alt={"Gloppa Leaderboard"}
                width={40}
                height={40}
              />
            </Button>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Image
                src={"/assets/coin.png"}
                alt={"Coin Gloppa"}
                width={30}
                height={30}
              />
              <Text color={"white"}>{coins}</Text>
            </Flex>
            <Button variant={"ghost"}>
              <Image
                src={"/assets/shop.png"}
                alt={"Gloppa Shop"}
                width={40}
                height={40}
              />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"5vw"}
        paddingTop={"2vh"}
        paddingBottom={"4vh"}
        borderBottom={"1px solid white"}
        width={"100vw"}
      >
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"40vw"}
        >
          <Image
            src={"/assets/spacer.png"}
            alt={"Gloppa Spacer"}
            width={350}
            height={350}
          />
          <Text color={"white"}>
            Semi-advanced factory (producing 1 coin an hour)
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"left"}
          justifyContent={"center"}
          width={"30vw"}
          gap={"1.4vh"}
        >
          <Text color={"white"} fontSize={"25pt"} marginBottom={"2vh"}>
            {quotes[0]}
          </Text>
          <Text color={"white"} fontSize={"18pt"} fontWeight={900}>
            Achievements:
          </Text>
          <UnorderedList color={"white"}>
            <ListItem>
              <Flex direction={"row"} alignItems={"center"}>
                <Text color={"white"} marginRight={"1vw"}>
                  5 new customers
                </Text>
                <Image
                  src={"/assets/coin.png"}
                  alt={"Gloppa coin"}
                  width={25}
                  height={25}
                  marginRight={"0.2vw"}
                />
                <Text>+5</Text>
              </Flex>
            </ListItem>

            <ListItem>
              <Flex direction={"row"} alignItems={"center"}>
                <Text color={"white"} marginRight={"1vw"}>
                  Idea refinement complete
                </Text>
                <Image
                  src={"/assets/coin.png"}
                  alt={"Gloppa coin"}
                  width={25}
                  height={25}
                  marginRight={"0.2vw"}
                />
                <Text>+5</Text>
              </Flex>
            </ListItem>

            <ListItem>
              <Flex direction={"row"} alignItems={"center"}>
                <Text color={"white"} marginRight={"1vw"}>
                  PR complete
                </Text>
                <Image
                  src={"/assets/coin.png"}
                  alt={"Gloppa coin"}
                  width={25}
                  height={25}
                  marginRight={"0.2vw"}
                />
                <Text>+5</Text>
              </Flex>
            </ListItem>
          </UnorderedList>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Game;
