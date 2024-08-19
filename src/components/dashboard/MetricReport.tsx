import { Box, Center, GridItem, Spinner } from "@chakra-ui/react";

import { USER_ROLES } from "#config/roles";
import { useSession } from "#hooks/api/auth/useSession";
import { useGetMetricReport } from "#hooks/api/useGetMetricReport";
import { DashboardTimeframe } from "#utils/timeframes";

import { SpacerCard } from "./SpacerCard";

export const MetricReport: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
  timeframe: DashboardTimeframe;
  name: string;
  metricDisplayName: string;
}> = ({ colSpan, rowSpan, metricDisplayName, name, timeframe }) => {
  const { isFetching, report } = useGetMetricReport(timeframe, name);
  const session = useSession();

  if (session.userData && session.userData.role === USER_ROLES.REVIEWER) {
    return <SpacerCard colSpan={3} rowSpan={2} />;
  }

  return (
    <GridItem
      px={"25px"}
      py={"10px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
      colSpan={colSpan}
      rowSpan={rowSpan}
      alignSelf={"stretch"}
      overflowX={"hidden"}
      position={"relative"}
    >
      <Box
        overflowY={"scroll"}
        h={"full"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "24px",
            background: "#c2c2c2",
          },
        }}
      >
        <Box color={"gray.600"} fontWeight={"bold"} fontSize={"md"}>
          {metricDisplayName}
        </Box>
        <Box fontSize={"sm"} mt={"5px"} color={"gray.500"} mb={"10px"}>
          {isFetching ? (
            <Center>
              <Spinner size={"sm"} />
            </Center>
          ) : (
            report?.data
          )}
        </Box>
      </Box>
      <Box
        position={"absolute"}
        zIndex={1}
        bottom={"10px"}
        left={0}
        pointerEvents={"none"}
        backgroundImage={
          "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 1) 100%)"
        }
        width={"full"}
        height={"20px"}
      />
    </GridItem>
  );
};
