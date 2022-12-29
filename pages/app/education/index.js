import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import NavBar from "../navbar";

const Education = () => {
  const title1 = "How to gain users?";
  let info1 = [
    [
      "http://i3.ytimg.com/vi/w2nrXTy47Gc/hqdefault.jpg",
      "Reid Hoffman On How To Hack Your First 100 Users",
      "w2nrXTy47Gc",
    ],
    [
      "http://i3.ytimg.com/vi/1eZpasYkrSE/hqdefault.jpg",
      "Need More Customers? Let Me Show You How",
      "1eZpasYkrSE",
    ],
    [
      "http://i3.ytimg.com/vi/LGJExxDRXPs/hqdefault.jpg",
      "20 Ways to Get Customers for Your Small Business",
      "LGJExxDRXPs",
    ],
    [
      "http://i3.ytimg.com/vi/6H4nRk581is/hqdefault.jpg",
      "Get Your First Users: Advice | Launch | App Marketing | Udacity",
      "6H4nRk581is",
    ],
    [
      "http://i3.ytimg.com/vi/19xt51mn9VY/hqdefault.jpg",
      "How to get the first 100 customers | Alvin Cheung | TEDxCUHK",
      "19xt51mn9VY",
    ],
    [
      "http://i3.ytimg.com/vi/KYtkyOpjXFw/hqdefault.jpg",
      "How to get the First Users/Buyers",
      "KYtkyOpjXFw",
    ],
    [
      "http://i3.ytimg.com/vi/HctZg2aOPMw/hqdefault.jpg",
      "The psychological trick behind getting people to say yes",
      "HctZg2aOPMw",
    ],
    [
      "http://i3.ytimg.com/vi/F71w24KS7mo/hqdefault.jpg",
      "How To Promote Your Facebook Page in 5 EASY Steps",
      "F71w24KS7mo",
    ],
    [
      "http://i3.ytimg.com/vi/KER_ToELCM4/hqdefault.jpg",
      "Growth Hacking: How to Acquire 100K Users",
      "KER_ToELCM4",
    ],
    [
      "http://i3.ytimg.com/vi/qTV6y9RcOyQ/hqdefault.jpg",
      "6 Extremely Simple PRODUCT GROWTH HACKS To Gain Millions of Users!",
      "qTV6y9RcOyQ",
    ],
  ];
  const title2 = "How to find a product idea?";
  const info2 = [
    [
      "http://i3.ytimg.com/vi/mtn31hh6kU4/hqdefault.jpg",
      "4 simple ways to have a great idea | Richard St. John",
      "mtn31hh6kU4",
    ],
    [
      "http://i3.ytimg.com/vi/B216ETbvJxc/hqdefault.jpg",
      "6 Business Ideas That Will Change Your Life in 2023",
      "B216ETbvJxc",
    ],
    [
      "http://i3.ytimg.com/vi/mN21YwEZHCo/hqdefault.jpg",
      "How to Generate NEW Business Ideas | Simon Sinek",
      "mN21YwEZHCo",
    ],
    [
      "http://i3.ytimg.com/vi/L1kbrlZRDvU/hqdefault.jpg",
      "How To Come Up With Good Ideas | Mark Rober | TEDxYouth@ColumbiaSC",
      "L1kbrlZRDvU",
    ],
    [
      "http://i3.ytimg.com/vi/pK887oMqxRY/hqdefault.jpg",
      "How to get a game-changing startup idea? | The Art of Innovation",
      "pK887oMqxRY",
    ],
    [
      "http://i3.ytimg.com/vi/NwyW46josFM/hqdefault.jpg",
      "Evaluate Startup Ideas in 5 Minutes",
      "NwyW46josFM",
    ],
    [
      "http://i3.ytimg.com/vi/2nlybhGJqy0/hqdefault.jpg",
      "7 Ways to Find Startup Business Ideas",
      "2nlybhGJqy0",
    ],
    [
      "http://i3.ytimg.com/vi/3YKNr-LiblI/hqdefault.jpg",
      "Billion dollar startup ideas",
      "3YKNr-LiblI",
    ],
    [
      "http://i3.ytimg.com/vi/4l_lLJK6glI/hqdefault.jpg",
      "Solving Simple Problems can Create Billion Dollar Ideas | Jamie Siminoff | TEDxCrossroadsSchool",
      "4l_lLJK6glI",
    ],
    [
      "http://i3.ytimg.com/vi/2gccAOuGRdU/hqdefault.jpg",
      "Should you work on that startup idea?",
      "2gccAOuGRdU",
    ],
  ];
  const title3 = "How to get funding?";
  const info3 = [
    [
      "http://i3.ytimg.com/vi/NNtMCbs47N8/hqdefault.jpg",
      "How To Get Startup Funding For A Small Business",
      "NNtMCbs47N8",
    ],
    [
      "http://i3.ytimg.com/vi/4RAs9Y5wwDo/hqdefault.jpg",
      "Seed Funding for Startups: How to raise venture capital as an entrepreneur",
      "4RAs9Y5wwDo",
    ],
    [
      "http://i3.ytimg.com/vi/t1fCAuNJH7Q/hqdefault.jpg",
      "How to get funding for your startup",
      "t1fCAuNJH7Q",
    ],
    [
      "http://i3.ytimg.com/vi/1oiuy7dhBEo/hqdefault.jpg",
      "How To Get Business funding In 3 Days! | Small Business & Self Employed",
      "1oiuy7dhBEo",
    ],
    [
      "http://i3.ytimg.com/vi/8-9176AxXVo/hqdefault.jpg",
      "How To Fund Your Startup | Funding A Startup",
      "8-9176AxXVo",
    ],
    [
      "http://i3.ytimg.com/vi/kAh7hlFkVq0/hqdefault.jpg",
      "Seed Funding For Startups: Raising 1M and Beyond (How to get Funding in 2022)",
      "kAh7hlFkVq0",
    ],
    [
      "http://i3.ytimg.com/vi/677ZtSMr4-4/hqdefault.jpg",
      "Startup Funding Explained: Everything You Need to Know",
      "677ZtSMr4-4",
    ],
    [
      "http://i3.ytimg.com/vi/zDUBPWn7WqQ/hqdefault.jpg",
      "How to Get Funding for a NEW Small Business",
      "zDUBPWn7WqQ",
    ],
    [
      "http://i3.ytimg.com/vi/175E2zqSr0A/hqdefault.jpg",
      "How To Get Startup Funding",
      "175E2zqSr0A",
    ],
    [
      "http://i3.ytimg.com/vi/fwiUM7cseXQ/hqdefault.jpg",
      "How To Get Bank Funding For Your Startup In 2022",
      "fwiUM7cseXQ",
    ],
  ];
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
        width={"90vw"}
        overflowY={"scroll"}
        mask={"rounded"}
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
            Videos
          </Text>
        </Flex>
        <Flex direction={"column"} alignItems={"left"} width={"95%"}>
          <>
            <Text color={"white"} fontWeight={400} fontSize={"23pt"}>
              {title1}
            </Text>
            <Flex
              direction={"column"}
              width={"100%"}
              mask="rounded"
              overflowX={"scroll"}
              overflowY={"scroll"}
              alignItems={"flex-start"}
              gap={2}
            >
              <Box
                direction={"row"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={5}
              >
                {info1.map((val) => (
                  <Flex
                    direction={"column"}
                    as={"a"}
                    href={"/app/education/" + val[2]}
                    width={200}
                    height={220}
                  >
                    <img height={180} src={val[0]} alt={"video"} />
                    <Text
                      height={40}
                      color={"white"}
                      fontSize={"10pt"}
                      textAlign={"center"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {val[1]}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </>
          <>
            <Text color={"white"} fontWeight={400} fontSize={"23pt"}>
              {title2}
            </Text>
            <Flex
              direction={"column"}
              width={"100%"}
              mask="rounded"
              overflowX={"scroll"}
              overflowY={"scroll"}
              alignItems={"flex-start"}
              gap={2}
            >
              <Box
                direction={"row"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={5}
              >
                {info2.map((val) => (
                  <Flex
                    direction={"column"}
                    as={"a"}
                    href={"/app/education/" + val[2]}
                    width={200}
                    height={220}
                  >
                    <img height={180} src={val[0]} alt={"video"} />
                    <Text
                      height={40}
                      color={"white"}
                      fontSize={"10pt"}
                      textAlign={"center"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {val[1]}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </>
          <>
            <Text color={"white"} fontWeight={400} fontSize={"23pt"}>
              {title3}
            </Text>
            <Flex
              direction={"column"}
              width={"100%"}
              mask="rounded"
              overflowX={"scroll"}
              overflowY={"scroll"}
              alignItems={"flex-start"}
              gap={2}
            >
              <Box
                direction={"row"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={5}
              >
                {info3.map((val) => (
                  <Flex
                    direction={"column"}
                    as={"a"}
                    href={"/app/education/" + val[2]}
                    width={200}
                    height={220}
                  >
                    <img height={180} src={val[0]} alt={"video"} />
                    <Text
                      height={40}
                      color={"white"}
                      fontSize={"10pt"}
                      textAlign={"center"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {val[1]}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Education;
