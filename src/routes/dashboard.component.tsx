import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { IoCalendarClearOutline } from "react-icons/io5";

import { Chart } from "#components/dashboard/Chart";
import { NamedMetric } from "#components/dashboard/NamedMetric";
import { PageViewReport } from "#components/dashboard/PageViewReport";
import { TopRunningCampgains } from "#components/dashboard/TopRunningCampgains";
import { useGenerateReport } from "#hooks/api/useGenerateReport";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";
import { useGetReport } from "#hooks/api/useGetReport";

export const component = function Dashboard() {
  const { data: dashbaordData, isFetching } = useGetGeneralDashboardData();
  const { generateReport, isPending: isGeneratingReport } = useGenerateReport();
  const { report } = useGetReport();

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Flex mb={"10px"} ml={"10px"}>
        <Text
          color={"gray.600"}
          fontWeight={800}
          fontSize={"x-large"}
          marginRight={"10px"}
        >
          Overview
        </Text>
        <Spacer />
        <HStack
          background={"white"}
          color={"gray.600"}
          borderRadius={"5px"}
          alignItems={"center"}
          justifyContent={"center"}
          px={"15px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          spacing={"10px"}
        >
          <Box>6 May 2024 - 13 May 2024</Box>
          <IoCalendarClearOutline />
        </HStack>
      </Flex>
      <Grid templateColumns="repeat(8, 1fr)" gap={"5px"}>
        <GridItem
          p={"15px"}
          background={"white"}
          borderRadius={"10px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          colSpan={3}
          rowSpan={6}
          alignSelf={"stretch"}
        >
          <HStack mb={"20px"}>
            <Heading fontSize={"2xl"}>Weekly report</Heading>
            <Spacer />
            <Button
              background={"blue.400"}
              color={"white"}
              shadow={"md"}
              onClick={() => generateReport()}
              isLoading={isGeneratingReport}
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
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="spend"
          name="Spend"
          unitSymbol="USD"
          key={"spend"}
          colSpan={1}
          rowSpan={1}
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="impressions"
          name="Impressions"
          unitSymbol=""
          key={"impressions"}
          colSpan={1}
          rowSpan={1}
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="impressions"
          source="meta-insights"
          name="Page impressions"
          unitSymbol=""
          key={"page-impressions"}
          colSpan={1}
          rowSpan={1}
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="newUsers"
          source="google-analytics"
          name="New users"
          unitSymbol=""
          key={"newUsers"}
          colSpan={1}
          rowSpan={1}
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="activeUsers"
          source="google-analytics"
          name="Active users"
          unitSymbol=""
          key={"activeUsers"}
          colSpan={1}
          rowSpan={1}
        />
        <Chart
          colSpan={3}
          rowSpan={2}
          metrics={["activeUsers"]}
          key={"chart:activeUsers"}
        />
        <PageViewReport isFetching={isFetching} colSpan={2} rowSpan={2} />
        <TopRunningCampgains isFetching={isFetching} colSpan={5} rowSpan={3} />
      </Grid>
    </Box>
  );
};
