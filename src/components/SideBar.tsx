import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { AiOutlineBarChart } from "react-icons/ai";
import {
  MdOutlinePersonSearch,
  MdOutlineSpaceDashboard,
  MdTrendingUp,
} from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";

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
          isDisabled
        >
          <AiOutlineBarChart size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Advertising Insights
          </Box>
        </Button>
        <Button
          variant={"ghost"}
          alignItems={"center"}
          justifyContent={"start"}
          w={"full"}
          onClick={() =>
            navigate({
              to: "/product",
            })
          }
          isDisabled
        >
          <RiHandCoinLine size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Product Analysis
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
          isDisabled
        >
          <MdOutlinePersonSearch size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            User Behavior
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
          isDisabled
        >
          <MdTrendingUp size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Online Trends
          </Box>
        </Button>
      </VStack>
    </Box>
  );
};
