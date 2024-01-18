import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import theme from "../theme";

const customRender = (
  ui: React.ReactElement,
  {
    router,
    ...restOptions
  }: RenderOptions & {
    router?: ReturnType<typeof createMemoryRouter>;
  } = {}
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const appRouter =
    router ??
    createMemoryRouter(
      [
        {
          path: "/",
          element: ui,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

  return render(<RouterProvider router={appRouter} />, {
    wrapper: ({ children }) => (
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    ),
    ...restOptions,
  });
};

export { customRender as render };
