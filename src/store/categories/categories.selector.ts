import { createSelector } from "reselect";

import { CategoriesState } from "./categories.reducer";

import { CategoryMap } from "./categories.types";

import { RootState } from "../store";

// Memoize Selector
const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category; //doc.Snapshot.data is the entire object
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

// Selector for spinner
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
