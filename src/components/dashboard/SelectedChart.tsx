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
import { DashboardTimeframe } from "#utils/timeframes";

export const SelectedChart: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
  timeframe: DashboardTimeframe;
}> = ({ colSpan, rowSpan, timeframe }) => {
  const selectedMetric = useOverviewDashbaord((state) => state.selectedMetric);

  const { data, isFetching } = useGetChartData(
    timeframe,
    selectedMetric.metricId,
    selectedMetric.source
  );
  const transformedChartData = useMemo(
    () =>
      data?.data.map((datapoint) => ({
        value: datapoint[0],
        time: new Date(datapoint[1]),
      })),
    [data]
  );

  if (isFetching) {
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
                Math.ceil(Math.max(dataMax + 0.1 * dataMax, 5)),
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
              name={selectedMetric.name}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </GridItem>
  );
};
