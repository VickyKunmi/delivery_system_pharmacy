import { configureStore} from "@reduxjs/toolkit";
import Reducer from "./reducer";
import listenerMiddleWare from "./listener";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    app: Reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleWare.middleware),
});


export const getState = () => store.getState();