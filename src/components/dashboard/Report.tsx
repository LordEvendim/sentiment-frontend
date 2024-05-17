import { Box, GridItem, Spacer } from "@chakra-ui/react";

import { useGetReport } from "#hooks/api/useGetReport";

export const Report: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ colSpan, rowSpan }) => {
  const { report } = useGetReport();

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
      alignSelf={"stretch"}
    >
      {/* <HStack mb={"20px"}> */}
      {/* <Heading fontSize={"2xl"}>General Insights</Heading> */}
      <Spacer />
      {/* <Button
          background={"blue.400"}
          color={"white"}
          shadow={"md"}
          onClick={() => generateReport()}
          isLoading={isGeneratingReport}
        >
          Generate
        </Button> */}
      {/* </HStack> */}
      <Box>REPORT CONTENT</Box>
      <Box>{report}</Box>
    </GridItem>
  );
};
