import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// regular actions
// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

// Action types that our reducers can accept typeS
export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

// export type CategoryAction =
//   | FetchCategoriesStart
//   | FetchCategoriesSuccess
//   | FetchCategoriesFailed;

// three next block of codes are regular actions but deployed for thunks and sagas
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);

// NOT IN USE, I IMPLEMENTED SAGA
// The ACTUAL thunk action - for when it succeds and fails. tHUNKS RUNS A DISPATCH
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };
