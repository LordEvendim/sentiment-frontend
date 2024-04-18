import {
  Box,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

import { ReportData } from "#types/report";

export const NamedMetric: React.FC<{
  name: string;
  metricId: string;
  isFetching: boolean;
  data: ReportData | undefined;
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
}) => {
  const metrics = useMemo(
    () => data?.filter((value) => value.metricId === metricId),
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
          {name}
        </Heading>
        <Spacer />
        <Tooltip label={description} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <HStack
        fontSize={"2xl"}
        fontWeight={"extrabold"}
        mb={"10px"}
        alignItems={"baseline"}
      >
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <>
            <Box>{value.toString()}</Box>
            <Box fontSize={"small"} color={"gray.700"}>
              {unitSymbol ?? ""}
            </Box>
          </>
        )}
      </HStack>
    </GridItem>
  );
};
