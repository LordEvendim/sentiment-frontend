import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Spinner,
} from "@chakra-ui/react";

import { useGenerateReport } from "#hooks/api/useGenerateReport";
import { useGetMetaIntegration } from "#hooks/api/useGetMetaIntegration";
import { useGetReport } from "#hooks/api/useGetReport";

export const component = function Dashboard() {
  const { metaIntegration, isFetching: isFetchingMetaIntegration } =
    useGetMetaIntegration();
  const { generateReport, isPending: isGeneratingReport } = useGenerateReport();
  const { report } = useGetReport();

  return (
    <Box w={"full"} h={"full"} p={"15px"}>
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
        {/* {insights?.map((metric) => (
          <GridItem
            p={"25px"}
            pb={"10px"}
            background={"white"}
            borderRadius={"15px"}
            borderColor={"gray.200"}
            borderWidth={"1px"}
            boxShadow={"md"}
            key={metric.metricId}
          >
            <HStack justifyContent={"center"} mb={"20px"}>
              <Heading fontSize={"lg"}>
                {capitalizeFirstLetter(metric.name ?? "").replaceAll("_", " ")}
                {metric.period && (
                  <Box
                    display={"inline-block"}
                    fontSize={"xs"}
                    fontWeight={"normal"}
                    ml={"10px"}
                  >
                    {metric.period.replaceAll("_", " ")}
                  </Box>
                )}
              </Heading>
              <Spacer />
              <Tooltip label={metric.description} p={"10px"}>
                <span>
                  <IoInformationCircleOutline size={"20px"} />
                </span>
              </Tooltip>
            </HStack>
            <HStack fontSize={"lg"} fontWeight={"extrabold"} mb={"10px"}>
              <Box>{metric.value}</Box>
              <Spacer />
              <Box fontSize={"xs"} fontWeight={"normal"}>
                {new Date(metric.endTime).toLocaleDateString()}
              </Box>
            </HStack>
          </GridItem>
        ))} */}
      </Grid>
    </Box>
  );
};
