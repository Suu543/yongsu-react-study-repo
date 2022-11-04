// This is the root reducer! It is the store manager for all the reducers
// To make a rootReducer:
// 1. Get a method from redux, called combineReducers
import { combineReducers } from "redux";

// 2. Get each individual reducer
import frozenReducer from "./frozenReducer";
import produceReducer from "./produceReducer";
import meatReducer from "./meatReducer";

// 3. Call combineReducer and hand it an object
// each key in combineReducer will be a piece of state in the redux store
// each value, will be the value of that piece of state in the redux store
const rootReducer = combineReducers({
  frozen: frozenReducer,
  produce: produceReducer,
  meat: meatReducer,
});

export default rootReducer;

// 1. reducers 세 개 다 생성하고
// 2. 이후에 rootReducer에 반영
// 3. FrozenDept 컴포넌트에서 구현
