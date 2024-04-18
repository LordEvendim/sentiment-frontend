import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { NamedMetric } from "#components/dashboard/NamedMetric";
import { useGenerateReport } from "#hooks/api/useGenerateReport";
import { useGetGeneralDashboardData } from "#hooks/api/useGetGeneralDashboardData";
import { useGetReport } from "#hooks/api/useGetReport";

export const component = function Dashboard() {
  const { data: dashbaordData, isFetching } = useGetGeneralDashboardData();
  const { generateReport, isPending: isGeneratingReport } = useGenerateReport();
  const { report } = useGetReport();

  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Text
        color={"gray.700"}
        mb={"20px"}
        ml={"20px"}
        fontWeight={800}
        fontSize={"xx-large"}
      >
        Dashboard
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={"10px"}>
        <GridItem
          p={"30px"}
          background={"white"}
          borderRadius={"15px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          colSpan={2}
          rowSpan={3}
        >
          <HStack mb={"20px"}>
            <Heading fontSize={"2xl"}>Weekly report</Heading>
            <Spacer />
            <Button
              background={"blue.400"}
              color={"white"}
              shadow={"md"}
              onClick={() => generateReport()}
              isLoading={isGeneratingReport}
            >
              Generate
            </Button>
          </HStack>
          <Box>
            {report?.split("\n").map((part) => (
              <Box
                mt={"2px"}
                fontWeight={part.includes("**") ? "bold" : "normal"}
              >
                {part.replaceAll("**", "").replaceAll("*", "-")}
              </Box>
            ))}
          </Box>
        </GridItem>
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="spend"
          name="Spend"
          unitSymbol="USD"
          key={"spend"}
          colSpan={1}
          rowSpan={1}
        />
        <NamedMetric
          data={dashbaordData}
          isFetching={isFetching}
          metricId="impressions"
          name="Impressions"
          unitSymbol=""
          key={"impressions"}
          colSpan={1}
          rowSpan={1}
        />
      </Grid>
    </Box>
  );
};
