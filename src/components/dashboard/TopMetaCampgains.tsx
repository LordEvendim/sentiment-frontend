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
import { useGetTopMetaCampaigns } from "#hooks/api/useGetTopMetaCampaigns";

export const TopMetaCampgains: React.FC<{
  isFetching: boolean;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ isFetching, colSpan = "auto", rowSpan = "auto" }) => {
  const { isFetching: isFetchingCampaigns, campaigns } =
    useGetTopMetaCampaigns();

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
        <Tooltip label={"Top campaigns"} p={"10px"}>
          <span>
            <IoInformationCircleOutline size={"20px"} />
          </span>
        </Tooltip>
      </HStack>
      <VStack alignItems={"baseline"}>
        {isFetching || isFetchingCampaigns ? (
          <Spinner size={"sm"} />
        ) : (
          <TableContainer w={"full"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th isNumeric>clikcs</Th>
                  <Th isNumeric>spend</Th>
                  <Th isNumeric>impressions</Th>
                  <Th isNumeric>Cost per link click</Th>
                  <Th isNumeric>reach</Th>
                </Tr>
              </Thead>
              <Tbody>
                {campaigns?.map((campaign) => (
                  <Tr key={campaign.id}>
                    {/* <Td>
                      <Image src={MetaLogo} height={"20px"} ml={"15px"} />
                    </Td> */}
                    <Td
                      maxWidth={"300px"}
                      wordBreak={"break-word"}
                      overflow={"hidden"}
                      fontSize={"small"}
                    >
                      <Tooltip label={campaign.name} p={"10px"}>
                        {campaign.name}
                      </Tooltip>
                    </Td>
                    <Td isNumeric>{campaign.clicks}</Td>
                    <Td isNumeric>${campaign.spend.toFixed(2)}</Td>
                    <Td isNumeric>{campaign.impressions}</Td>
                    <Td isNumeric>
                      ${campaign.cost_per_unique_inline_link_click.toFixed(2)}
                    </Td>
                    <Td isNumeric>{campaign.reach}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </GridItem>
  );
};
