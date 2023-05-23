import { AnyAction } from "redux";

// AC - Action creeator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

// Type Overload
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// Type Overload
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

// O1
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

// 02
export type Action<T> = {
  type: T;
};

// Overloading one
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

// Overloading two
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// Skeleton
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type, payload });
