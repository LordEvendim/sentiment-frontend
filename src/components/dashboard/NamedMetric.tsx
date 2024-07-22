import {
  Box,
  GridItem,
  Heading,
  HStack,
  Image,
  Spacer,
  Spinner,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Tooltip,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdMergeType } from "react-icons/md";

import GoogleLogo from "#assets/integrations/google.png";
import MetaLogo from "#assets/integrations/meta.png";
import { useOverviewDashbaord } from "#hooks/useOverviewDashboard";
import { ReportData, ReportMetricSource } from "#types/report";

const dataSourcesLogos: Record<ReportMetricSource, string> = {
  "google-ads": GoogleLogo,
  "google-analytics": GoogleLogo,
  "meta-ads": MetaLogo,
  "meta-insights": MetaLogo,
};

export const NamedMetric: React.FC<{
  name: string;
  isFetching: boolean;
  data: ReportData | undefined;
  compareData: ReportData | undefined;
  metricId: string;
  source?: ReportMetricSource;
  unitSymbol?: string;
  colSpan?: number | "auto";
  rowSpan?: number | "auto";
  toFixed?: number;
}> = ({
  data,
  compareData,
  isFetching,
  metricId,
  unitSymbol,
  name,
  colSpan = 1,
  rowSpan = 1,
  source,
  toFixed = 2,
}) => {
  const metrics = useMemo(
    () =>
      data?.filter(
        (value) =>
          value.metricId === metricId &&
          value.display === "metric" &&
          (source ? value.source === source : true)
      ) as
        | {
            display: "metric";
            metricId: string;
            source: ReportMetricSource;
            value: number;
          }[]
        | undefined,

    [data, metricId, source]
  );
  const compareMetrics = useMemo(
    () =>
      compareData?.filter(
        (value) =>
          value.metricId === metricId &&
          value.display === "metric" &&
          (source ? value.source === source : true)
      ) as
        | {
            display: "metric";
            metricId: string;
            source: ReportMetricSource;
            value: number;
          }[]
        | undefined,

    [compareData, metricId, source]
  );
  const value = useMemo(
    () =>
      metrics?.reduce((accumulator, metric) => accumulator + metric.value, 0) ??
      0,
    [metrics]
  );
  const compareValue = useMemo(
    () =>
      (compareMetrics?.reduce(
        (accumulator, metric) => accumulator + metric.value,
        0
      ) ?? 0) - value ?? 0,
    [compareMetrics, value]
  );
  const description = useMemo(
    () =>
      metrics
        ?.map(
          (metric) =>
            `${metric.source.replaceAll("-", " ")}: ${metric.value.toFixed(2)}`
        )
        .join(" \n "),
    [metrics]
  );
  const percentageChange = useMemo(
    () => (100 * (value - compareValue)) / Math.abs(compareValue) ?? 0,
    [compareValue, value]
  );

  const selectChartMetric = useOverviewDashbaord((state) => state.select);

  return (
    <GridItem
      p={"15px"}
      pb={"10px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
      colSpan={colSpan}
      rowSpan={rowSpan}
      display={"flex"}
      alignSelf={"stretch"}
      flexDir={"column"}
      cursor={"pointer"}
      onClick={() =>
        selectChartMetric({
          metricId,
          name,
          source: source ?? "meta-ads",
        })
      }
    >
      <HStack justifyContent={"center"}>
        {source === undefined ? (
          <Tooltip label="Metric combined from a few data sources" p={"10px"}>
            <span>
              <MdMergeType size={"20px"} />
            </span>
          </Tooltip>
        ) : (
          <Image src={dataSourcesLogos[source!]} height={"20px"} />
        )}
        <Heading fontSize={"16px"} fontWeight={400}>
          {name}
        </Heading>
        <Spacer />
        <Tooltip label={description} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <Spacer />
      <HStack fontSize={"xl"} fontWeight={"normal"} alignItems={"baseline"}>
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <Stat>
            <StatHelpText
              mb={"-2px"}
              fontSize={"12px"}
              color={percentageChange >= 0 ? "green.600" : "red.600"}
            >
              <StatArrow
                type={percentageChange >= 0 ? "increase" : "decrease"}
                height={"12px"}
              />
              {(isNaN(percentageChange) ? 0 : percentageChange).toFixed(2)} %
            </StatHelpText>
            <StatNumber
              flexDir={"row"}
              display={"flex"}
              alignItems={"baseline"}
            >
              <Box fontSize={"xl"} fontWeight={"normal"}>
                {(Number.isInteger(value) ? value : value.toFixed(toFixed))
                  .toLocaleString("en")
                  .replaceAll(",", " ")}
              </Box>
              <Box
                fontSize={"small"}
                color={"gray.700"}
                ml={"5px"}
                fontWeight={"normal"}
              >
                {unitSymbol ?? ""}
              </Box>
            </StatNumber>
          </Stat>
        )}
      </HStack>
    </GridItem>
  );
};
