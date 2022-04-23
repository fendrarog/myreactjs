import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk, { ThunkAction } from "redux-thunk";
import appReducer from "./app-reducer";
import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer; //(state: CombinedState<{...,reducersStates,...}>, action: AnyAction) => CombinedState<...>
export type CombinedStateType = ReturnType<RootReducerType>; //вычитаем глобальный стейт (...) => ЭТОТ_СТЕЙТ_ВЫЧИТАЕМ
export type CommonThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, CombinedStateType, unknown, A>;

// let state: CombinedStateType;
// const a = state.profilePage.profile.contacts.youtube;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// @ts-ignore
window.__store__ = store;

export default store;
