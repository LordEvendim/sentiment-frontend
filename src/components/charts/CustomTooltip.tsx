import { Box } from "@chakra-ui/react";
import { format } from "date-fns";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({ active, payload, label }: any) => {
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
            <div style={{ display: "inline-block", padding: 10 }}>
              <div
                style={{ color: pld.fill }}
              >{`${pld.name}: ${pld.value}`}</div>
            </div>
          ))}
        </div>
      </Box>
    );
  }

  return null;
};
