import { Box, Flex, Grid, HStack, Spacer, Text } from "@chakra-ui/react";
import { IoCalendarClearOutline } from "react-icons/io5";

import { Chart } from "#components/dashboard/Chart";
import { NamedMetric } from "#components/dashboard/NamedMetric";
import { Report } from "#components/dashboard/Report";
import { TopRunningCampgains } from "#components/dashboard/TopRunningCampgains";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";

export const component = function Dashboard() {
  const { data: dashbaordData, isFetching } = useGetGeneralDashboardData();

  console.log(dashbaordData);

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
      <Grid templateColumns="repeat(8, 1fr)" gap={"5px"} gridAutoRows={"120px"}>
        <Report colSpan={3} rowSpan={6} />
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
          colSpan={5}
          rowSpan={3}
          metrics={["spend"]}
          key={"chart:spend"}
          data={dashbaordData}
        />
        {/* <PageViewReport isFetching={isFetching} colSpan={2} rowSpan={2} /> */}
        <TopRunningCampgains isFetching={isFetching} colSpan={5} rowSpan={2} />
      </Grid>
    </Box>
  );
};
