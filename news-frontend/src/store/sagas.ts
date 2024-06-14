import {all} from "redux-saga/effects";
import {authSagas} from "./auth/saga";
import { newsSaga } from "@src/store/news/saga";

export default function* rootSaga() {
    yield all([
        authSagas(),
        newsSaga(),
    ]);
};
