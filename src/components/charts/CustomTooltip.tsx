import { Box, Divider } from "@chakra-ui/react";
import { format } from "date-fns";

import { capitalize } from "#utils/string";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({ active, payload, label, showTotal }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        className="custom-tooltip"
        borderWidth={"1px"}
        p={"10px"}
        background={"white"}
        boxShadow={"md"}
        borderRadius={"10px"}
      >
        <p className="label">{`${format(label ?? Date.now(), "MMM dd yyyy")}`}</p>
        <div>
          {payload.map((pld: any) => (
            <Box key={`${pld.name}: ${pld.value}`} mt={"10px"} mb={"5px"}>
              <div
                style={{ color: pld.fill }}
              >{`${capitalize(pld.name.replaceAll("-", " "))}: ${pld.value.toFixed(2).replace(/[.,]00$/, "")}`}</div>
            </Box>
          ))}
          {showTotal && (
            <>
              <Divider
                w={"60px"}
                borderColor={"gray.200"}
                mt={"20px"}
                mb={"10px"}
                borderWidth={"1.5px"}
              />
              <Box mt={"10px"} mb={"5px"}>
                Total:{" "}
                {payload
                  .reduce((n: any, { value }: { value: any }) => n + value, 0)
                  .toFixed(2)
                  .replace(/[.,]00$/, "")}
              </Box>
            </>
          )}
        </div>
      </Box>
    );
  }

  return null;
};
