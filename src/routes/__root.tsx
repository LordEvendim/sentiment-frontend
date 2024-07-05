import { Flex } from "@chakra-ui/react";
import {
  Outlet,
  RootRoute,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { NavigationBar } from "#components/NavigationBar";
import { SideBar } from "#components/SideBar";
import { Hotkeys } from "#config/hotkeys";
import { useSession } from "#hooks/api/useSession";
import { useSidebar } from "#hooks/useSidebar";

export const Route = new RootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { userData } = useSession();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const isHidden = useSidebar((state) => state.isHidden);
  const toggleSidebar = useSidebar((state) => state.toggle);

  useHotkeys(Hotkeys.ToggleSidebar, () => toggleSidebar(), []);

  useEffect(() => {
    if (matchRoute({ to: "/google-oauth" })) return;
    if (matchRoute({ to: "/password-reset" })) return;

    if (!userData) {
      navigate({ to: "/" });
    } else {
      navigate({ to: "/overview" });
    }
  }, [matchRoute, navigate, userData]);

  if (matchRoute({ to: "/password-reset" })) {
    return <Outlet />;
  }

  return (
    <Flex h={"100vh"} w={"full"} flexDir={"column"}>
      <NavigationBar />
      <Flex flexGrow={1} position={"relative"}>
        {userData && !isHidden && <SideBar />}
        <Outlet />
      </Flex>
      {/* <TanStackRouterDevtools /> */}
    </Flex>
  );
}
