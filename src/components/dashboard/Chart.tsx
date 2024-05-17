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
}> = ({ colSpan, rowSpan, metrics, data }) => {
  const chartData = useMemo(
    () =>
      data?.filter(
        (value) => metrics.includes(value.metricId) && value.display === "chart"
      ) as
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
      borderRadius={"15px"}
      borderColor={"gray.200"}
      borderWidth={"1px"}
      boxShadow={"md"}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <HStack justifyContent={"center"} mb={"20px"}>
        <Heading fontSize={"lg"} fontWeight={400}>
          Ad spend
        </Heading>
        <Spacer />
        <Tooltip label={"Your ads impressions over time"} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <Box w={"full"} h={"250px"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedChartData?.[0].values ?? []}
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
            {/* <RechartsTooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              position={{ y: 100 }}
              labelFormatter={(label) => format(label, "MMM dd yyyy")}
            /> */}
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
