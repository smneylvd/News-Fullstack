import createSagaMiddleWare from 'redux-saga';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import rootSaga from './sagas';
import {generalsReducer} from './generals/reducer';
import {authReducer} from './auth/reducer';
import newsReducer from '@src/store/news/reducer';

const sagaMiddleWare = createSagaMiddleWare();

const reducers = combineReducers({
    generals: generalsReducer,
    auth: authReducer,
    news: newsReducer,
});


export const store = createStore(reducers, applyMiddleware(sagaMiddleWare));

declare global {
    interface Window {
        store: any;
    }
}

window['store'] = store;

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare];