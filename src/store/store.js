import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { paidReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
    paidReducer,
    userReducer
});

let store = configureStore({
    reducer: rootReducer
});

export {
    store
};