import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/react";
import { addDays, subDays, subWeeks } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { IoCalendarClearOutline } from "react-icons/io5";

import { Chart } from "#components/dashboard/Chart";
import { NamedMetric } from "#components/dashboard/NamedMetric";
import { Report } from "#components/dashboard/Report";
import { TopMetaCampgains } from "#components/dashboard/TopMetaCampgains";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";

const MAX_DATE_RANGE = 30;

export const component = function Dashboard() {
  const { data: dashbaordData, isFetching } = useGetGeneralDashboardData();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    subWeeks(Date.now(), 1),
    new Date(Date.now()),
  ]);
  const [startDate, endDate] = dateRange;
  const [maxDate, setMaxDate] = useState<Date>(
    subDays(new Date(Date.now()), 1)
  );

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Flex mb={"10px"} mx={"20px"}>
        <Text
          color={"gray.600"}
          fontWeight={800}
          fontSize={"x-large"}
          marginRight={"10px"}
        >
          Overview
        </Text>
        <Spacer />
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          maxDate={maxDate}
          onChange={(update) => {
            const startDate = update[0];

            if (startDate) {
              setMaxDate(
                new Date(
                  Math.min(
                    subDays(new Date(Date.now()), 1).getTime(),
                    addDays(startDate, MAX_DATE_RANGE).getTime()
                  )
                )
              );
            }

            setDateRange(update);
          }}
          icon={<IoCalendarClearOutline size={"10px"} />}
          showIcon={true}
          // showPreviousMonths
          // monthsShown={2}
          onCalendarClose={() => {
            console.log("closing calendar");
          }}
          disabled
        />
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
          metricId="page_impressions"
          source="meta-insights"
          name="Page impressions"
          unitSymbol=""
          key={"page_impressions"}
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
          label="Ad spend"
        />
        {/* <PageViewReport isFetching={isFetching} colSpan={2} rowSpan={2} /> */}
        <TopMetaCampgains isFetching={isFetching} colSpan={5} rowSpan={2} />
      </Grid>
    </Box>
  );
};
