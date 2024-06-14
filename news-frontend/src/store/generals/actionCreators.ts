import { IGeneralsState } from "./contracts/state";
import { GeneralsType, SetGlobalLoaderActionInterface, SetSnackbarActionInterface } from "./contracts/actionTypes";



export const setGlobalLoader = (payload: IGeneralsState['loadingStatus']): SetGlobalLoaderActionInterface => (
	{ type: GeneralsType.SET_GLOBAL_STATUS, payload }
);

export const setSnackbar = (payload: IGeneralsState['snackbar']): SetSnackbarActionInterface => (
	{ type: GeneralsType.SET_SNACKBAR_STATUS, payload }
);



export type GeneralsActions = SetGlobalLoaderActionInterface | SetSnackbarActionInterface;