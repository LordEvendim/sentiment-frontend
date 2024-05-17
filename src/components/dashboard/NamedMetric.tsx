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

import GoogleLogo from "#assets/integrations/google.png";
import MetaLogo from "#assets/integrations/meta.png";
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
  metricId: string;
  source?: ReportMetricSource;
  unitSymbol?: string;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({
  data,
  isFetching,
  metricId,
  unitSymbol,
  name,
  colSpan = "auto",
  rowSpan = "auto",
  source,
}) => {
  const metrics = useMemo(
    () =>
      data?.filter(
        (value) => value.metricId === metricId && value.display === "metric"
      ) as
        | {
            display: "metric";
            metricId: string;
            source: ReportMetricSource;
            value: number;
          }[]
        | undefined,
    [data, metricId]
  );
  const value = useMemo(
    () =>
      metrics?.reduce((accumulator, metric) => accumulator + metric.value, 0) ??
      0,
    [metrics]
  );
  const description = useMemo(
    () =>
      metrics
        ?.map(
          (metric) => `${metric.source.replaceAll("-", " ")}: ${metric.value}`
        )
        .join("/n"),
    [metrics]
  );

  return (
    <GridItem
      p={"15px"}
      background={"white"}
      borderRadius={"10px"}
      borderColor={"gray.200"}
      borderWidth={"1px"}
      boxShadow={"md"}
      colSpan={colSpan}
      rowSpan={rowSpan}
      display={"flex"}
      alignSelf={"stretch"}
      flexDir={"column"}
    >
      <HStack justifyContent={"center"} mb={"15px"}>
        {source === undefined ? (
          <Tooltip label="Metric combined from a few data sources" p={"10px"}>
            <span>
              <MdMergeType size={"20px"} />
            </span>
          </Tooltip>
        ) : (
          <Image src={dataSourcesLogos[source!]} height={"20px"} />
        )}
        <Heading fontSize={"lg"} fontWeight={400}>
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
      <HStack fontSize={"2xl"} fontWeight={"normal"} alignItems={"baseline"}>
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <>
            <Box>{Number.isInteger(value) ? value : value.toFixed(2)}</Box>
            <Box fontSize={"small"} color={"gray.700"}>
              {unitSymbol ?? ""}
            </Box>
          </>
        )}
      </HStack>
    </GridItem>
  );
};
