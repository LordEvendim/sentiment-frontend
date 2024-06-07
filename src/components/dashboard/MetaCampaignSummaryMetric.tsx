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

import MetaLogo from "#assets/integrations/meta.png";
import { TopMetaCampaign } from "#hooks/api/types/campaigns";
import { useGetTopMetaCampaigns } from "#hooks/api/useGetTopMetaCampaigns";
import { ReportMetricSource } from "#types/report";

export const MetaCampaignSummaryMetric: React.FC<{
  name: string;
  description: string;
  metricId: Exclude<
    keyof TopMetaCampaign,
    "id" | "name" | "cost_per_unique_inline_link_click"
  >;
  source?: ReportMetricSource;
  unitSymbol?: string;
  colSpan?: number | "auto";
  rowSpan?: number | "auto";
  toFixed?: number;
}> = ({
  metricId,
  description,
  unitSymbol,
  name,
  colSpan = 1,
  rowSpan = 1,
  toFixed = 2,
}) => {
  const { isFetching, campaigns } = useGetTopMetaCampaigns();

  const value = useMemo(
    () =>
      campaigns?.reduce((accumulator, metric) => {
        const inc: number =
          typeof metric[metricId] === "string"
            ? parseInt(metric[metricId] as string)
            : (metric[metricId] as number);

        return accumulator + inc;
      }, 0) ?? 0,
    [campaigns, metricId]
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
        <Image src={MetaLogo} height={"20px"} />
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
          <>
            <Box>
              {(Number.isInteger(value) ? value : value.toFixed(toFixed))
                .toLocaleString("en")
                .replaceAll(",", " ")}
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
