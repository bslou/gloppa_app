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
import { auth, db } from "../../api/firebaseconfig";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { loadStripe } from "@stripe/stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const Privacy = () => {
  const PUBLIC_KEY =
    "pk_test_51M7Ro4GeoqyJBYDECjxzLIS0mmOak6AX7wxWGKhnMQILtAWIj8vqtFnsTSzDsaBKS55oiavFulwWMVYxcvPtNNyO00rjWkemcz";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  const [display, changeDisplay] = useState("none");
  const [display2, changeDisplay2] = useState("none");

  const stripe = useStripe();
  const elements = useElements();
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
          display={["none", "none", "none", "none", "flex"]}
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
          display={["flex", "flex", "flex", "flex", "none"]}
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
          Privacy Policy
        </Text>
        <Text fontSize={{ base: "10pt", md: "12pt", lg: "14pt" }}>
          Last updated: November 18, 2022
          <br />
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
          <br />
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
          <br />
          Interpretation and Definitions
          <br />
          Interpretation
          <br />
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
          <br />
          Definitions
          <br />
          For the purposes of this Privacy Policy:
          <br />
          Account means a unique account created for You to access our Service
          or parts of our Service.
          <br />
          Company (referred to as either "the Company", "We", "Us" or "Our" in
          this Agreement) refers to Gloppa.
          <br />
          Cookies are small files that are placed on Your computer, mobile
          device or any other device by a website, containing the details of
          Your browsing history on that website among its many uses.
          <br />
          Country refers to: California, United States
          <br />
          Device means any device that can access the Service such as a
          computer, a cellphone or a digital tablet.
          <br />
          Personal Data is any information that relates to an identified or
          identifiable individual.
          <br />
          Service refers to the Website.
          <br />
          Service Provider means any natural or legal person who processes the
          data on behalf of the Company. It refers to third-party companies or
          individuals employed by the Company to facilitate the Service, to
          provide the Service on behalf of the Company, to perform services
          related to the Service or to assist the Company in analyzing how the
          Service is used.
          <br />
          Usage Data refers to data collected automatically, either generated by
          the use of the Service or from the Service infrastructure itself (for
          example, the duration of a page visit).
          <br />
          Website refers to Gloppa, accessible from gloppa.co
          <br />
          You means the individual accessing or using the Service, or the
          company, or other legal entity on behalf of which such individual is
          accessing or using the Service, as applicable.
          <br />
          Collecting and Using Your Personal Data
          <br />
          Types of Data Collected
          <br />
          Personal Data
          <br />
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
          <br />
          Email address
          <br />
          Usage Data
          <br />
          Usage Data
          <br />
          Usage Data is collected automatically when using the Service.
          <br />
          Usage Data may include information such as Your Device's Internet
          Protocol address (e.g. IP address), browser type, browser version, the
          pages of our Service that You visit, the time and date of Your visit,
          the time spent on those pages, unique device identifiers and other
          diagnostic data.
          <br />
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID,
          the IP address of Your mobile device, Your mobile operating system,
          the type of mobile Internet browser You use, unique device identifiers
          and other diagnostic data.
          <br />
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a
          mobile device.
          <br />
          Tracking Technologies and Cookies
          <br />
          We use Cookies and similar tracking technologies to track the activity
          on Our Service and store certain information. Tracking technologies
          used are beacons, tags, and scripts to collect and track information
          and to improve and analyze Our Service. The technologies We use may
          include:
          <br />
          Cookies or Browser Cookies. A cookie is a small file placed on Your
          Device. You can instruct Your browser to refuse all Cookies or to
          indicate when a Cookie is being sent. However, if You do not accept
          Cookies, You may not be able to use some parts of our Service. Unless
          you have adjusted Your browser setting so that it will refuse Cookies,
          our Service may use Cookies.
          <br />
          Web Beacons. Certain sections of our Service and our emails may
          contain small electronic files known as web beacons (also referred to
          as clear gifs, pixel tags, and single-pixel gifs) that permit the
          Company, for example, to count users who have visited those pages or
          opened an email and for other related website statistics (for example,
          recording the popularity of a certain section and verifying system and
          server integrity).
          <br />
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
          remain on Your personal computer or mobile device when You go offline,
          while Session Cookies are deleted as soon as You close Your web
          browser. Learn more about cookies on the Privacy Policies website
          article.
          <br />
          We use both Session and Persistent Cookies for the purposes set out
          below:
          <br />
          Necessary / Essential Cookies
          <br />
          Type: Session Cookies
          <br />
          Administered by: Us
          <br />
          Purpose: These Cookies are essential to provide You with services
          available through the Website and to enable You to use some of its
          features. They help to authenticate users and prevent fraudulent use
          of user accounts. Without these Cookies, the services that You have
          asked for cannot be provided, and We only use these Cookies to provide
          You with those services.
          <br />
          Cookies Policy / Notice Acceptance Cookies
          <br />
          Type: Persistent Cookies
          <br />
          Administered by: Us
          <br />
          Purpose: These Cookies identify if users have accepted the use of
          cookies on the Website.
          <br />
          Functionality Cookies
          <br />
          Type: Persistent Cookies
          <br />
          Administered by: Us
          <br />
          Purpose: These Cookies allow us to remember choices You make when You
          use the Website, such as remembering your login details or language
          preference. The purpose of these Cookies is to provide You with a more
          personal experience and to avoid You having to re-enter your
          preferences every time You use the Website.
          <br />
          For more information about the cookies we use and your choices
          regarding cookies, please visit our Cookies Policy or the Cookies
          section of our Privacy Policy.
          <br />
          Use of Your Personal Data
          <br />
          The Company may use Personal Data for the following purposes:
          <br />
          To provide and maintain our Service, including to monitor the usage of
          our Service.
          <br />
          To manage Your Account: to manage Your registration as a user of the
          Service. The Personal Data You provide can give You access to
          different functionalities of the Service that are available to You as
          a registered user.
          <br />
          For the performance of a contract: the development, compliance and
          undertaking of the purchase contract for the products, items or
          services You have purchased or of any other contract with Us through
          the Service.
          <br />
          To contact You: To contact You by email, telephone calls, SMS, or
          other equivalent forms of electronic communication, such as a mobile
          application's push notifications regarding updates or informative
          communications related to the functionalities, products or contracted
          services, including the security updates, when necessary or reasonable
          for their implementation.
          <br />
          To provide You with news, special offers and general information about
          other goods, services and events which we offer that are similar to
          those that you have already purchased or enquired about unless You
          have opted not to receive such information.
          <br />
          To manage Your requests: To attend and manage Your requests to Us.
          <br />
          For business transfers: We may use Your information to evaluate or
          conduct a merger, divestiture, restructuring, reorganization,
          dissolution, or other sale or transfer of some or all of Our assets,
          whether as a going concern or as part of bankruptcy, liquidation, or
          similar proceeding, in which Personal Data held by Us about our
          Service users is among the assets transferred.
          <br />
          For other purposes: We may use Your information for other purposes,
          such as data analysis, identifying usage trends, determining the
          effectiveness of our promotional campaigns and to evaluate and improve
          our Service, products, services, marketing and your experience.
          <br />
          We may share Your personal information in the following situations:
          <br />
          With Service Providers: We may share Your personal information with
          Service Providers to monitor and analyze the use of our Service, to
          contact You.
          <br />
          For business transfers: We may share or transfer Your personal
          information in connection with, or during negotiations of, any merger,
          sale of Company assets, financing, or acquisition of all or a portion
          of Our business to another company.
          <br />
          With Affiliates: We may share Your information with Our affiliates, in
          which case we will require those affiliates to honor this Privacy
          Policy. Affiliates include Our parent company and any other
          subsidiaries, joint venture partners or other companies that We
          control or that are under common control with Us.
          <br />
          With business partners: We may share Your information with Our
          business partners to offer You certain products, services or
          promotions.
          <br />
          With other users: when You share personal information or otherwise
          interact in the public areas with other users, such information may be
          viewed by all users and may be publicly distributed outside.
          <br />
          With Your consent: We may disclose Your personal information for any
          other purpose with Your consent.
          <br />
          Retention of Your Personal Data
          <br />
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use Your Personal Data to the extent necessary to comply
          with our legal obligations (for example, if we are required to retain
          your data to comply with applicable laws), resolve disputes, and
          enforce our legal agreements and policies.
          <br />
          The Company will also retain Usage Data for internal analysis
          purposes. Usage Data is generally retained for a shorter period of
          time, except when this data is used to strengthen the security or to
          improve the functionality of Our Service, or We are legally obligated
          to retain this data for longer time periods.
          <br />
          Transfer of Your Personal Data
          <br />
          Your information, including Personal Data, is processed at the
          Company's operating offices and in any other places where the parties
          involved in the processing are located. It means that this information
          may be transferred to — and maintained on — computers located outside
          of Your state, province, country or other governmental jurisdiction
          where the data protection laws may differ than those from Your
          jurisdiction.
          <br />
          Your consent to this Privacy Policy followed by Your submission of
          such information represents Your agreement to that transfer.
          <br />
          The Company will take all steps reasonably necessary to ensure that
          Your data is treated securely and in accordance with this Privacy
          Policy and no transfer of Your Personal Data will take place to an
          organization or a country unless there are adequate controls in place
          including the security of Your data and other personal information.
          <br />
          Delete Your Personal Data
          <br />
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
          <br />
          Our Service may give You the ability to delete certain information
          about You from within the Service.
          <br />
          You may update, amend, or delete Your information at any time by
          signing in to Your Account, if you have one, and visiting the account
          settings section that allows you to manage Your personal information.
          You may also contact Us to request access to, correct, or delete any
          personal information that You have provided to Us.
          <br />
          Please note, however, that We may need to retain certain information
          when we have a legal obligation or lawful basis to do so.
          <br />
          Disclosure of Your Personal Data
          <br />
          Business Transactions
          <br />
          If the Company is involved in a merger, acquisition or asset sale,
          Your Personal Data may be transferred. We will provide notice before
          Your Personal Data is transferred and becomes subject to a different
          Privacy Policy.
          <br />
          Law enforcement
          <br />
          Under certain circumstances, the Company may be required to disclose
          Your Personal Data if required to do so by law or in response to valid
          requests by public authorities (e.g. a court or a government agency).
          <br />
          Other legal requirements
          <br />
          The Company may disclose Your Personal Data in the good faith belief
          that such action is necessary to:
          <br />
          Comply with a legal obligation
          <br />
          Protect and defend the rights or property of the Company
          <br />
          Prevent or investigate possible wrongdoing in connection with the
          Service
          <br />
          Protect the personal safety of Users of the Service or the public
          <br />
          Protect against legal liability
          <br />
          Security of Your Personal Data
          <br />
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure. While We strive to use commercially
          acceptable means to protect Your Personal Data, We cannot guarantee
          its absolute security.
          <br />
          Children's Privacy
          <br />
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13. If You are a parent or guardian and You are aware
          that Your child has provided Us with Personal Data, please contact Us.
          If We become aware that We have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, We take
          steps to remove that information from Our servers.
          <br />
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent's consent before We collect and use that
          information.
          <br />
          Links to Other Websites
          <br />
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third party link, You will be directed to
          that third party's site. We strongly advise You to review the Privacy
          Policy of every site You visit.
          <br />
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
          <br />
          Changes to this Privacy Policy
          <br />
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
          <br />
          We will let You know via email and/or a prominent notice on Our
          Service, prior to the change becoming effective and update the "Last
          updated" date at the top of this Privacy Policy.
          <br />
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
          <br />
          Contact Us
          <br />
          If you have any questions about this Privacy Policy, You can contact
          us:
          <br />
          By email: gloppaofficial@gmail.com
          <br />
          By visiting this page on our website: gloppa.co/contact
          <br />
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
          display={["none", "none", "flex", "flex"]}
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
          display={["flex", "flex", "none", "none"]}
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

export default Privacy;