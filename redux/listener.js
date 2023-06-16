import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleChangeAction, updateAction } from "./reducer";

const listenerMiddleWare = createListenerMiddleware();

listenerMiddleWare.startListening({
  actionCreator: toggleChangeAction,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateAction(action.payload));
  },
});
export default listenerMiddleWare;
