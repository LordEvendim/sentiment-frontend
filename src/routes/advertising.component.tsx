import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";

import { GoogleAdGroups } from "#components/dashboard/AdGroupsGraph";
import { TopGoogleCampgains } from "#components/dashboard/TopGoogleCampgains";
import { TopMetaCampgains } from "#components/dashboard/TopMetaCampgains";
import { TimeframePicker } from "#components/timeframePicker";
import { useGetGoogleAdGroups } from "#hooks/api/google/useGetGoogleAdGroups";
import { useGetTopGoogleCampaigns } from "#hooks/api/google/useGetTopGoogleCampaigns";
import { useGetTopMetaCampaigns } from "#hooks/api/meta/useGetTopMetaCampaigns";
import { DashboardTimeframe } from "#utils/timeframes";

export const component = function Advertising() {
  const [timeframe, setTimeframe] =
    useState<DashboardTimeframe>("last-14-days");
  const { isFetching: isFetchingMetaCampaigns, campaigns: metaCampaigns } =
    useGetTopMetaCampaigns(timeframe);
  const { isFetching: isFetchingGoogleCampaigns, campaigns: googleCampaigns } =
    useGetTopGoogleCampaigns(timeframe);
  const { isFetching: isFetchingGoogleAdGroups, adGroups: googleAdGroups } =
    useGetGoogleAdGroups(timeframe);

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Flex mb={"10px"}>
        <Text
          color={"gray.600"}
          fontWeight={800}
          fontSize={"x-large"}
          marginLeft={"20px"}
        >
          Advertising
        </Text>
        <Spacer />
        <TimeframePicker setTimeframe={setTimeframe} timeframe={timeframe} />
      </Flex>
      <Grid
        templateColumns="repeat(8, 1fr)"
        gap={"10px"}
        gridAutoRows={"120px"}
      >
        <TopMetaCampgains
          isFetching={isFetchingMetaCampaigns}
          colSpan={8}
          rowSpan={3}
          data={metaCampaigns}
        />
        <TopGoogleCampgains
          isFetching={isFetchingGoogleCampaigns}
          colSpan={8}
          rowSpan={3}
          data={googleCampaigns}
        />
        <GoogleAdGroups
          isFetching={isFetchingGoogleAdGroups}
          colSpan={8}
          rowSpan={3}
          data={googleAdGroups}
        />
      </Grid>
    </Box>
  );
};
