import {
  Box,
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
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

import GoogleLogo from "#assets/integrations/google.png";
import { TopGoogleCampaign } from "#hooks/api/types/campaigns";

export const TopGoogleCampgains: React.FC<{
  data: TopGoogleCampaign[] | undefined;
  isFetching: boolean;
  colSpan: number | "auto";
  rowSpan: number | "auto";
}> = ({ isFetching, colSpan = "auto", rowSpan = "auto", data }) => {
  const columns = React.useMemo<ColumnDef<TopGoogleCampaign>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell({ cell }) {
          return (
            <Text
              fontSize={"smaller"}
              fontWeight={"semibold"}
              color={"gray.600"}
            >{`${cell.getValue()}`}</Text>
          );
        },
      },
      {
        accessorKey: "clicks",
        header: "Clicks",
        cell({ cell }) {
          return `$ ${parseInt(cell.getValue() as string)}`;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sortingFn: (rowA: any, rowB: any) =>
          rowB.original["clicks"] - rowA.original["clicks"],
      },
      {
        accessorKey: "spend",
        header: "Spend",
        cell({ cell }) {
          return `$ ${(cell.getValue() as number).toFixed(2)}`;
        },
      },
      {
        accessorKey: "impressions",
        header: "Impressions",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sortingFn: (rowA: any, rowB: any) =>
          rowB.original["impressions"] - rowA.original["impressions"],
      },
      {
        accessorKey: "cost_per_click",
        header: "Cost per click",
        cell({ row }) {
          const inlineLinkClicks = row.getValue("clicks") as number;
          const spend = row.getValue("spend") as number;

          return `$ ${(inlineLinkClicks === 0 ? 0 : spend / inlineLinkClicks).toFixed(2)}`;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sortingFn: (rowA: any, rowB: any) =>
          rowB.original["spend"] / rowB.original["clicks"] -
          rowA.original["spend"] / rowA.original["clicks"],
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: data ?? [],
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      numberSorting: (rowA: any, rowB: any, columnId: any) =>
        rowB.original[columnId] - rowA.original[columnId],
    },
  });

  return (
    <GridItem
      p={"15px"}
      background={"white"}
      borderRadius={"8px"}
      boxShadow={"-2px 2px 1px 0px rgba(66, 68, 90, 0.20);"}
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
            <Image src={GoogleLogo} height={"20px"} />
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
        {isFetching ? (
          <Spinner size={"sm"} />
        ) : (
          <TableContainer w={"full"}>
            <Table variant="simple">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <HStack
                            cursor={
                              header.column.getCanSort() ? "pointer" : "auto"
                            }
                            userSelect={"none"}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <Box>
                              {`${flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )} `}
                            </Box>
                            {{
                              asc: <FaSortUp />,
                              desc: <FaSortDown />,
                            }[header.column.getIsSorted() as string] ?? (
                              <FaSort />
                            )}
                          </HStack>
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
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
