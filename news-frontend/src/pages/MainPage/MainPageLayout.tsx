import React, {useState} from 'react';

import {Box, CircularProgress, Divider, Typography} from '@mui/material';
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';

import {Button, Input} from '@src/components';
import {FooterSection} from "@src/pages/MainPage/components/FooterSection";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routes} from "@src/shared/routes";
import styles from "./MainPage.module.css";
import {fetchSearch} from "@src/store/news/actionCreators";
import {setSnackbar} from "@src/store/generals/actionCreators";

export const MainPageLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterAttributes, setFilterAttributes] = React.useState({
    text: '',
    specialities: '',
    region: '',
    year: 0,
    gpaL: 0,
    gpaR: 0,
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = useState(false);
  const triggerSearchFilters = () => {
    dispatch(fetchSearch(filterAttributes));
    navigate(routes.news);
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filterAttributes.text.trim().length > 1) {
        triggerSearchFilters();
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [filterAttributes]);
  const handleUpdateNews = async () => {
    // Add logic to handle reply submission here
    try {
      setLoading(true);
      const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
      await fetch(`${baseURL}api/news/update`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        let res = await response.json();
        if (response.ok) {
          console.log(res)
          dispatch(setSnackbar({visible: true, message: res, status: "success"}));
        } else {
          dispatch(setSnackbar({visible: true, message: res, status: "error"}));
          console.error('Failed to add comment', response.statusText);
        }
        setLoading(false);
      });


    } catch (error) {
      setLoading(false);
      console.error('Failed to add comment', error);
    }
  };
  return (
    <Box pt={'25px'}>
      <Box justifyContent="center" display="flex" mb="5rem">
        <Box className={styles.contentText} mt="2.75rem">
          <Typography fontSize="2rem" fontWeight="700" mb=".5rem">
            News platform <br className={styles.dMobileNone}/>
          </Typography>
          <Typography variant="h5">
            Here you can find <br className={styles.dMobileNone}/> most relevant and interesting articles
          </Typography>
          <div style={{marginBottom: '1.5rem'}}/>
          <Box display="flex" gap="1rem" mb="1rem">
            <Button className={styles.btn} variant="contained" onClick={() => navigate(routes.news)}>
              News
            </Button>
            <Button className={styles.btn} sx={{width: "9rem", padding: "1rem"}} disabled={loading} variant="contained"
                    color="warning"
                    onClick={handleUpdateNews}>

              {loading ? <CircularProgress size="1.5rem"/> : 'Update News'}

            </Button>
          </Box>
          <Box display="flex">
            <Input
              placeholder="Search keywords"
              fullWidth={true}
              inputSize="m"
              sx={{
                paddingRight: 0,
              }}
              endAdornment={
                <Button
                  onClick={() => {
                    triggerSearchFilters();
                  }}
                  buttonSize="m"
                  variant="contained"
                  sx={{
                    padding: '0',
                  }}
                >
                  <SearchIcon style={{filter: 'brightness(250%) contrast(101%)'}}/>
                </Button>
              }
              onChange={(e) => {
                const query = e.target.value;
                setFilterAttributes({...filterAttributes, text: query});
                setSearchQuery(query);
              }}
            />
          </Box>
        </Box>
      </Box>
      <Divider/>
    </Box>
  );
};
