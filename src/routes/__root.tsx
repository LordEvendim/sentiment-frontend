import { Flex } from "@chakra-ui/react";
import {
  Outlet,
  RootRoute,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";

import { NavigationBar } from "#components/NavigationBar";
import { SideBar } from "#components/SideBar";
import { useSession } from "#hooks/api/useSession";

export const Route = new RootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { userData } = useSession();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();

  useEffect(() => {
    if (matchRoute({ to: "/google-oauth" })) return;

    if (!userData) {
      navigate({ to: "/" });
    } else {
      navigate({ to: "/dashboard" });
    }
  }, [matchRoute, navigate, userData]);

  return (
    <Flex h={"100vh"} w={"full"} flexDir={"column"}>
      <NavigationBar />
      <Flex flexGrow={1} position={"relative"}>
        {userData && <SideBar />}
        <Outlet />
      </Flex>
      <TanStackRouterDevtools />
    </Flex>
  );
}
