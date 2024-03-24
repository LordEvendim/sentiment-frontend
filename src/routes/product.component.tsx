import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

export const component = function Product() {
  return (
    <Box w={"full"} h={"full"} p={"15px"} className="polka_background">
      <Text
        color={"gray.700"}
        mb={"20px"}
        ml={"20px"}
        fontWeight={800}
        fontSize={"xx-large"}
      >
        Product
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
        ></GridItem>
      </Grid>
    </Box>
  );
};
