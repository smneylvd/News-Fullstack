import {
  FETCH_AUTH_ITEMS_SAGA,
  FETCH_AUTH_LOGIN_SAGA,
  FETCH_AUTH_REGISTER_SAGA,
} from "./types/actionTypes";

export const initalApp = () => ({
  type: FETCH_AUTH_ITEMS_SAGA
});

export const fetchLoginRequest = (payload: any) => ({
  type: FETCH_AUTH_LOGIN_SAGA,
  payload
});

export const fetchRegisterRequest = (payload: any) => ({
  type: FETCH_AUTH_REGISTER_SAGA,
  payload
});
