import { RootState } from "../store";
import { ISnackbar, LoadingStatus } from "./types";
import { IGeneralsState } from "./contracts/state";

export const selectGeneralsState = (state: RootState): IGeneralsState => state.generals;

// LOADING STATUS
export const selectGlobalIsLoading = (state: RootState): boolean => {
	return selectGeneralsState(state).loadingStatus === LoadingStatus.LOADING;
};

export const selectGlobalIsSuccess = (state: RootState): boolean => {
	return selectGeneralsState(state).loadingStatus === LoadingStatus.SUCCESS;
};

export const selectGlobalIsError = (state: RootState): boolean => {
	return selectGeneralsState(state).loadingStatus === LoadingStatus.ERROR;
};


// SNACKBAR
export const selectSnackbar = (state: RootState): ISnackbar => {
	return selectGeneralsState(state).snackbar;
};