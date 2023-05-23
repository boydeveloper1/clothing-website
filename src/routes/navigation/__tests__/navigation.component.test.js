import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";

import Navigation from "../navigation-component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { signOutStart } from "../../../store/user/user.action";

describe("Navigation tests", () => {
  test("It should render a sign in link and not a sign Out Link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currenUser: null,
        },
      },
    });
    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();
  });
  test("it should render Sign Out link and not Sign In link if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });
    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  });
  test("it should not render a cart dropdown if isCARTOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });
    const dropdownTextElement = screen.queryByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeNull;
  });
  test("it should render a cart dropdown if is CartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });
    const dropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });

  test("it should dispatch signOutStart action when clicking on the Sign Out Link", async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });
    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    await fireEvent.click(signOutLinkElement);
    expect(mockDispatch).toHaveBeenCalled;

    const signOutAction = signOutStart();
    expect(mockDispatch).toHaveBeenCalledWith(signOutAction);

    mockDispatch.mockClear();
  });
});
