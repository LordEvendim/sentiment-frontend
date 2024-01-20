import { useEffect } from "react";

export const Facebook: React.FC<unknown> = () => {
  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1739289466553407",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });

      window.FB.getLoginStatus((response: unknown) => {
        console.log("getLoginStatus");
        console.log(response);
      });
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
