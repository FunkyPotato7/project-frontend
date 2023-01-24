import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { paidReducer } from "./slices";

const rootReducer = combineReducers({
    paidReducer,

});

const store = configureStore({
    reducer: rootReducer
});

export {
    store
};