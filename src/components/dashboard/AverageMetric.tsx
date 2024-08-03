import {
  Box,
  GridItem,
  Heading,
  HStack,
  Image,
  Spacer,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdMergeType } from "react-icons/md";

import { dataSourcesLogos } from "#modules/logos";
import { ReportData, ReportMetricSource } from "#types/report";
import { separateThousands } from "#utils/text";

export const AverageMetric: React.FC<{
  name: string;
  isFetching: boolean;
  data: ReportData | undefined;
  source?: ReportMetricSource;
  dividentMetricId: string;
  divisorMetricId: string;
  unitSymbol?: string;
  colSpan?: number | "auto";
  rowSpan?: number | "auto";
  toFixed?: number;
}> = ({
  data,
  isFetching,
  dividentMetricId,
  divisorMetricId,
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
          (value.metricId === dividentMetricId ||
            value.metricId === divisorMetricId) &&
          value.display === "metric" &&
          (source ? value.source === source : true)
      ) as ReportData | undefined,

    [data, dividentMetricId, divisorMetricId, source]
  );
  const divident = useMemo(
    () =>
      metrics
        ?.filter((metric) => metric.metricId === dividentMetricId)
        ?.reduce((accumulator, metric) => accumulator + metric.value, 0) ?? 0,
    [dividentMetricId, metrics]
  );
  const divisor = useMemo(
    () =>
      metrics
        ?.filter((metric) => metric.metricId === divisorMetricId)
        ?.reduce((accumulator, metric) => accumulator + metric.value, 0) ?? 0,
    [divisorMetricId, metrics]
  );
  const description = useMemo(
    () =>
      metrics?.map((metric) => (
        <Box>{`${metric.source.replaceAll("-", " ")} : ${metric.value.toFixed(2)} ${unitSymbol}`}</Box>
      )),
    [metrics, unitSymbol]
  );

  return (
    <GridItem
      p={"15px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
      colSpan={colSpan}
      rowSpan={rowSpan}
      display={"flex"}
      alignSelf={"stretch"}
      flexDir={"column"}
    >
      <HStack justifyContent={"center"} h={"50px"} alignItems={"start"}>
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
      <HStack fontSize={"xl"} fontWeight={"normal"} alignItems={"baseline"}>
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <>
            <Box>
              {separateThousands(
                divisor === 0 ? "0" : (divident / divisor).toFixed(toFixed)
              )}
            </Box>
            <Box fontSize={"small"} color={"gray.700"}>
              {unitSymbol ?? ""}
            </Box>
          </>
        )}
      </HStack>
    </GridItem>
  );
};
