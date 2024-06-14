import {call, put, takeLatest} from "redux-saga/effects";
import {
  FETCH_AUTH_LOGIN_ERROR,
  FETCH_AUTH_LOGIN_SAGA,
  FETCH_AUTH_LOGIN_SUCCESS,
  FETCH_AUTH_LOGOUT,
  FETCH_AUTH_LOGOUT_SAGA,
  FETCH_AUTH_REGISTER_ERROR,
  FETCH_AUTH_REGISTER_SAGA,
  FETCH_AUTH_REGISTER_SUCCESS,
} from "./types/actionTypes";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {authApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";

export function* fetchAuthLogout() {
  yield put({type: FETCH_AUTH_LOGOUT});
}

export function* fetchAuthLogin(action: any) {
  try {
    const {data} = yield call(authApi.login, action.payload);

    yield put({type: FETCH_AUTH_LOGIN_SUCCESS, payload: data});
    yield put(setSnackbar({visible: true, message: "Welcome!", status: "success"}));

  } catch (e) {
    yield put({type: FETCH_AUTH_LOGIN_ERROR});
    yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
  }
}

export function* fetchAuthRegister(action: any) {
  try {
    const {data} = yield call(authApi.register, action.payload);
    if (data.message && data.message.includes("success")) {
      yield put({type: FETCH_AUTH_REGISTER_SUCCESS});
    }
    yield put(setSnackbar({visible: true, message: "Success!", status: "success"}));
  } catch (e: any) {
    yield put({type: FETCH_AUTH_REGISTER_ERROR});
    yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
  }
}



export function* authSagas() {
  yield takeLatest(FETCH_AUTH_LOGIN_SAGA, fetchAuthLogin);
  yield takeLatest(FETCH_AUTH_REGISTER_SAGA, fetchAuthRegister);
  yield takeLatest(FETCH_AUTH_LOGOUT_SAGA, fetchAuthLogout);
}