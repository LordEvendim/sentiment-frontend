import {
  Box,
  Button,
  Center,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { VscSettings } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";

import { useGenerateReport } from "#hooks/api/useGenerateReport";
import { useGetCredits } from "#hooks/api/useGetCredits";
import { useGetReport } from "#hooks/api/useGetReport";
import { calculateTimeframeStart, DashboardTimeframe } from "#utils/timeframes";

export const Report: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
  timeframe: DashboardTimeframe;
}> = ({ colSpan, rowSpan, timeframe }) => {
  const { report, isFetching } = useGetReport(timeframe);
  const { generateReport, isPending } = useGenerateReport();
  const { isFetching: isLoadingCredits, credits: creditsData } =
    useGetCredits();
  const toast = useToast();

  const credits = creditsData?.value;

  const handleGenerateReport = () => {
    generateReport(
      {
        timeframe,
      },
      {
        onSuccess: () => {
          toast({
            status: "success",
            title: "Insights",
            description: "Sucessfully generated ai insights",
          });
        },
        onError: () => {
          toast({
            status: "error",
            title: "Insights",
            description: "Failed to generate ai insights",
          });
        },
      }
    );
  };

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
      overflowY={"scroll"}
      overflowX={"hidden"}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
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
      {isFetching && (
        <Center mt={"100px"}>
          <Spinner size={"sm"} />
        </Center>
      )}

      {isFetching && report ? (
        <>
          <HStack>
            <Box fontWeight={"bold"} color={"gray.300"} fontSize={"16px"}>
              {`${format(calculateTimeframeStart(report.createdAt, report.period), "MMM dd yyyy")} to ${format(report.createdAt, "MMM dd yyyy")}`}
            </Box>
            <Spacer />
            <Box position={"relative"}>
              <Menu>
                <MenuButton as={Button} variant={"ghost"}>
                  <VscSettings size={"15px"} />
                </MenuButton>
                <MenuList>
                  <Button
                    onClick={() => handleGenerateReport()}
                    variant={"ghost"}
                    w={"full"}
                    justifyContent={"start"}
                    fontWeight={"normal"}
                    fontSize={"small"}
                    isDisabled={credits === undefined || credits === 0}
                    isLoading={isLoadingCredits}
                  >{`Regenerate (${credits ?? 0} left)`}</Button>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
          <Box fontSize={"sm"} mt={"10px"}>
            <ReactMarkdown>{report?.data}</ReactMarkdown>
          </Box>
        </>
      ) : (
        <Center mt={"100px"}>
          <Button isLoading={isPending} onClick={() => handleGenerateReport()}>
            Generate
          </Button>
        </Center>
      )}
    </GridItem>
  );
};
