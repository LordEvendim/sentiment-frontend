import { GridItem, Spinner } from "@chakra-ui/react";
import { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import React, { useEffect } from "react";
import { ResponsiveContainer } from "recharts";

import { GoogleAdGroupSummary } from "#hooks/api/types/adGroups";

// const COLORS = [
//   "#8889DD",
//   "#9597E4",
//   "#8DC77B",
//   "#A5D297",
//   "#E2CF45",
//   "#F8C12D",
// ];

const options: EChartsOption = {
  series: [
    {
      type: "treemap",
      width: "100%",
      height: "100%",
      visibleMin: 0,
      upperLabel: {
        show: true,
        height: 30,
      },
      itemStyle: {
        borderColor: "#fff",
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 1,
          },
          upperLabel: {
            show: false,
          },
        },
        {
          itemStyle: {
            borderColor: "#ddd",
            borderWidth: 10,
            gapWidth: 2,
          },
        },
      ],
      label: {
        lineHeight: 15,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) =>
          `${params.name} \nSpend: $${params.value.toFixed(0)}`,
      },
      data: [],
    },
  ],
  tooltip: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (params: any) =>
      `
        <div>${params.name}</div>
        <div>Spend $${params.data.value?.toFixed(0)}</div>
        <div>Impressions ${params.data.impressions}</div>
        <div>Clicks ${params.data.clicks}</div>
      `,
  },
};

export interface TreemapValue {
  name: string;
  path: string;
  label?: string;
  children?: (TreemapValue & {
    value: number;
    clicks: number;
    impressions: number;
  })[];
}

export const GoogleAdGroups: React.FC<{
  data: GoogleAdGroupSummary[] | undefined;
  isFetching: boolean;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ isFetching, colSpan = "auto", rowSpan = "auto", data }) => {
  useEffect(() => {
    const adGroupsByCampaign = new Map<string, TreemapValue>();

    if (!data) return;

    for (let i = 0; i < data.length; i++) {
      if (adGroupsByCampaign.has(data[i].campaignId)) {
        adGroupsByCampaign.get(data[i].campaignId)!.children!.push({
          name: data[i].name,
          path: data[i].name,
          value: data[i].spend,
          clicks: parseInt(data[i].clicks),
          impressions: parseInt(data[i].impressions),
        });
        continue;
      }

      adGroupsByCampaign.set(data[i].campaignId, {
        name: data[i].campaignName,
        path: data[i].campaignName,
        label: data[i].campaignName,
        children: [
          {
            name: data[i].name,
            path: data[i].name,
            value: data[i].spend,
            clicks: parseInt(data[i].clicks),
            impressions: parseInt(data[i].impressions),
          },
        ],
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    options.series[0].data = [...adGroupsByCampaign.values()];
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
          <ReactECharts
            option={options}
            style={{ height: "100%", width: "100%" }}
          />
        </ResponsiveContainer>
      )}
    </GridItem>
  );
};
