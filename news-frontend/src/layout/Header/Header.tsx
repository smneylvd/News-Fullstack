import React from 'react';

import MenuIcon from '@src/assets/icons/menu lines.svg';
import BrandIcon from '@src/assets/icons/brand.svg';
import {ReactComponent as UserIcon} from '@src/assets/icons/user.svg';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {ReactComponent as FilterIcon} from '@src/assets/icons/Filter-icon.svg';
import LogoutIcon from '@src/assets/icons/out.png';
import {privateNavigations} from "@src/layout/Header/generator";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Divider,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material';

import {HeaderProps} from './Header.props';


import {GlobalLoader} from './GlobalLoader';

import {Button, Input, Modal} from '@src/components';
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthLogout} from "@src/store/auth/saga";
import {fetchSearch} from "@src/store/news/actionCreators";
import {selectSearchText} from "@src/store/news/selectors";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme, open}) => ({
  // width: `calc(100% - ${theme.spacing(7)})`,
  boxShadow: 'none',
  backgroundColor: '#ffffff',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: DRAWER_WIDTH,
    // width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface FilterAttributes {
  q?: string,
  category?: string;
  source?: string;
  date_from?: string;
  date_to?: string;
}

const AppHeader: React.FC<HeaderProps> = (props) => {
  const {open, setOpen} = props;

  const [showFilter, setShowFilter] = React.useState(false);

  const navigate = useNavigate();
  const searchText = useSelector(selectSearchText);
  const [filterAttributes, setFilterAttributes] = React.useState<FilterAttributes>({
    q: searchText,
    category: "",
    source: "",
    date_from: "",
    date_to: "",
  });


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let val = e.target.value;
    let length = val.length;
    setFilterAttributes({...filterAttributes, q: val[length - 1] == ' ' && val[length - 2] == ' ' ? val.trim() : val})
    if (e.target.value.trim().length >= 2) {
      triggerSearchFilters({...filterAttributes, q: e.target.value.trim()});
    }
  };
  const triggerSearchFilters = (filterAttributes: any) => {
    dispatch(fetchSearch(filterAttributes));
  };
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState(0);

  const handleActiveNav = (navId: number): void => {
    setActiveNav(navId);
  };


  const handleClassName = (isActive: boolean, id: number): string | undefined => {
    isActive && handleActiveNav(id);
    return "";
  };
  const getQueryWidth = () => {
    const matchesLg = useMediaQuery('(min-width:1200px)');
    const matchesMd = useMediaQuery('(max-width:1180px)');
    const matchesSm = useMediaQuery('(max-width:768px)');
    const matchesXs = useMediaQuery('(max-width:576px)');
    if (matchesXs) return "80%";
    if (matchesSm) return "60%";
    if (matchesMd) return "40%";
    if (matchesLg) return "25%";
  };
  return (
    <AppBar position="fixed" open={open}>
      <Box className="diploma-navbar" height='4rem'>
        <Modal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          maxWidth={getQueryWidth()}
          width={getQueryWidth()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

            <img src={NeedAuthorizationPic} alt=""/>
            <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
                        fontWeight='600'
                        variant="h6"
                        component="h2">
              Authorization required
            </Typography>
            <Button variant='contained' sx={{
              marginTop: "1rem",
              padding: "1rem",
              width: "80%",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "2rem"
            }} onClick={() => {
              navigate(routes.login);
            }}>Login</Button>
          </Box>
        </Modal>
        <img src={MenuIcon} onClick={() => {
          setOpen(!open);
        }} className="menu-icon"/>
        <img className='diploma-logo' src={BrandIcon} style={{height: "100%"}} onClick={() => {
          navigate(routes.main);
        }} alt="logo"/>
        {privateNavigations.map(nav => (
          <NavLink
            to={nav.to}
            key={nav.id}
            className={(props) => handleClassName(props.isActive, nav.id) + "diploma-navbar-item"}
          >
            <Typography
              variant='h4'
              color={activeNav === nav.id ? '#0A66C2' : 'gray'}
              fontWeight='450'>
              {nav.name}
            </Typography>
          </NavLink>
        ))}
        <Box className="diploma-navbar-item" width="100%">
          {!window.location.href.split('/').includes('main') && isNaN(parseInt(window.location.href.split('/')[window.location.href.split('/').length - 1])) &&
            <Input placeholder='Search Keywords' fullWidth={true} inputSize='s'
                   value={filterAttributes.q}
                   onChange={handleSearch} startAdornment={<SearchIcon/>}
                   endAdornment={<FilterIcon style={{cursor: "pointer"}} onClick={() => {
                     if (isAuthenticated()) {
                       setShowFilter(!showFilter);
                     } else {
                       setOpenModal(true);
                     }
                   }}/>}/>
          }</Box>
        <FilterSection
          triggerSearchFilters={triggerSearchFilters}
          filterAttributes={filterAttributes}
          setFilterAttributes={setFilterAttributes}
          open={showFilter}
          setOpen={setShowFilter}
        />
        {/* REST SELECTOR  */}
        <Box display='flex' justifyContent='flex-end' py='10px' className="diploma-btn-container">
          {!isAuthenticated() ? <Button
              onClick={() => {
                navigate(routes.login, {replace: true});
              }}
              className="diploma-auth-btn"
              startIcon={<UserIcon style={{height: "1.2rem"}}/>}
              variant='contained'
            >
              <Typography
                variant='h4'
                color={'white'}
                fontSize={'16px'}
                className="diploma-navbar-item"
                fontWeight='450'>
                Login
              </Typography>

            </Button>
            :
            <Button
              className="diploma-auth-btn"
              onClick={() => {
                fetchAuthLogout();
                localStorage.clear();
                navigate(routes.login, {replace: true});
              }}
              startIcon={<img src={LogoutIcon} style={{height: "1rem"}}/>}
              variant='contained'
            >
              <Typography
                variant='h4'
                color={'white'}
                fontSize={'16px'}
                className="diploma-navbar-item"
                fontWeight='450'>
                Logout
              </Typography>

            </Button>
          }
        </Box>
      </Box>
      <GlobalLoader/>
      <Divider/>
    </AppBar>
  );
};
export const Header = React.memo(AppHeader);
