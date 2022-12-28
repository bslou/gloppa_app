import { Button, Flex, Text } from "@chakra-ui/react";
import { arrayRemove } from "firebase/firestore";
import Image from "next/image";
import { db } from "../../api/firebaseconfig";

const Message = (users, lastMessage, id) => {
  const deleteIt = () => {
    console.log("ID " + id);
    if (window.confirm("Are you sure you want to remove this conversation?")) {
      db.collection("messages")
        .doc(id)
        .onSnapshot((val) => {
          val.data().users.forEach((va) => {
            db.collection("users")
              .doc(va)
              .update({ messagesId: arrayRemove(id) });
          });
          db.collection("messages").doc(id).delete();
        });
    }
  };
  return (
    <Flex
      direction={"row"}
      width={"90%"}
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"#2c2c2c"}
      padding={1.5}
      paddingTop={3}
      paddingBottom={3}
      borderRadius={5}
      _hover={{
        opacity: 0.8,
      }}
    >
      {/* <Image
        src={"/assets/profile.png"}
        alt={"profile"}
        width={50}
        height={50}
      /> */}
      <Flex
        direction={"column"}
        alignItems={"left"}
        justifyContent={"center"}
        height={"100%"}
        width={"90%"}
        marginLeft={3}
      >
        <Text
          color={"white"}
          fontSize={"9pt"}
          fontWeight={700}
          width={"90%"}
          whiteSpace={"nowrap"}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {users.map((user, index) => {
            if (index >= user.length - 2) {
              return user;
            } else {
              return user + ", ";
            }
          })}
        </Text>
        <Text
          color={"white"}
          fontSize={"8pt"}
          whiteSpace={"nowrap"}
          width={"90%"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          as={"i"}
        >
          {lastMessage}
        </Text>
      </Flex>
      <Button onClick={deleteIt} colorScheme={"transparent"}>
        <Image src={"/assets/trash.png"} alt={"trash"} width={25} height={25} />
      </Button>
    </Flex>
  );
};

export default Message;
