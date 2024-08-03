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
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdMergeType } from "react-icons/md";

import { useOverviewDashbaord } from "#hooks/useOverviewDashboard";
import { dataSourcesLogos } from "#modules/logos";
import { ReportData, ReportMetricSource } from "#types/report";

export const NamedMetric: React.FC<{
  name: string;
  isFetching: boolean;
  data: ReportData | undefined;
  compareData: ReportData | undefined;
  metricsConfig: {
    metricId: string;
    source: ReportMetricSource;
  }[];
  unitSymbol?: string;
  colSpan?: number | "auto";
  rowSpan?: number | "auto";
  toFixed?: number;
}> = ({
  data,
  compareData,
  isFetching,
  metricsConfig,
  unitSymbol,
  name,
  colSpan = 1,
  rowSpan = 1,
  toFixed = 2,
}) => {
  const metrics = useMemo(() => {
    if (!data) return [];

    const result: {
      metricId: string;
      source: ReportMetricSource;
      value: number;
    }[] = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < metricsConfig.length; j++) {
        if (
          data[i].metricId === metricsConfig[j].metricId &&
          data[i].source === metricsConfig[j].source
        )
          result.push(data[i]);
      }
    }

    return result;
  }, [data, metricsConfig]);
  const compareMetrics = useMemo(() => {
    if (!compareData) return [];

    const result: {
      metricId: string;
      source: ReportMetricSource;
      value: number;
    }[] = [];

    for (let i = 0; i < compareData.length; i++) {
      for (let j = 0; j < metricsConfig.length; j++) {
        if (
          compareData[i].metricId === metricsConfig[j].metricId &&
          compareData[i].source === metricsConfig[j].source
        )
          result.push(compareData[i]);
      }
    }

    return result;
  }, [compareData, metricsConfig]);
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
      ) ?? 0) - value,
    [compareMetrics, value]
  );
  const description = useMemo(
    () =>
      metrics?.map((metric) => (
        <Box
          key={metric.metricId + metric.source}
        >{`${metric.source.replaceAll("-", " ")} : ${metric.value.toFixed(toFixed)} ${unitSymbol}`}</Box>
      )),
    [metrics, toFixed, unitSymbol]
  );
  const percentageChange = useMemo(
    () => (100 * (value - compareValue)) / Math.abs(compareValue),
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
          metrics: metricsConfig,
          name: name,
        })
      }
    >
      <HStack justifyContent={"center"} h={"50px"} alignItems={"start"}>
        {metricsConfig.length > 1 ? (
          <Tooltip label="Metric combined from a few data sources" p={"10px"}>
            <span>
              <MdMergeType size={"20px"} />
            </span>
          </Tooltip>
        ) : (
          <Image
            src={dataSourcesLogos[metricsConfig[0].source!]}
            height={"20px"}
          />
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
      {metrics.length > 0 ? (
        <Box
          fontSize={"small"}
          color={"gray.600"}
          fontWeight={"semibold"}
          mt={"5px"}
        >
          {metrics?.map((metric) => (
            <HStack key={metric.metricId + metric.source} mb={"5px"}>
              <Image src={dataSourcesLogos[metric.source!]} height={"15px"} />
              <Box ml={"5px"}>
                {(Number.isInteger(metric.value)
                  ? metric.value
                  : metric.value.toFixed(toFixed)
                )
                  .toLocaleString("en")
                  .replaceAll(",", " ")}
                <Text ml={"5px"} fontSize={"x-small"} display={"inline-block"}>
                  {unitSymbol}
                </Text>
              </Box>
            </HStack>
          ))}
        </Box>
      ) : (
        <Box
          fontSize={"small"}
          color={"gray.600"}
          fontWeight={"semibold"}
          mt={"8px"}
        >
          {metricsConfig?.map((metric) => (
            <HStack key={metric.metricId + metric.source} mb={"5px"}>
              <Image src={dataSourcesLogos[metric.source!]} height={"15px"} />
              <Box ml={"5px"}>
                {`${(0).toFixed(toFixed)}`}
                <Text ml={"5px"} fontSize={"x-small"} display={"inline-block"}>
                  {unitSymbol}
                </Text>
              </Box>
            </HStack>
          ))}
        </Box>
      )}
    </GridItem>
  );
};
