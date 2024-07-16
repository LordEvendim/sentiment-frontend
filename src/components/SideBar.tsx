import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { AiOutlineBarChart } from "react-icons/ai";
import {
  MdOutlinePersonSearch,
  MdOutlineSpaceDashboard,
  MdTrendingUp,
} from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";

import { useGhost } from "#hooks/useGhost";

export const SideBar = () => {
  const navigate = useNavigate();
  const toggleGhostMode = useGhost((state) => state.toggle);

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
              to: "/overview",
            })
          }
        >
          <MdOutlineSpaceDashboard size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Overview
          </Box>
        </Button>
        <Button
          variant={"ghost"}
          alignItems={"center"}
          justifyContent={"start"}
          w={"full"}
          onClick={() =>
            navigate({
              to: "/advertising",
            })
          }
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
              to: "/overview",
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
              to: "/overview",
            })
          }
          isDisabled
        >
          <MdTrendingUp size={"18px"} />
          <Box ml={"10px"} mb={"2px"} fontWeight={"normal"} fontSize={"16px"}>
            Online Trends
          </Box>
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => toggleGhostMode()}
          w={"full"}
          h={"50px"}
        ></Button>
      </VStack>
    </Box>
  );
};
