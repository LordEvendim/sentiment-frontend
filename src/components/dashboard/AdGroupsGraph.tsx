import { GridItem, Spinner } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ResponsiveContainer, Treemap } from "recharts";

import { CustomContentTreemap } from "#components/charts/CustomContentTreemap";
import { GoogleAdGroupSummary } from "#hooks/api/types/adGroups";

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

export interface TreemapValue {
  name: string;
  children: {
    name: string;
    size: number;
  }[];
}

export const GoogleAdGroups: React.FC<{
  data: GoogleAdGroupSummary[] | undefined;
  isFetching: boolean;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ isFetching, colSpan = "auto", rowSpan = "auto", data }) => {
  const chartData = useMemo<TreemapValue[]>(() => {
    const adGroupsByCampaign = new Map<string, TreemapValue>();

    if (!data) return [];

    for (let i = 0; i < data.length; i++) {
      if (adGroupsByCampaign.has(data[i].campaignId)) {
        adGroupsByCampaign.get(data[i].campaignId)!.children.push({
          name: data[i].name,
          size: data[i].spend,
        });
        continue;
      }

      adGroupsByCampaign.set(data[i].campaignId, {
        name: data[i].campaignName,
        children: [
          {
            name: data[i].name,
            size: data[i].spend,
          },
        ],
      });
    }

    return [...adGroupsByCampaign.values()];
  }, [data]);

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
      overflowY={"scroll"}
    >
      {isFetching ? (
        <Spinner mt={"200px"} />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={400}
            height={200}
            data={chartData}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomContentTreemap colors={COLORS} />}
          />
        </ResponsiveContainer>
      )}
    </GridItem>
  );
};
