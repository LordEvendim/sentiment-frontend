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
import { format, subDays } from "date-fns";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

import { AverageMetric } from "#components/dashboard/AverageMetric";
import { GoogleAnalyticsSources } from "#components/dashboard/GoogleAnalyticsSources";
import { MetaCampaignSummaryMetric } from "#components/dashboard/MetaCampaignSummaryMetric";
import { MetricReport } from "#components/dashboard/MetricReport";
import { NamedMetric } from "#components/dashboard/NamedMetric";
import { SelectedChart } from "#components/dashboard/SelectedChart";
import { SpacerCard } from "#components/dashboard/SpacerCard";
import { useGetGeneralDashboardCompareData } from "#hooks/api/useGetGeneralDashboardCompareData";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";
import { useGetTopMetaCampaigns } from "#hooks/api/useGetTopMetaCampaigns";
import { useGhost } from "#hooks/useGhost";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

export const component = function Overview() {
  const [timeframe, setTimeframe] =
    useState<DashboardTimeframe>("last-14-days");
  const { data: dashbaordData, isFetching } =
    useGetGeneralDashboardData(timeframe);
  const { data: compareData } = useGetGeneralDashboardCompareData(timeframe);
  const { isFetching: isFetchingMetaCampaigns, campaigns: metaCampaigns } =
    useGetTopMetaCampaigns(timeframe);
  const isGhostMode = useGhost((state) => state.isGhostMode);

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
              <Box>{`${format(calculateTimeframeStart(new Date(Date.now()), timeframe), "MMM/dd/yyyy")} - ${format(subDays(Date.now(), 1), "MMM/dd/yyyy")}`}</Box>
            </HStack>
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={() => setTimeframe("last-7-days")}>
                Last 7 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-14-days")}>
                Last 14 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-90-days")}>
                Last 90 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-6-months")}>
                Last 6 months
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-year")}>
                Last year
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <Grid templateColumns="repeat(8, 1fr)" gap={"10px"} gridAutoRows={"80px"}>
        <GoogleAnalyticsSources colSpan={3} rowSpan={3} timeframe={timeframe} />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "spend",
              source: "meta-ads",
            },
            {
              metricId: "cost_micros",
              source: "google-ads",
            },
          ]}
          name="Spend"
          unitSymbol="USD"
          rowSpan={2}
          toFixed={0}
        />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "impressions",
              source: "meta-ads",
            },
            {
              metricId: "impressions",
              source: "google-ads",
            },
          ]}
          name="Ads Impressions"
          unitSymbol=""
          rowSpan={2}
          toFixed={0}
        />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "page_impressions",
              source: "meta-insights",
            },
          ]}
          name="Page impressions"
          unitSymbol=""
          rowSpan={2}
        />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "newUsers",
              source: "google-analytics",
            },
          ]}
          name="New users"
          unitSymbol=""
          rowSpan={2}
        />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "activeUsers",
              source: "google-analytics",
            },
          ]}
          name="Active users"
          unitSymbol=""
          rowSpan={2}
        />
        <SelectedChart colSpan={5} rowSpan={4} timeframe={timeframe} />
        {isGhostMode ? (
          <SpacerCard colSpan={3} rowSpan={2} />
        ) : (
          <MetricReport
            colSpan={3}
            rowSpan={2}
            timeframe={timeframe}
            metricDisplayName="Cost per click"
            name="cpc"
          />
        )}

        {isGhostMode ? (
          <SpacerCard colSpan={3} rowSpan={2} />
        ) : (
          <MetricReport
            colSpan={3}
            rowSpan={2}
            timeframe={timeframe}
            metricDisplayName="Spend"
            name="spend"
          />
        )}
        <MetaCampaignSummaryMetric
          description="Total amount of link clicks"
          metricId="inline_link_clicks"
          name="Link clicks"
          unitSymbol=""
          data={metaCampaigns}
          isFetching={isFetchingMetaCampaigns}
          rowSpan={2}
        />
        <AverageMetric
          data={dashbaordData}
          isFetching={isFetching}
          dividentMetricId="spend"
          divisorMetricId="clicks"
          source="meta-ads"
          name="Average CPC"
          unitSymbol="USD"
          rowSpan={2}
        />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "clicks",
              source: "google-ads",
            },
          ]}
          name="Ads clicks"
          unitSymbol=""
          rowSpan={2}
        />
        <AverageMetric
          data={dashbaordData}
          isFetching={isFetching}
          dividentMetricId="cost_micros"
          divisorMetricId="clicks"
          source="google-ads"
          name="Average CPC"
          unitSymbol="USD"
          rowSpan={2}
        />
        <NamedMetric
          data={dashbaordData}
          compareData={compareData}
          isFetching={isFetching}
          metricsConfig={[
            {
              metricId: "sessions",
              source: "google-analytics",
            },
          ]}
          name="Website sessions"
          unitSymbol=""
          rowSpan={2}
        />
        {isGhostMode ? (
          <SpacerCard colSpan={3} rowSpan={2} />
        ) : (
          <MetricReport
            colSpan={3}
            rowSpan={2}
            timeframe={timeframe}
            metricDisplayName="Clicks"
            name="clicks"
          />
        )}
      </Grid>
    </Box>
  );
};
