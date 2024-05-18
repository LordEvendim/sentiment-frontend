import { Box, GridItem, Spacer } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import { useGetReport } from "#hooks/api/useGetReport";

export const Report: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ colSpan, rowSpan }) => {
  const { report } = useGetReport();

  return (
    <GridItem
      p={"25px"}
      background={"white"}
      borderRadius={"10px"}
      borderColor={"gray.200"}
      borderWidth={"1px"}
      boxShadow={"md"}
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
      <Box fontSize={"sm"}>
        <ReactMarkdown>{report}</ReactMarkdown>
      </Box>
    </GridItem>
  );
};
