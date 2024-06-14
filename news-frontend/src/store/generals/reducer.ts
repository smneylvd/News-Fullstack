import produce, { Draft } from 'immer';
import { LoadingStatus } from './types';
import { IGeneralsState } from './contracts/state';
import { GeneralsActions } from './actionCreators';
import { GeneralsType } from './contracts/actionTypes';


const initialLoaderState: IGeneralsState = {
	loadingStatus: LoadingStatus.NEVER,
	snackbar: {
		visible: false,
	},
};

export const generalsReducer = produce(( draft: Draft<IGeneralsState>, action: GeneralsActions) => {
	switch (action.type) {
		case GeneralsType.SET_GLOBAL_STATUS:
			draft.loadingStatus = action.payload;
			break;
		case GeneralsType.SET_SNACKBAR_STATUS:
			draft.snackbar.status = action.payload.status;
			draft.snackbar.visible = action.payload.visible;
			draft.snackbar.message = action.payload.message;
			break;
		default:
			break;
	}
}, initialLoaderState);