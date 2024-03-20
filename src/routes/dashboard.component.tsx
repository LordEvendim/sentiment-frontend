import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

import { useGenerateReport } from "#hooks/api/useGenerateReport";
import { useGetMetaIntegration } from "#hooks/api/useGetMetaIntegration";
import { useGetReport } from "#hooks/api/useGetReport";

export const component = function Dashboard() {
  const { metaIntegration, isFetching: isFetchingMetaIntegration } =
    useGetMetaIntegration();
  const { generateReport, isPending: isGeneratingReport } = useGenerateReport();
  const { report } = useGetReport();

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Text
        color={"gray.700"}
        mb={"20px"}
        ml={"20px"}
        fontWeight={800}
        fontSize={"xx-large"}
      >
        Dashboard
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={"15px"}>
        <GridItem
          p={"30px"}
          background={"white"}
          borderRadius={"15px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          colSpan={2}
          rowSpan={3}
        >
          <HStack mb={"20px"}>
            <Heading fontSize={"2xl"}>Weekly report</Heading>
            <Spacer />
            <Button
              background={"blue.400"}
              color={"white"}
              shadow={"md"}
              onClick={() => generateReport()}
              isLoading={isGeneratingReport || isFetchingMetaIntegration}
              isDisabled={!metaIntegration?.accessToken}
            >
              Generate
            </Button>
          </HStack>
          <Box>
            {report?.split("\n").map((part) => (
              <Box
                mt={"2px"}
                fontWeight={part.includes("**") ? "bold" : "normal"}
              >
                {part.replaceAll("**", "").replaceAll("*", "-")}
              </Box>
            ))}
          </Box>
        </GridItem>
        {isFetchingMetaIntegration && (
          <GridItem
            p={"30px"}
            background={"white"}
            borderRadius={"15px"}
            borderColor={"gray.200"}
            borderWidth={"1px"}
            boxShadow={"md"}
            colSpan={2}
            height={"200px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.5s"}
          >
            <Spinner size={"md"} />
          </GridItem>
        )}
        <GridItem
          p={"25px"}
          pb={"10px"}
          background={"white"}
          borderRadius={"15px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
        >
          <HStack justifyContent={"center"} mb={"20px"}>
            <Heading fontSize={"lg"} fontWeight={400}>
              Ad spend
            </Heading>
            <Spacer />
            <Tooltip
              label={"Total amount of money spent on ads in the current week"}
              p={"10px"}
            >
              <span>
                <IoInformationCircleOutline size={"20px"} />
              </span>
            </Tooltip>
          </HStack>
          <HStack
            fontSize={"2xl"}
            fontWeight={"extrabold"}
            mb={"10px"}
            alignItems={"baseline"}
          >
            <Box>0.10</Box>
            <Box fontSize={"small"} color={"gray.700"}>
              USD
            </Box>
          </HStack>
        </GridItem>
        <GridItem
          p={"25px"}
          pb={"10px"}
          background={"white"}
          borderRadius={"15px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
        >
          <HStack justifyContent={"center"} mb={"20px"}>
            <Heading fontSize={"lg"} fontWeight={400}>
              Visitors
            </Heading>
            <Spacer />
            <Tooltip
              label={"Total amount of money spent on ads in the current week"}
              p={"10px"}
            >
              <span>
                <IoInformationCircleOutline size={"20px"} />
              </span>
            </Tooltip>
          </HStack>
          <HStack
            fontSize={"2xl"}
            fontWeight={"extrabold"}
            mb={"10px"}
            alignItems={"baseline"}
          >
            <Box>201</Box>
            <Box fontSize={"small"} color={"gray.700"}>
              users
            </Box>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
