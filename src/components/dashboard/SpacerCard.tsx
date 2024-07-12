import { GridItem } from "@chakra-ui/react";

export const SpacerCard: React.FC<{
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ colSpan, rowSpan }) => {
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
      opacity={0}
    />
  );
};
