import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as productReducer } from "./productReducer/reducer";
import { reducer as cartReducer } from "./cartReducer/reducer";
import { reducer as orderReducer } from "./orderReducer/reducer";
import { thunk } from "redux-thunk";

const rootReducer=combineReducers({
   authReducer,
   productReducer,
   cartReducer,
   orderReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))