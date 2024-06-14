import {RootState} from "../store";

export const selectNewsList = (state: RootState) => state.news.news_list;
export const selectSearchText = (state: RootState) => state.news.q;
export const selectCategories = (state: RootState) => state.news.category_list;
export const selectSources = (state: RootState) => state.news.sources_list;
export const selectNewsDetail = (state: RootState) => state.news.details;


