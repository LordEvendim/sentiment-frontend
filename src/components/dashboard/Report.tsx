import {
  Box,
  Button,
  Center,
  Divider,
  GridItem,
  HStack,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { format, subDays } from "date-fns";
import ReactMarkdown from "react-markdown";

import { useGenerateReport } from "#hooks/api/useGenerateReport";
import { useGetCredits } from "#hooks/api/useGetCredits";
import { useGetReport } from "#hooks/api/useGetReport";

export const Report: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ colSpan, rowSpan }) => {
  const { report } = useGetReport();
  const { generateReport, isPending } = useGenerateReport();
  const { isFetching: isLodingCredits, credits: creditsData } = useGetCredits();
  const toast = useToast();

  const credits = creditsData?.value;

  const handleGenerateReport = () => {
    generateReport(undefined, {
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
    });
  };

  return (
    <GridItem
      p={"25px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
      colSpan={colSpan}
      rowSpan={rowSpan}
      alignSelf={"stretch"}
      overflowY={"scroll"}
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
      {report ? (
        <>
          <HStack mb={"20px"}>
            <Box fontWeight={"bold"} color={"gray.500"}>
              {`${format(subDays(report.createdAd, report.period), "MM/dd/yyyy")} to ${format(report.createdAd, "MM/dd/yyyy")}`}
            </Box>
            <Spacer />
            <Box position={"relative"}>
              <Button
                height={"35px"}
                fontSize={"small"}
                isLoading={isPending || isLodingCredits}
                onClick={() => handleGenerateReport()}
                isDisabled={credits === undefined || credits === 0}
              >
                Generate
              </Button>
              <Box
                position={"absolute"}
                fontWeight={"bold"}
                fontSize={"x-small"}
                color={
                  credits !== undefined && credits > 0 ? "gray.500" : "gray.300"
                }
                bottom={"-15px"}
                left={"30px"}
              >
                {`${credits ?? 0} left`}
              </Box>
            </Box>
          </HStack>
          <Divider
            mt={"25px"}
            mb={"15px"}
            w={"90%"}
            mx={"auto"}
            borderColor={"gray.300"}
          />
          <Box fontSize={"sm"}>
            <ReactMarkdown>{report?.data}</ReactMarkdown>
          </Box>
        </>
      ) : (
        <Center>
          <Button isLoading={isPending} onClick={() => handleGenerateReport()}>
            Generate
          </Button>
        </Center>
      )}
    </GridItem>
  );
};
