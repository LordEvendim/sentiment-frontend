import {
  Box,
  GridItem,
  Heading,
  HStack,
  Image,
  Spacer,
  Spinner,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

import GoogleLogo from "#assets/integrations/google.png";

export const PageViewReport: React.FC<{
  isFetching: boolean;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ isFetching, colSpan = "auto", rowSpan = "auto" }) => {
  return (
    <GridItem
      p={"15px"}
      background={"white"}
      borderRadius={"10px"}
      borderColor={"gray.200"}
      borderWidth={"1px"}
      boxShadow={"md"}
      colSpan={colSpan}
      rowSpan={rowSpan}
      display={"flex"}
      alignSelf={"stretch"}
      flexDir={"column"}
      overflowY={"scroll"}
    >
      <HStack justifyContent={"center"} mb={"15px"}>
        <Image src={GoogleLogo} height={"20px"} />
        <Heading fontSize={"lg"} fontWeight={400}>
          Page view report
        </Heading>
        <Spacer />
        <Tooltip label={"Page view description"} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <VStack fontSize={"2xl"} fontWeight={"extrabold"} alignItems={"baseline"}>
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <Box fontWeight={"normal"} w={"full"}>
            <HStack fontSize={"small"} mx={"auto"} w={"90%"} mb={"12px"}>
              <Box>Page</Box>
              <Spacer />
              <Box>Views</Box>
            </HStack>
            <HStack
              p={"10px"}
              fontSize={"16px"}
              borderColor={"gray.200"}
              borderWidth={"1px"}
              boxShadow={"md"}
              borderRadius={"4px"}
              w={"full"}
            >
              <Box>https://clickclarity.ai</Box>
              <Spacer />
              <Box>103.440</Box>
            </HStack>
          </Box>
        )}
      </VStack>
    </GridItem>
  );
};
