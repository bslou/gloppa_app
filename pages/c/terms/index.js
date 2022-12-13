import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  useToast,
  Link,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { auth, db } from "../../api/firebaseconfig";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Terms = () => {
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");
  const router = useRouter();
  return (
    <Flex direction={"column"} alignItems={"center"} width={"100vw"}>
      {/**Desktop */}
      <Flex
        direction={"row"}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"#000"}
        padding={"4"}
        position={"fixed"}
        top={0}
        left={0}
        as="nav"
        zIndex={100}
      >
        <NextLink href={"/"}>
          <Link color={"white"} fontWeight={600} fontSize={"20pt"}>
            Gloppa
          </Link>
        </NextLink>
        <Flex
          direction={"row"}
          alignItems={"center"}
          gap={"10"}
          display={["none", "none", "flex", "flex"]}
        >
          <NextLink href={"/c/product"}>
            <Link color={"white"}>Product</Link>
          </NextLink>
          <NextLink href={"/c/about"}>
            <Link color={"white"}>About</Link>
          </NextLink>
          <NextLink href={"/c/partners"}>
            <Link color={"white"}>Partners</Link>
          </NextLink>
          <NextLink href={"/c/careers"}>
            <Link color={"white"}>Careers</Link>
          </NextLink>
          <NextLink href={"/c/contact"}>
            <Link color={"white"}>Contact</Link>
          </NextLink>

          <Button
            backgroundColor={"#0094FF"}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={2}
            paddingBottom={2}
            color={"black"}
            borderRadius={20}
            onClick={() => router.push("/app/register")}
          >
            Join
          </Button>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
        {/**Mobile */}

        <Flex
          w="100vw"
          display={display}
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/" passHref>
              <Button
                fontWeight={600}
                fontSize={"20pt"}
                as="a"
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Gloppa
              </Button>
            </NextLink>

            <NextLink href="/c/product" passHref>
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                Product
              </Button>
            </NextLink>

            <NextLink href="/c/about" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                About
              </Button>
            </NextLink>

            <NextLink href="/c/partners" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Partners
              </Button>
            </NextLink>

            <NextLink href="/c/careers" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Careers
              </Button>
            </NextLink>

            <NextLink href="/c/contact" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Contact
              </Button>
            </NextLink>

            <Button
              backgroundColor={"#0094FF"}
              paddingLeft={5}
              paddingRight={5}
              paddingTop={2}
              paddingBottom={2}
              color={"black"}
              borderRadius={20}
              onClick={() => router.push("/app/register")}
            >
              Join
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        alignItems={"center"}
        marginTop={130}
        gap={3}
        width={"75vw"}
      >
        <Text
          fontWeight={600}
          fontSize={{ base: "24pt", md: "29pt", lg: "35pt" }}
        >
          Terms and Conditions
        </Text>
        <Text fontSize={{ base: "10pt", md: "12pt", lg: "14pt" }}>
          Welcome to Gloppa!
          <br />
          These terms and conditions outline the rules and regulations for the
          use of Gloppa's Website, located at gloppa.co.
          <br />
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use Gloppa if you do not agree to take
          all of the terms and conditions stated on this page. The following
          terminology applies to these Terms and Conditions, Privacy Statement
          and Disclaimer Notice and all Agreements: "Client", "You" and "Your"
          refers to you, the person log on this website and compliant to the
          Company’s terms and conditions. "The Company", "Ourselves", "We",
          "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
          refers to both the Client and ourselves. All terms refer to the offer,
          acceptance and consideration of payment necessary to undertake the
          process of our assistance to the Client in the most appropriate manner
          for the express purpose of meeting the Client’s needs in respect of
          provision of the Company’s stated services, in accordance with and
          subject to, prevailing law of Netherlands. Any use of the above
          terminology or other words in the singular, plural, capitalization
          and/or he/she or they, are taken as interchangeable and therefore as
          referring to same. Cookies
          <br />
          We employ the use of cookies. By accessing Gloppa, you agreed to use
          cookies in agreement with the Gloppa's Privacy Policy. Most
          interactive websites use cookies to let us retrieve the user’s details
          for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies. License
          <br />
          Unless otherwise stated, Gloppa and/or its licensors own the
          intellectual property rights for all material on Gloppa. All
          intellectual property rights are reserved. You may access this from
          Gloppa for your own personal use subjected to restrictions set in
          these terms and conditions.
          <br />
          You must not:
          <br />
          Republish material from Gloppa
          <br />
          Sell, rent or sub-license material from Gloppa
          <br />
          Reproduce, duplicate or copy material from Gloppa
          <br />
          Redistribute content from Gloppa
          <br />
          This Agreement shall begin on the date hereof. Our Terms and
          Conditions were created with the help of the Free Terms and Conditions
          Generator. Parts of this website offer an opportunity for users to
          post and exchange opinions and information in certain areas of the
          website. Gloppa does not filter, edit, publish or review Comments
          prior to their presence on the website. Comments do not reflect the
          views and opinions of Gloppa,its agents and/or affiliates. Comments
          reflect the views and opinions of the person who post their views and
          opinions. To the extent permitted by applicable laws, Gloppa shall not
          be liable for the Comments or for any liability, damages or expenses
          caused and/or suffered as a result of any use of and/or posting of
          and/or appearance of the Comments on this website. Gloppa reserves the
          right to monitor all Comments and to remove any Comments which can be
          considered inappropriate, offensive or causes breach of these Terms
          and Conditions.
          <br />
          You warrant and represent that:
          <br />
          You are entitled to post the Comments on our website and have all
          necessary licenses and consents to do so;
          <br />
          <br />
          The Comments do not invade any intellectual property right, including
          without limitation copyright, patent or trademark of any third party;
          <br />
          The Comments do not contain any defamatory, libelous, offensive,
          indecent or otherwise unlawful material which is an invasion of
          privacy
          <br />
          The Comments will not be used to solicit or promote business or custom
          or present commercial activities or unlawful activity.
          <br />
          You hereby grant Gloppa a non-exclusive license to use, reproduce,
          edit and authorize others to use, reproduce and edit any of your
          Comments in any and all forms, formats or media.
          <br />
          Hyperlinking to our Content
          <br />
          The following organizations may link to our Website without prior
          written approval:
          <br />
          Government agencies;
          <br />
          Search engines;
          <br />
          News organizations;
          <br />
          Online directory distributors may link to our Website in the same
          manner as they hyperlink to the Websites of other listed businesses;
          and System wide Accredited Businesses except soliciting non-profit
          organizations, charity shopping malls, and charity fundraising groups
          which may not hyperlink to our Web site. These organizations may link
          to our home page, to publications or to other Website information so
          long as the link: (a) is not in any way deceptive; (b) does not
          falsely imply sponsorship, endorsement or approval of the linking
          party and its products and/or services; and (c) fits within the
          context of the linking party’s site. We may consider and approve other
          link requests from the following types of organizations:
          <br />
          commonly-known consumer and/or business information sources;
          <br />
          dot.com community sites;
          <br />
          associations or other groups representing charities;
          <br />
          online directory distributors;
          <br />
          internet portals;
          <br />
          accounting, law and consulting firms; and
          <br />
          educational institutions and trade associations.
          <br />
          We will approve link requests from these organizations if we decide
          that: (a) the link would not make us look unfavorably to ourselves or
          to our accredited businesses; (b) the organization does not have any
          negative records with us; (c) the benefit to us from the visibility of
          the hyperlink compensates the absence of Gloppa; and (d) the link is
          in the context of general resource information. These organizations
          may link to our home page so long as the link: (a) is not in any way
          deceptive; (b) does not falsely imply sponsorship, endorsement or
          approval of the linking party and its products or services; and (c)
          fits within the context of the linking party’s site. If you are one of
          the organizations listed in paragraph 2 above and are interested in
          linking to our website, you must inform us by sending an e-mail to
          Gloppa. Please include your name, your organization name, contact
          information as well as the URL of your site, a list of any URLs from
          which you intend to link to our Website, and a list of the URLs on our
          site to which you would like to link. Wait 2-3 weeks for a response.
          <br />
          Approved organizations may hyperlink to our Website as follows:
          <br />
          By use of our corporate name; or
          <br />
          By use of the uniform resource locator being linked to; or
          <br />
          By use of any other description of our Website being linked to that
          makes sense within the context and format of content on the linking
          party’s site.
          <br />
          No use of Gloppa's logo or other artwork will be allowed for linking
          absent a trademark license agreement.
          <br />
          iFrames
          <br />
          Without prior approval and written permission, you may not create
          frames around our Webpages that alter in any way the visual
          presentation or appearance of our Website.
          <br />
          Content Liability
          <br />
          We shall not be hold responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that is
          rising on your Website. No link(s) should appear on any Website that
          may be interpreted as libelous, obscene or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of, any third party rights.
          <br />
          Your Privacy
          <br />
          Please read Privacy Policy
          <br />
          Reservation of Rights
          <br />
          We reserve the right to request that you remove all links or any
          particular link to our Website. You approve to immediately remove all
          links to our Website upon request. We also reserve the right to amen
          these terms and conditions and it’s linking policy at any time. By
          continuously linking to our Website, you agree to be bound to and
          follow these linking terms and conditions. Removal of links from our
          website
          <br />
          If you find any link on our Website that is offensive for any reason,
          you are free to contact and inform us any moment. We will consider
          requests to remove links but we are not obligated to or so or to
          respond to you directly. We do not ensure that the information on this
          website is correct, we do not warrant its completeness or accuracy;
          nor do we promise to ensure that the website remains available or that
          the material on the website is kept up to date.
          <br />
          Disclaimer
          <br />
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will: limit or
          exclude our or your liability for death or personal injury;
          <br />
          limit or exclude our or your liability for fraud or fraudulent
          misrepresentation;
          <br />
          limit any of our or your liabilities in any way that is not permitted
          under applicable law; or
          <br />
          exclude any of our or your liabilities that may not be excluded under
          applicable law.
          <br />
          <br />
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
          <br />
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </Text>
      </Flex>

      <Flex
        direction={"row"}
        alignItems={"center"}
        backgroundColor={"black"}
        padding={7}
        width={"100vw"}
        fontSize={"14pt"}
        marginTop={100}
        justify="space-between"
      >
        <NextLink href={"/"}>
          <Link
            color={"white"}
            fontWeight={700}
            fontSize={"25pt"}
            marginRight={"33vw"}
          >
            Gloppa
          </Link>
        </NextLink>
        <Flex
          direction={"row"}
          alignItems={"center"}
          gap={20}
          display={["none", "none", "none", "none", "flex"]}
        >
          <NextLink
            href={"https://www.linkedin.com/in/benjamin-sloutsky-9b9b09235/"}
            target={"_blank"}
            passHref
          >
            <Link color={"white"}>LinkedIn</Link>
          </NextLink>
          <NextLink
            href={"https://twitter.com/GloppaG"}
            target={"_blank"}
            passHref
          >
            <Link color={"white"}>Twitter</Link>
          </NextLink>
          <NextLink href={"/c/terms"}>
            <Link color={"white"}>Terms</Link>
          </NextLink>
          <NextLink href={"/c/privacy"}>
            <Link color={"white"}>Privacy</Link>
          </NextLink>
          <Text color={"white"} width={"10vw"} fontSize={"13pt"}>
            ©Gloppa, 2022 All rights reserved
          </Text>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay2("flex")}
          display={["flex", "flex", "flex", "flex", "none"]}
        />
        {/**Mobile */}

        <Flex
          w="100vw"
          display={display2}
          bgColor="gray.50"
          zIndex={2000000}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay2("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/" passHref>
              <Button
                fontWeight={600}
                fontSize={"20pt"}
                as="a"
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Gloppa
              </Button>
            </NextLink>

            <NextLink
              href={"https://www.linkedin.com/in/benjamin-sloutsky-9b9b09235/"}
              target={"_blank"}
              passHref
            >
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                LinkedIn
              </Button>
            </NextLink>

            <NextLink
              href={"https://twitter.com/GloppaG"}
              target={"_blank"}
              passHref
            >
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Twitter
              </Button>
            </NextLink>

            <NextLink href={"/c/terms"} passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Terms
              </Button>
            </NextLink>

            <NextLink href="/c/privacy" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Privacy
              </Button>
            </NextLink>

            <Text color={"white"} width={"10vw"} fontSize={"13pt"}>
              ©Gloppa, 2022 All rights reserved
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Terms;
