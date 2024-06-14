import React from 'react';
import {DRAWER_WIDTH} from '../Layout';
import {
    Drawer,
    styled,
    Theme,
    CSSObject,
    DrawerProps,
    Box,
    Typography,
    IconButton,
    CircularProgress, useMediaQuery
} from '@mui/material';

import {drawerHead} from './generator';
import {SidebarProps} from './Sidebar.props';
import {NavLink} from 'react-router-dom';
import {Button} from '@src/components';
import Out from "@src/assets/icons/out.png";
import {selectAuthLoader} from '@src/store/auth/selector';
import {useSelector} from 'react-redux';
import {privateNavigations} from "@src/layout/Header/generator";


interface ICustomDrawer extends DrawerProps {
    open: boolean;
}

const drawerMixin = (theme: Theme, open: boolean): CSSObject => ({
    overflowX: 'hidden',
    borderRadius: "0 2rem 2rem 0",
    boxShadow: "-5rem 0 10rem",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        ...(open ? {
            duration: theme.transitions.duration.enteringScreen,
        } : {
            duration: theme.transitions.duration.leavingScreen,
        })
    }),
    ...(open ? {
        width: DRAWER_WIDTH,
        // display: "block"
    } : {
        width: `0px`,
        left: "-1px",
    })
});


const CustomDrawer = styled(Drawer, {shouldForwardProp: (prop) => prop !== 'open'})<ICustomDrawer>(
    ({theme, open}) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        zIndex: '999999',
        ...{
            ...drawerMixin(theme, open),
            '& .MuiDrawer-paper': {
                ...drawerMixin(theme, open),
                backgroundColor: 'white'
            },
        }
    }),
);

export const AppSidebar: React.FC<SidebarProps> = (props): JSX.Element => {
    const {open, toggleDrawer} = props;
    const authLoader = useSelector(selectAuthLoader);


    const [activeNav, setActiveNav] = React.useState(0);

    const handleActiveNav = (navId: number): void => {
        setActiveNav(navId);
    };
    const handleClassName = (isActive: boolean, id: number): string | undefined => {
        isActive && handleActiveNav(id);
        return "";
    };
    const onSignOut = (): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currLocation");
    };

    return (
        <CustomDrawer variant="permanent" open={open} sx={{position: "absolute"}}>

            {!authLoader ? <React.Fragment><Box p={`.5rem 0 0 20px }`}>
                <Box display='flex' alignItems='center'>
                    <IconButton onClick={toggleDrawer}>
                        <img src={drawerHead.menu} alt=''/>
                    </IconButton>
                    <Box ml='12px' display='flex' alignItems='center'>
                    </Box>
                </Box>

                <Box mt='1rem'>
                    {privateNavigations.map(nav => (
                        <NavLink
                            to={nav.to}
                            key={nav.id}
                            className={(props) => handleClassName(props.isActive, nav.id)}
                        >
                            <Box display='flex' alignItems='center' pt='1rem' mb='5px'>
                                <Box mr='18px' ml='8px'>
                                    <Box sx={{filter: activeNav === nav.id ? "invert(30%) sepia(266%) saturate(2700%) hue-rotate(187deg) brightness(77%) contrast(150%)" : ""}}>
                                        {nav.icon}
                                    </Box>
                                </Box>
                                <Typography
                                    variant='h4'
                                    color={activeNav === nav.id ? 'primary' : '#697B7A'}
                                    fontWeight='600'>
                                    {nav.name}
                                </Typography>
                            </Box>
                        </NavLink>
                    ))
                    }
                </Box>

            </Box>
                <Box position="absolute" bottom="30px" left={open ? "20px" : "8px"}>
                    <Button startIcon={<img src={Out}/>} color="neutral" onClick={onSignOut}>
                        {open ? "Выход" : ""}
                    </Button>
                </Box>
            </React.Fragment> : <CircularProgress color="warning"/>}
        </CustomDrawer>
    );
};

export const Sidebar = React.memo(AppSidebar);