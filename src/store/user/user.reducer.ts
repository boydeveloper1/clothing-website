import { AnyAction } from "redux";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInFailed,
  signUpFailed,
  signOutSuccess,
  signInSuccess,
  signOutFailed,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// REDUCER. This runs based off calling "dispatch" in the userProvider
// All reducers will recieve all actions that gets dispatched, if the action doesn't match the type then we return thet state
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };

    // switch (type) {
    //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    //     return {
    //       ...state,
    //       currentUser: payload,
    //     };
    // case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    //   return { ...state, currentUser: null };
    // case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    // case USER_ACTION_TYPES.SIGN_IN_FAILED:
    // case USER_ACTION_TYPES.SIGN_UP_FAILED:
    //   return { ...state, error: payload };
    // default:
  }
  return state;
};
