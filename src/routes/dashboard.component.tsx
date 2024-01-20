import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export const component = function Dashboard() {
  return (
    <Box w={"full"} h={"full"} p={"20px"}>
      <SimpleGrid columns={2} spacing={"20px"}>
        <Box
          p={"30px"}
          background={"white"}
          borderRadius={"20px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
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
        </Box>
        <Box
          p={"30px"}
          background={"white"}
          borderRadius={"20px"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          boxShadow={"md"}
        >
          <Heading fontSize={"2xl"} mb={"15px"}>
            Selected metrics
          </Heading>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
