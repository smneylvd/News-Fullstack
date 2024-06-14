import {
    FETCH_CANCEL_FILTER_SAGA, FETCH_CATEGORIES_SAGA, FETCH_NEWS_DETAIL_SAGA,
    FETCH_NEWS_SAGA,
    FETCH_SEARCH_SAGA, FETCH_SOURCES_SAGA
} from "./types/types";

export const fetchNews = () => ({type: FETCH_NEWS_SAGA});
export const fetchNewsDetail = (payload: any) => ({type: FETCH_NEWS_DETAIL_SAGA, payload});
export const cancelFilters = () => ({type: FETCH_CANCEL_FILTER_SAGA});
export const fetchSearch = (payload: any) => ({type: FETCH_SEARCH_SAGA, payload});
export const fetchCategories = () => ({type: FETCH_CATEGORIES_SAGA});
export const fetchSources = () => ({type: FETCH_SOURCES_SAGA})