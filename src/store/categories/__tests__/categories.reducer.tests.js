import {
  categoriesReducer,
  CATEGORIES_INITIAL_STATE,
} from "../categories.reducer";

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "../categories.action";

describe("Category Reducer tests", () => {
  test("fetchCategoriesStart", () => {
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    };
    expect(
      categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())
    ).toEqual(expectedState);
  });
  test("fetchCategoriesSuccess", () => {
    const mockData = [
      {
        title: "mens",
        imageUrl: "test ",
        items: [
          {
            id: 1,
            name: "Product 2",
          },
          {
            id: 2,
            name: "Product 2",
          },
        ],
      },
      {
        title: "womens",
        imageUrl: "test 2",
        items: [
          {
            id: 3,
            name: "Product 3",
          },
          {
            id: 4,
            name: "Product 4",
          },
        ],
      },
    ];
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    };
    expect(
      categoriesReducer(
        CATEGORIES_INITIAL_STATE,
        fetchCategoriesSuccess(mockData)
      )
    ).toEqual(expectedState);
  });

  test("fetchCategoriesFailed", () => {
    const mockError = new Error("Error fetching Categories");

    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      error: mockError,
    };
    expect(
      categoriesReducer(
        CATEGORIES_INITIAL_STATE,
        fetchCategoriesFailed(mockError)
      )
    ).toEqual(expectedState);
  });
});
