import { screen } from "@testing-library/react";

import Category from "../category.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

// Mocking library out to get useParams to work
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    category: "mens",
  }),
}));

describe("Category tests", () => {
  test("It should render a Spinner if the Spinner is true", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });
  test("It should render products (Categories) when items are present, && No spinner if isLoading is false", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: "mens",
              items: [
                {
                  id: 1,
                  name: "product 1",
                },
                {
                  id: 2,
                  name: "product 2",
                },
              ],
            },
          ],
        },
      },
    });
    const spinnerElement = screen.queryByTestId("spinner");
    expect(spinnerElement).toBeNull;

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();
  });
});
