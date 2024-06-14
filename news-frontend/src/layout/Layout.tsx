import React from 'react';

import {Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import {Header} from './Header/Header';
import {LayoutProps} from './Layout.props';
import {Sidebar} from './Sidebar/Sidebar';
import {selectGlobalIsLoading} from '@src/store/generals/selectors';
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";

export const DRAWER_WIDTH = "80%";

const AppLayout: React.FC<LayoutProps> = (props: LayoutProps) => {

    const {children} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isGLoading = useSelector(selectGlobalIsLoading);


    const [open, setOpen] = React.useState(false);

    const toggleDrawer = React.useCallback((): void => {
        setOpen((prevState) => !prevState);
    }, []);

    const urlElements = window.location.href.split('/');
    React.useEffect(() => {
        // if (!urlElements.includes('auth') && !localStorage.getItem('token')) {
        //     navigate(routes.login, {replace: true});
        // }
        if (isAuthenticated() && urlElements.includes('auth')) {
            navigate(routes.main, {replace: true});
        }
    }, []);
    return (
        <Box display='flex' height='100%'>
            {!urlElements.includes('auth') && <Header
                open={open}
                setOpen={setOpen}
            />}

            <Sidebar open={open} toggleDrawer={toggleDrawer} />

            <Box
                mt={!urlElements.includes('auth') ? '50px' : "0"}
                width='100%'
                height='100vh'
                p={"0"}
                position='relative'>

                {isGLoading && <Box position='absolute' zIndex={10} top={0} bottom={0} left={0} right={0}
                                    bgcolor='rgba(255, 255, 255, 0.6)'/>}

                {children}

            </Box>

        </Box>
    );
};

const Layout = React.memo(AppLayout);


export const withLayout = <T extends Record<string, unknown>>(Component: React.FC<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};