import {
  Box,
  Flex,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { subDays } from "date-fns";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

import { Chart } from "#components/dashboard/Chart";
import { MetaCampaignSummaryMetric } from "#components/dashboard/MetaCampaignSummaryMetric";
import { NamedMetric } from "#components/dashboard/NamedMetric";
import { Report } from "#components/dashboard/Report";
import { TopGoogleCampgains } from "#components/dashboard/TopGoogleCampgains";
import { TopMetaCampgains } from "#components/dashboard/TopMetaCampgains";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";
import { useGetTopGoogleCampaigns } from "#hooks/api/useGetTopGoogleCampaigns";
import { useGetTopMetaCampaigns } from "#hooks/api/useGetTopMetaCampaigns";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

export const component = function Dashboard() {
  const [timeframe, setTimeframe] = useState<DashboardTimeframe>("last-week");
  const { data: dashbaordData, isFetching } =
    useGetGeneralDashboardData(timeframe);
  const { isFetching: isFetchingMetaCampaigns, campaigns: metaCampaigns } =
    useGetTopMetaCampaigns(timeframe);
  const { isFetching: isFetchingGoogleCampaigns, campaigns: googleCampaigns } =
    useGetTopGoogleCampaigns(timeframe);

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Flex mb={"10px"}>
        <Text
          color={"gray.600"}
          fontWeight={800}
          fontSize={"x-large"}
          marginLeft={"20px"}
        >
          Overview
        </Text>
        <Spacer />
        <Menu>
          <MenuButton>
            <HStack
              background={"white"}
              borderRadius={"6px"}
              borderColor={"gray.200"}
              borderWidth={"1px"}
              boxShadow={"md"}
              px={"12px"}
              py={"8px"}
              fontSize={"14px"}
              fontWeight={"semibold"}
              color={"gray.500"}
            >
              <IoCalendarOutline size={"15px"} />
              <Box>{`${calculateTimeframeStart(new Date(Date.now()), timeframe).toLocaleDateString()} - ${subDays(Date.now(), 1).toLocaleDateString()}`}</Box>
            </HStack>
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={() => setTimeframe("last-week")}>
                Last week
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-month")}>
                Last month
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-90-days")}>
                Last 90 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-year")}>
                Last year
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <Grid templateColumns="repeat(8, 1fr)" gap={"5px"} gridAutoRows={"120px"}>
        <Report colSpan={3} rowSpan={5} />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="spend"
          name="Spend"
          unitSymbol="USD"
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="impressions"
          name="Ads Impressions"
          unitSymbol=""
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="page_impressions"
          source="meta-insights"
          name="Page impressions"
          unitSymbol=""
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="newUsers"
          source="google-analytics"
          name="New users"
          unitSymbol=""
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="activeUsers"
          source="google-analytics"
          name="Active users"
          unitSymbol=""
        />
        <Chart
          metrics={["spend"]}
          data={dashbaordData}
          label="Ad spend"
          colSpan={5}
          rowSpan={3}
        />
        <MetaCampaignSummaryMetric
          description="Total amount of link clicks"
          metricId="clicks"
          name="Link clicks"
          unitSymbol=""
          data={metaCampaigns}
          isFetching={isFetchingMetaCampaigns}
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="activeUsers"
          source="google-ads"
          name="Ads clicks"
          unitSymbol=""
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="cpc"
          source="meta-ads"
          name="Average CPC"
          unitSymbol="USD"
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="cpc"
          source="google-ads"
          name="Average CPC"
          unitSymbol="USD"
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="sessions"
          source="google-analytics"
          name="Website sessions"
          unitSymbol=""
        />
        {/* <PageViewReport isFetching={isFetching} colSpan={2} rowSpan={2} /> */}
        <TopMetaCampgains
          isFetching={isFetchingMetaCampaigns}
          colSpan={8}
          rowSpan={3}
          data={metaCampaigns}
        />
        <TopGoogleCampgains
          isFetching={isFetchingGoogleCampaigns}
          colSpan={8}
          rowSpan={3}
          data={googleCampaigns}
        />
      </Grid>
    </Box>
  );
};
