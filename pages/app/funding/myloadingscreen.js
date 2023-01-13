import { Spinner } from "@chakra-ui/react";

const MyLoadingScreen = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Spinner size="xl" thickness="4px" color="black" />
    </div>
  );
};

export default MyLoadingScreen;
