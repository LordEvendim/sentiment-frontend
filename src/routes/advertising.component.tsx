import {
  Box,
  Flex,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { format, subDays } from "date-fns";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

import { TopGoogleCampgains } from "#components/dashboard/TopGoogleCampgains";
import { TopMetaCampgains } from "#components/dashboard/TopMetaCampgains";
import { useGetTopGoogleCampaigns } from "#hooks/api/useGetTopGoogleCampaigns";
import { useGetTopMetaCampaigns } from "#hooks/api/useGetTopMetaCampaigns";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

export const component = function Advertising() {
  const [timeframe, setTimeframe] =
    useState<DashboardTimeframe>("last-14-days");
  const { isFetching: isFetchingMetaCampaigns, campaigns: metaCampaigns } =
    useGetTopMetaCampaigns(timeframe);
  const { isFetching: isFetchingGoogleCampaigns, campaigns: googleCampaigns } =
    useGetTopGoogleCampaigns(timeframe);

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
        <Menu>
          <MenuButton>
            <HStack
              background={"white"}
              borderRadius={"6px"}
              borderColor={"gray.200"}
              borderWidth={"1px"}
              boxShadow={"md"}
              px={"12px"}
              py={"8px"}
              fontSize={"14px"}
              fontWeight={"semibold"}
              color={"gray.500"}
            >
              <IoCalendarOutline size={"15px"} />
              <Box>{`${format(calculateTimeframeStart(new Date(Date.now()), timeframe), "MMM/dd/yyyy")} - ${format(subDays(Date.now(), 1), "MMM/dd/yyyy")}`}</Box>
            </HStack>
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={() => setTimeframe("last-7-days")}>
                Last 7 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-14-days")}>
                Last 14 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-90-days")}>
                Last 90 days
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-6-months")}>
                Last 6 months
              </MenuItem>
              <MenuItem onClick={() => setTimeframe("last-year")}>
                Last year
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
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
      </Grid>
    </Box>
  );
};
