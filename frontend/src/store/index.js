import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import sessionReducer from "./session";
import spotReducer from "./spots";
import thunk from "redux-thunk";
import bookingsReducer from "./bookings";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotReducer,
  bookings: bookingsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
