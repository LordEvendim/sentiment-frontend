import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";

import { AverageMetric } from "#components/dashboard/AverageMetric";
import { GoogleAnalyticsSources } from "#components/dashboard/GoogleAnalyticsSources";
import { MetaCampaignSummaryMetric } from "#components/dashboard/MetaCampaignSummaryMetric";
import { MetricReport } from "#components/dashboard/MetricReport";
import { NamedMetric } from "#components/dashboard/NamedMetric";
import { ReferenceChart } from "#components/dashboard/ReferenceChart";
import { SelectedChart } from "#components/dashboard/SelectedChart";
import { SpacerCard } from "#components/dashboard/SpacerCard";
import { TimeframePicker } from "#components/timeframePicker";
import { useGetTopMetaCampaigns } from "#hooks/api/meta/useGetTopMetaCampaigns";
import { useGetGeneralDashboardCompareData } from "#hooks/api/useGetGeneralDashboardCompareData";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";
import { DashboardTimeframe } from "#utils/timeframes";

export const component = function Overview() {
  const [timeframe, setTimeframe] =
    useState<DashboardTimeframe>("last-14-days");
  const { data: dashbaordData, isFetching } =
    useGetGeneralDashboardData(timeframe);
  const { data: compareData } = useGetGeneralDashboardCompareData(timeframe);
  const { isFetching: isFetchingMetaCampaigns, campaigns: metaCampaigns } =
    useGetTopMetaCampaigns(timeframe);

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
        <TimeframePicker setTimeframe={setTimeframe} timeframe={timeframe} />
      </Flex>
      <Grid templateColumns="repeat(8, 1fr)" gap={"10px"} gridAutoRows={"80px"}>
        <GoogleAnalyticsSources colSpan={8} rowSpan={4} timeframe={timeframe} />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Cost per click"
          name="cpc"
        />
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
          toFixed={0}
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
          toFixed={0}
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
          toFixed={0}
        />

        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Spend"
          name="spend"
        />
        <SelectedChart colSpan={5} rowSpan={4} timeframe={timeframe} />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Impressions"
          name="impressions"
        />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Conversion Rate"
          name="conversionRate"
        />
        <ReferenceChart colSpan={5} rowSpan={4} timeframe={timeframe} />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Website sessions"
          name="sessions"
        />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Clicks"
          name="clicks"
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
          toFixed={0}
        />
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
          toFixed={0}
        />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Click through rate"
          name="ctr"
        />
        <SpacerCard colSpan={5} rowSpan={2} />
        <MetricReport
          colSpan={3}
          rowSpan={2}
          timeframe={timeframe}
          metricDisplayName="Conversions"
          name="conversions"
        />
      </Grid>
    </Box>
  );
};
