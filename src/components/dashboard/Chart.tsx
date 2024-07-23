import {
  Box,
  GridItem,
  Heading,
  HStack,
  Spacer,
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
import { ReportData, ReportMetricSource } from "#types/report";

export const Chart: React.FC<{
  metrics: string[];
  data: ReportData | undefined;
  colSpan: number | "auto";
  rowSpan: number | "auto";
  label?: string;
}> = ({ colSpan, rowSpan, metrics, data, label }) => {
  const chartData = useMemo(
    () =>
      data?.filter((value) => metrics.includes(value.metricId)) as
        | {
            display: "chart";
            metricId: string;
            source: ReportMetricSource;
            values: [number, number][];
          }[]
        | undefined,
    [data, metrics]
  );
  const transformedChartData = useMemo(
    () =>
      chartData?.map((metric) => ({
        ...metric,
        values: metric.values.map((datapoint) => ({
          time: new Date(datapoint[0]),
          value: datapoint[1],
        })),
      })),
    [chartData]
  );

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
          Ad spend
        </Heading>
        <Spacer />
        <Tooltip label={label} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <Box w={"full"} h={"250px"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedChartData?.[0]?.values ?? []}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              domain={([, dataMax]) => [
                0,
                Math.ceil(Math.max(dataMax + 0.1 * dataMax, 100)),
              ]}
              style={{
                fontSize: "0.8rem",
              }}
              allowDecimals={false}
            />
            <RechartsTooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="url(#colorSpend)"
              strokeWidth={2}
              fillOpacity={0.8}
              strokeLinejoin="round"
              strokeLinecap="round"
              name={"Meta spend"}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </GridItem>
  );
};
