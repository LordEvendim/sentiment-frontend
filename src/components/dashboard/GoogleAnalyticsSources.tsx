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
import { format, parse } from "date-fns";
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
import { useGetSourcesData } from "#hooks/api/useGetSourcesData";
import { DashboardTimeframe } from "#utils/timeframes";

const CHART_COLORS = [
  "#FFA420",
  "#CB2821",
  "#0E294B",
  "#2271B3",
  "#008F39",
  "#193737",
  "#AF2B1E",
  "#F3A505",
  "#642424",
  "#25221B",
];

export const GoogleAnalyticsSources: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
  timeframe: DashboardTimeframe;
}> = ({ colSpan, rowSpan, timeframe }) => {
  const { sources, isFetching } = useGetSourcesData(timeframe);

  const transformedChartData = useMemo(() => {
    if (!sources || sources.length === 0) return [];

    let lastDate = sources[0].created_at;
    const result: ({
      [key: string]: number;
    } & { time: Date })[] = [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      {
        time: parse(lastDate, "yyyy-MM-dd", Date.now()),
      },
    ];

    for (let i = 0; i < sources.length; i++) {
      const datapoint = sources[i];

      if (datapoint.created_at === lastDate) {
        result[result.length - 1][datapoint.source] = datapoint.sessions;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        result.push({
          time: parse(datapoint.created_at, "yyyy-MM-dd", Date.now()),
          [datapoint.source]: datapoint.sessions as number,
        });
        lastDate = datapoint.created_at;
      }
    }

    return result;
  }, [sources]);
  const sourcesNames = useMemo(() => {
    if (!sources) return [];

    const set = new Set<string>();

    for (let i = 0; i < sources.length; i++) {
      set.add(sources[i].source);
    }

    return Array.from(set);
  }, [sources]);
  const maxSum = useMemo(() => {
    if (!transformedChartData) return 0;

    let currentMax = 0;

    for (let i = 0; i < transformedChartData.length; i++) {
      let sum = 0;

      for (const [key, value] of Object.entries(transformedChartData[i])) {
        if (key === "time") continue;

        sum += value as number;
      }

      currentMax = Math.max(currentMax, sum);
    }

    return currentMax;
  }, [transformedChartData]);

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
      p={"20px"}
      pb={"10px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <HStack justifyContent={"center"} mb={"20px"}>
        <Heading fontSize={"lg"} fontWeight={400}>
          Traffic sources
        </Heading>
        <Spacer />
        <Tooltip
          label={"Top sources of the traffic to your website"}
          p={"10px"}
        >
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <Box w={"full"} h={"170px"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedChartData ?? []}
            margin={{
              top: 20,
              right: 20,
              left: -20,
              bottom: -10,
            }}
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
              wrapperStyle={{ zIndex: 1000 }}
              content={<CustomTooltip showTotal={true} />}
              cursor={{ fill: "transparent" }}
            />
            {sourcesNames.map((source, i) => (
              <defs key={source + "defs"}>
                <linearGradient id={source} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="20%"
                    stopColor={CHART_COLORS[i]}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={CHART_COLORS[i]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
            ))}
            {sourcesNames.map((source, i) => (
              <Area
                key={source}
                dataKey={source}
                stackId="1"
                type="monotone"
                stroke={CHART_COLORS[i]}
                fill={
                  sourcesNames.length > 1 ? CHART_COLORS[i] : `url(#${source})`
                }
                fillOpacity={0.15}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                name={source}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </GridItem>
  );
};
