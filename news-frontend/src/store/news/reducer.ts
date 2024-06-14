import {
  FETCH_CANCEL_FILTER_SAGA,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SAGA,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_NEWS_DETAIL_SAGA,
  FETCH_NEWS_DETAIL_ERROR,
  FETCH_NEWS_DETAIL_SUCCESS,
  FETCH_NEWS_SAGA,
  FETCH_NEWS_SUCCESS,
  FETCH_SEARCH_SAGA,
  FETCH_SEARCH_SUCCESS,
  FETCH_SOURCES_ERROR,
  FETCH_SOURCES_SAGA,
  FETCH_SOURCES_SUCCESS
} from "./types/types";

interface NewsInterface {
  news_list: Array<any>,
  isFetching: boolean,
  q: string,
  categories: string,
  sources: string,
  date_from: string,
  date_to: string,
  category_list: Array<any>,
  sources_list: Array<any>,
  details: any
}

const initialState: NewsInterface = {
  news_list: Array(),
  isFetching: false,
  q: "",
  categories: "",
  sources: "",
  date_from: "",
  date_to: "",
  category_list: [],
  sources_list: [],
  details: {}
};

const newsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_NEWS_SAGA:
      return {
        ...state,
        isFetching: true,
        iinValidated: false
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        news_list: action.data,
        isFetching: false,
      };
    case FETCH_CANCEL_FILTER_SAGA:
      return {
        ...state,
        filtered_names: []
      };
    case FETCH_SEARCH_SAGA:
      return {
        ...state,
        q: action.payload.q,
        categories: action.payload.categories,
        sources: action.payload.sources,
        date_from: action.payload.date_from,
        date_to: action.payload.date_to,
      };
    case FETCH_SEARCH_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        news_list: action.data,
      };
    case FETCH_CATEGORIES_SAGA:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        category_list: action.data,
        isFetching: false,
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        news_list: [],
        isFetching: false,
      };
    case FETCH_SOURCES_SAGA:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        sources_list: action.data,
        isFetching: false,
      };
    case FETCH_SOURCES_ERROR:
      return {
        ...state,
        sources_list: [],
        isFetching: false,
      };
    case FETCH_NEWS_DETAIL_SAGA:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_NEWS_DETAIL_SUCCESS:
      return {
        ...state,
        details: action.data,
        isFetching: false,
      };
    case FETCH_NEWS_DETAIL_ERROR:
      return {
        ...state,
        details: {},
        isFetching: false,
      };
    default:
      return state; // Add this line to return the current state for unhandled actions
  }
};

export default newsReducer;
