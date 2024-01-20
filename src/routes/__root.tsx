import { Flex } from "@chakra-ui/react";
import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { NavigationBar } from "#components/NavigationBar";
import { SideBar } from "#components/SideBar";

export const Route = new RootRoute({
  component: () => (
    <Flex h={"100vh"} w={"full"} flexDir={"column"}>
      <NavigationBar />
      <Flex flexGrow={1} position={"relative"}>
        <SideBar />
        <Outlet />
      </Flex>
      <TanStackRouterDevtools />
    </Flex>
  ),
});
