import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Snackbar} from '@src/components';
import {
    NewsPage,
    NewsPageDetail,
    ForgotPassword,
    LoginPage,
    MainPage,
    RegisterPage,
} from '@src/pages';
import {withLayout} from '@src/layout/Layout';
import {routes} from '@src/shared/routes';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material';
import {initalApp} from './store/auth/actionCreators';
import {selectAuthLoader} from './store/auth/selector';
import './App.css';

const App: React.FC = () => {


    const dispatch = useDispatch();
    const authLoader = useSelector(selectAuthLoader);

    React.useLayoutEffect(() => {
        dispatch(initalApp());
    }, []);
    const hasPermission = (roleList: string[]) => {
        const userRoles = localStorage.getItem("userRole") || "";
        if (!userRoles) {
            return false;
        }
        return roleList.includes(userRoles);
    };

    return (
        <React.Fragment>
            {authLoader ?
                <CircularProgress/>
                :
                <Routes>
                    <Route path={routes.main} element={<MainPage/>}/>
                    <Route path={routes.news} element={<NewsPage/>}/>
                    <Route path={routes.newsDetail} element={<NewsPageDetail/>}/>
                    <Route path={routes.login} element={<LoginPage/>}/>
                    <Route path={routes.register} element={<RegisterPage/>}/>
                    <Route path={routes.passwordReset} element={<ForgotPassword/>}/>
                    {<Route path='*' element={<Navigate to={routes.main}/>}/>}
                </Routes>
            }
            <Snackbar/>
        </React.Fragment>
    );
};


export default withLayout(App as any);



