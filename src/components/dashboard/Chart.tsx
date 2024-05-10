import {
  Box,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { format } from "date-fns";
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

const data = [
  {
    clicks: "1318",
    impressions: "38747",
    spend: "304.97",
    reach: "27999",
    cpc: "0.231388",
    date_start: "2024-02-27",
    date_stop: "2024-02-27",
  },
  {
    clicks: "1085",
    impressions: "37853",
    spend: "281.7",
    reach: "29182",
    cpc: "0.259631",
    date_start: "2024-02-28",
    date_stop: "2024-02-28",
  },
  {
    clicks: "900",
    impressions: "34348",
    spend: "265.02",
    reach: "27501",
    cpc: "0.294467",
    date_start: "2024-02-29",
    date_stop: "2024-02-29",
  },
  {
    clicks: "1100",
    impressions: "50348",
    spend: "290.02",
    reach: "41501",
    cpc: "0.324467",
    date_start: "2024-02-30",
    date_stop: "2024-02-30",
  },
].map((dataPoint) => ({
  ...dataPoint,
  spend: parseFloat(dataPoint.spend),
  clicks: parseInt(dataPoint.clicks),
  cpc: parseFloat(dataPoint.cpc),
}));

export const Chart: React.FC<{
  metrics: string[];
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ colSpan, rowSpan }) => {
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
      <Box w={"full"} h={"300px"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray={"4 4"}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date_stop"
              style={{
                fontSize: "0.8rem",
              }}
              tickFormatter={(tick) => format(tick, "MMM dd")}
              tickCount={5}
            />
            <YAxis
              domain={([, dataMax]) => [0, Math.ceil(dataMax + 0.1 * dataMax)]}
              style={{
                fontSize: "0.8rem",
              }}
              allowDecimals={false}
            />
            <RechartsTooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              position={{ y: 100 }}
            />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#8884d8"
              fill="url(#colorSpend)"
              strokeWidth={2}
              fillOpacity={0.8}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#82ca9d"
              fill="url(#colorClicks)"
              strokeWidth={2}
              fillOpacity={0.8}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </GridItem>
  );
};
