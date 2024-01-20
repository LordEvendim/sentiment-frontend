import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { FaRegSmile } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const SideBar = () => {
  const navigate = useNavigate();

  return (
    <Box
      w={"250px"}
      h={"full"}
      flexShrink={0}
      background={"white"}
      boxShadow={"lg"}
      position={"relative"}
    >
      <VStack
        alignItems={"start"}
        px={"20px"}
        pt={"20px"}
        fontSize={"16px"}
        spacing={"20px"}
      >
        <Button
          variant={"ghost"}
          alignItems={"center"}
          justifyContent={"start"}
          w={"full"}
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
        >
          <MdOutlineSpaceDashboard size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Dashboard
          </Box>
        </Button>
        <Button
          variant={"ghost"}
          alignItems={"center"}
          justifyContent={"start"}
          w={"full"}
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
        >
          <FaRegSmile size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Sentiment
          </Box>
        </Button>
        <Button
          variant={"ghost"}
          alignItems={"center"}
          justifyContent={"start"}
          w={"full"}
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
        >
          <HiOutlineDocumentReport size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Report
          </Box>
        </Button>
      </VStack>
    </Box>
  );
};
