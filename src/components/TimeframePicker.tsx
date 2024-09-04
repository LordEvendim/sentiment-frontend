import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { format, subDays } from "date-fns";
import { IoCalendarOutline } from "react-icons/io5";

import {
  calculateTimeframeStart,
  DashboardTimeframe,
  timeframeStartFunctions,
} from "#utils/timeframes";

interface Props {
  timeframe: DashboardTimeframe;
  setTimeframe: (timeframe: DashboardTimeframe) => void;
}

export const TimeframePicker: React.FC<Props> = ({
  timeframe,
  setTimeframe,
}) => {
  return (
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
          {Object.keys(timeframeStartFunctions).map((timeframe) => {
            const str = timeframe.replaceAll("-", " ");
            const displayName = str.charAt(0).toUpperCase() + str.slice(1);

            return (
              <MenuItem
                onClick={() => setTimeframe(timeframe as DashboardTimeframe)}
              >
                {displayName}
              </MenuItem>
            );
          })}
        </MenuList>
      </Portal>
    </Menu>
  );
};
