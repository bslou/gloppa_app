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
        backgroundColor: "#323232",
      }}
    >
      <Spinner size="xl" thickness="4px" color="white" />
    </div>
  );
};

export default MyLoadingScreen;
