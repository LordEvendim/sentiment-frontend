import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tooltip,
} from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";

import { useGetPageInsights } from "#hooks/api/useGetPageInsights";
import { useGetUserAccounts } from "#hooks/api/useGetUserAccounts";
import { useFacebook } from "#stores/useFacebook";
import { capitalizeFirstLetter } from "#utils/text";

export const component = function Dashboard() {
  const userInfo = useFacebook((state) => state.userInfo);
  const isLogged = useFacebook((state) => state.isLogged);
  const { accounts } = useGetUserAccounts(userInfo?.id, isLogged);

  const { insights, isFetching } = useGetPageInsights(
    userInfo?.id,
    accounts?.selectedPage
  );

  return (
    <Box w={"full"} h={"full"} p={"15px"}>
      <Grid templateColumns="repeat(4, 1fr)" gap={"15px"}>
        <GridItem
          p={"30px"}
          background={"white"}
          borderRadius={"15px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
          colSpan={2}
          rowSpan={3}
        >
          <Heading fontSize={"2xl"} mb={"20px"}>
            Weekly report
          </Heading>
          <StatGroup
            mb={"20px"}
            px={"20px"}
            py={"10px"}
            borderRadius={"10px"}
            borderWidth={"1px"}
            borderColor={"gray.200"}
          >
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Clicked</StatLabel>
              <StatNumber>5225</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Impressions</StatLabel>
              <StatNumber>402</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                15.05%
              </StatHelpText>
            </Stat>
          </StatGroup>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          assumenda blanditiis atque enim iure doloribus consequuntur est eos
          modi cum quod fugiat sed quae recusandae explicabo, temporibus
          accusantium hic, consequatur laboriosam voluptates libero pariatur
          necessitatibus esse. Enim aperiam deleniti explicabo temporibus
          facilis adipisci sed. Sunt impedit quos enim deleniti esse.
          <Box
            h={"300px"}
            w={"500px"}
            background={"gray.100"}
            my={"30px"}
            borderRadius={"10px"}
          ></Box>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          nesciunt hic ab eaque blanditiis minima sed nam. Rerum minus vitae
          fugiat voluptas assumenda in molestias laboriosam sunt temporibus a
          autem, consequuntur quibusdam nemo eum porro rem aut voluptates iure
          nulla nihil id dolore perspiciatis beatae. Corrupti totam itaque alias
          autem.
        </GridItem>
        {isFetching && (
          <GridItem
            p={"30px"}
            background={"white"}
            borderRadius={"15px"}
            borderColor={"gray.200"}
            borderWidth={"1px"}
            boxShadow={"md"}
            colSpan={2}
            height={"200px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.5s"}
          >
            <Spinner size={"md"} />
          </GridItem>
        )}
        {insights?.data?.map((metric) => (
          <GridItem
            p={"25px"}
            pb={"10px"}
            background={"white"}
            borderRadius={"15px"}
            borderColor={"gray.200"}
            borderWidth={"1px"}
            boxShadow={"md"}
            key={metric.id}
          >
            <HStack justifyContent={"center"} mb={"20px"}>
              <Heading fontSize={"xl"}>
                {capitalizeFirstLetter(metric.name ?? "").replaceAll("_", " ")}
                {metric.period && (
                  <Box
                    display={"inline-block"}
                    fontSize={"xs"}
                    fontWeight={"normal"}
                    ml={"10px"}
                  >
                    {metric.period.replaceAll("_", " ")}
                  </Box>
                )}
              </Heading>
              <Spacer />
              <Tooltip label={metric.description} p={"10px"}>
                <span>
                  <IoInformationCircleOutline size={"20px"} />
                </span>
              </Tooltip>
            </HStack>
            <Box fontSize={"lg"}></Box>
            {metric.values.map((metricValue) => (
              <HStack
                key={metricValue.end_time}
                fontSize={"lg"}
                fontWeight={"extrabold"}
                mb={"10px"}
              >
                <Box>{metricValue.value}</Box>
                <Spacer />
                <Box fontSize={"xs"} fontWeight={"normal"}>
                  {new Date(metricValue.end_time).toLocaleDateString()}
                </Box>
              </HStack>
            ))}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
