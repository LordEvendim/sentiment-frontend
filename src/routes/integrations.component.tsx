import { Button } from "@chakra-ui/react";

import { Facebook } from "#components/Facebook";
import { useFacebook } from "#stores/useFacebook";

export const component = function Integrations() {
  const userInfo = useFacebook((state) => state.userInfo);
  const login = useFacebook((state) => state.login);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response: {
        status: "connected" | "unknown";
        authResponse: unknown;
      }) => {
        if (response.status === "connected") {
          if (response.authResponse) {
            window.FB.api(
              "/me",
              { fields: "name, email" },
              (response: { name: string }) => {
                console.log("me");
                console.log(response);
                login(response.name);
              }
            );
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        }
      }
    );
  };

  return (
    <div className="p-2">
      <Facebook />
      <h3>Welcome to integrations!</h3>
      <h3>Welcome: {userInfo?.fullName ?? ""}</h3>
      <Button onClick={() => handleFacebookLogin()}>Login</Button>
    </div>
  );
};
