import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, RouterProvider } from "@tanstack/react-router";
import { render, RenderOptions } from "@testing-library/react";

import { routeTree } from "../routeTree.gen";
import theme from "../theme";

interface RouterOptions {
  routerArg?: Router;
  renderOptions?: RenderOptions;
}

const customRender = (options: RouterOptions, ui?: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const appRouter = options.routerArg ?? new Router({ routeTree });

  return render(ui ?? <RouterProvider router={appRouter} />, {
    wrapper: ({ children }) => (
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    ),
    ...options.renderOptions,
  });
};

export { customRender as render };
