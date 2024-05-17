import {
  GridItem,
  Heading,
  HStack,
  Image,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

import MetaLogo from "#assets/integrations/meta.png";

export const TopRunningCampgains: React.FC<{
  isFetching: boolean;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ isFetching, colSpan = "auto", rowSpan = "auto" }) => {
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
      display={"flex"}
      alignSelf={"stretch"}
      flexDir={"column"}
      overflowY={"scroll"}
    >
      <HStack justifyContent={"center"} mb={"15px"}>
        <Tooltip label="Metric combined from a few data sources" p={"10px"}>
          <span>
            <Image src={MetaLogo} height={"20px"} />
          </span>
        </Tooltip>
        <Heading fontSize={"lg"} fontWeight={400}>
          Top campgains
        </Heading>
        <Spacer />
        <Tooltip label={"Page view description"} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <VStack alignItems={"baseline"}>
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <TableContainer w={"full"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>source</Th>
                  <Th>name</Th>
                  <Th isNumeric>impressions</Th>
                  <Th isNumeric>spend</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Image src={MetaLogo} height={"20px"} ml={"15px"} />
                  </Td>
                  <Td>Campgain 3</Td>
                  <Td isNumeric>302</Td>
                  <Td isNumeric>$25.42</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Image src={MetaLogo} height={"20px"} ml={"15px"} />
                  </Td>
                  <Td>Campgain 4</Td>
                  <Td isNumeric>20</Td>
                  <Td isNumeric>$2.42</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </GridItem>
  );
};
