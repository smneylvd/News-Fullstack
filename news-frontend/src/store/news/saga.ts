import {newsApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    FETCH_CATEGORIES_ERROR,
    FETCH_CATEGORIES_SAGA,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_NEWS_DETAIL_ERROR,
    FETCH_NEWS_DETAIL_SAGA,
    FETCH_NEWS_DETAIL_SUCCESS,
    FETCH_NEWS_ERROR,
    FETCH_NEWS_SAGA,
    FETCH_NEWS_SUCCESS,
    FETCH_SEARCH_ERROR,
    FETCH_SEARCH_SAGA,
    FETCH_SEARCH_SUCCESS,
    FETCH_SOURCES_ERROR,
    FETCH_SOURCES_SAGA,
    FETCH_SOURCES_SUCCESS,
} from "./types/types";


export function* fetchSearchRequest(action: any) {
    try {
        if (!action.payload
            && !action.payload.q
            && !action.payload.category
            && !action.payload.source
            && !action.payload.date_from
            && !action.payload.date_to) {
            return;
        }
        console.log("SAGA", action.payload)
        const {data} = yield call(newsApi.search, action.payload);

        yield put({type: FETCH_SEARCH_SUCCESS, data});
        if (data.length === 0) {
            yield put(setSnackbar({visible: true, message: "No results", status: "info"}));
            yield put({type: FETCH_NEWS_SAGA});
        } else {
            yield put(setSnackbar({visible: true, message: "Success!", status: "success"}));
        }


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_SEARCH_ERROR});
    }
}

export function* fetchNewsRequest(action: any) {
    try {
        const {data} = yield call(newsApi.getNews);
        yield put({type: FETCH_NEWS_SUCCESS, data});

    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_NEWS_ERROR});
    }
}

export function* fetchCategoriesRequest(action: any) {
    try {
        const {data} = yield call(newsApi.getCategories);
        yield put({type: FETCH_CATEGORIES_SUCCESS, data});

    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_CATEGORIES_ERROR});
    }
}

export function* fetchSourcesRequest(action: any) {
    try {
        const {data} = yield call(newsApi.getSources);
        yield put({type: FETCH_SOURCES_SUCCESS, data});

    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_SOURCES_ERROR});
    }
}

export function* fetchNewsDetailRequest(action: any) {
    try {
        const {data} = yield call(newsApi.getNewsDetail, action.payload);
        yield put({type: FETCH_NEWS_DETAIL_SUCCESS, data});

    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_NEWS_DETAIL_ERROR});
    }
}

export function* newsSaga() {
    yield all([
        takeLatest(FETCH_NEWS_SAGA, fetchNewsRequest),
        takeLatest(FETCH_SEARCH_SAGA, fetchSearchRequest),
        takeLatest(FETCH_CATEGORIES_SAGA, fetchCategoriesRequest),
        takeLatest(FETCH_SOURCES_SAGA, fetchSourcesRequest),
        takeLatest(FETCH_NEWS_DETAIL_SAGA, fetchNewsDetailRequest),
    ]);
}
