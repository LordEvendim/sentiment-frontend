import {
  Box,
  Center,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CustomTooltip } from "#components/charts/CustomTooltip";
import { useGetChartData } from "#hooks/api/useGetChartData";
import { useOverviewDashbaord } from "#hooks/useOverviewDashboard";
import { ReportMetricSource } from "#types/report";
import { DashboardTimeframe } from "#utils/timeframes";

const CHART_COLORS: Record<ReportMetricSource, string> = {
  "google-ads": "#d62424",
  "google-analytics": "#d62424",
  "meta-ads": "#3f82d9",
  "meta-insights": "#3f82d9",
};

export const ReferenceChart: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
  timeframe: DashboardTimeframe;
}> = ({ colSpan, rowSpan, timeframe }) => {
  const selectedMetric = useOverviewDashbaord(
    (state) => state.selectedReferenceMetric
  );

  const { data, isFetching } = useGetChartData(
    selectedMetric.metrics,
    timeframe
  );
  const transformedChartData = useMemo(() => {
    if (!data) return [];

    const timestampMap: Record<
      number,
      { time?: Date } & {
        [key in ReportMetricSource]?: number;
      }
    > = {};

    for (const [source, sourceData] of Object.entries(data.data)) {
      for (const datapoint of sourceData) {
        const timestamp = datapoint[1];

        if (timestampMap[timestamp]) {
          timestampMap[timestamp][source as ReportMetricSource] = datapoint[0];
        } else {
          timestampMap[timestamp] = {};
          timestampMap[timestamp].time = new Date(timestamp);
          timestampMap[timestamp][source as ReportMetricSource] = datapoint[0];
        }
      }
    }

    return Object.values(timestampMap);
  }, [data]);
  const maxSum = useMemo(() => {
    if (!transformedChartData) return 0;

    const maxes: Partial<Record<ReportMetricSource, number>> = {};

    for (let i = 0; i < transformedChartData.length; i++) {
      for (const [key, value] of Object.entries(transformedChartData[i])) {
        if (key === "time") continue;

        maxes[key as ReportMetricSource] = Math.max(
          value as number,
          maxes[key as ReportMetricSource] ?? 0
        );
      }
    }

    return Object.values(maxes).reduce((partialSum, a) => partialSum + a, 0);
  }, [transformedChartData]);

  if (isFetching) {
    return (
      <GridItem
        p={"20px"}
        pb={"10px"}
        background={"white"}
        borderRadius={"8px"}
        boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        <Center mt={"100px"}>
          <Spinner size={"sm"} />
        </Center>
      </GridItem>
    );
  }

  return (
    <GridItem
      p={"25px"}
      pb={"10px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <HStack justifyContent={"center"} mb={"20px"}>
        <Heading fontSize={"lg"} fontWeight={400}>
          {selectedMetric.name}
        </Heading>
        <Spacer />
        <Tooltip label={selectedMetric.name} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <Box w={"full"} h={"250px"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedChartData ?? []}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            syncId="syncId"
          >
            <CartesianGrid
              strokeDasharray={"4 4"}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              style={{
                fontSize: "0.8rem",
              }}
              tickFormatter={(tick) => format(tick, "MMM dd")}
              tickCount={5}
            />
            <YAxis
              dataKey="value"
              domain={[0, Math.ceil(Math.max(maxSum + maxSum * 0.1, 5))]}
              style={{
                fontSize: "0.8rem",
              }}
              allowDecimals={false}
            />
            <RechartsTooltip
              content={
                <CustomTooltip showTotal={selectedMetric.metrics.length > 1} />
              }
              cursor={{ fill: "transparent" }}
            />
            {selectedMetric.metrics.map((metric) => (
              <defs key={metric.metricId + metric.source + "defs"}>
                <linearGradient
                  id={metric.metricId + metric.source}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="20%"
                    stopColor={CHART_COLORS[metric.source!]}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={CHART_COLORS[metric.source!]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
            ))}
            {selectedMetric.metrics.map((metric) => (
              <Area
                key={metric.metricId + metric.source}
                dataKey={metric.source}
                stackId="1"
                type="monotone"
                stroke={CHART_COLORS[metric.source!]}
                fill={
                  selectedMetric.metrics.length > 1
                    ? CHART_COLORS[metric.source!]
                    : `url(#${metric.metricId + metric.source})`
                }
                fillOpacity={0.2}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                name={metric.source}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </GridItem>
  );
};
