import { useEffect } from "react";

import { useFacebook } from "#stores/useFacebook";

export const Facebook: React.FC<unknown> = () => {
  const login = useFacebook((state) => state.login);

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1563147651120140",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });

      window.FB.getLoginStatus(
        (response: {
          status: "connected" | "unknown";
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          authResponse: any;
        }) => {
          if (response.status === "connected") {
            if (response.authResponse) {
              window.FB.api("/me", {}, (meResponse: { name: string }) => {
                login(
                  meResponse.name,
                  response.authResponse.userID,
                  response.authResponse.accessToken
                );
              });
            } else {
              console.log("User cancelled login or did not fully authorize.");
            }
          }
        }
      );
    };
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id)) return;

      const js = d.createElement(s);
      js.id = id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (js as any).src = "https://connect.facebook.net/en_US/sdk.js";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fjs as any).parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return null;
};
