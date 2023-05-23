// legacy_createStore because i didn't use redux tool kit
import {
  compose,
  applyMiddleware,
  legacy_createStore,
  Middleware,
} from "redux";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

// I can import my won written middleware logger. Curtrently using redux logger
// import { loggerMiddleware } from "./middleware/logger";
import { logger } from "redux-logger";

// Asyn side effect libraries
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";
// root-reducer
import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// This consoles only when in development
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
  // thunk,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// Enables the use of REDUX DEV TOOLS
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
