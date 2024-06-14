import React from 'react';
import {Box, Typography, useMediaQuery} from "@mui/material";
import styles from "../NewsPage.module.css";
import cn from "classnames";
import {FilterSection} from "@src/layout/Filter/FilterSection";
import {Button, Input, Modal} from '@src/components';
import {fetchSearch} from "@src/store/news/actionCreators";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchText} from "@src/store/news/selectors";
import {FilterAttributes} from "@src/layout/Header/Header";
import {ReactComponent as SearchIcon} from '@src/assets/icons/search-icon.svg';
import {ReactComponent as FilterIcon} from '@src/assets/icons/Filter-icon.svg';
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";

import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";

export const NewsPageHeader: React.FC = (props) => {
    const dispatch = useDispatch();
    const matchesSm = useMediaQuery('(max-width:768px)');

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
        setFilterAttributes({...filterAttributes, q: e.target.value.trim()});
        if (e.target.value.trim().length >= 2) {
            triggerSearchFilters(filterAttributes);
        }
    };
    const [open, setOpen] = React.useState(false);
    const triggerSearchFilters = (filterAttributes: any) => {
        console.log(filterAttributes);
        dispatch(fetchSearch(filterAttributes));
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
        <React.Fragment>
            <Box width="90%" mb="2rem" className={styles.mobMb1}>
                <Modal
                    open={open}
                    handleClose={() => setOpen(false)}
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
                <Typography fontWeight="700" className={cn(styles.mobPx1, styles.mobMb1, styles.mobTextL)}
                            fontSize="2rem">
                    Articles
                </Typography>
                {matchesSm && (
                    <Input
                        placeholder="Search keywords"
                        inputSize="s"
                        value={filterAttributes.q}
                        sx={{mx: '.8rem', backgroundColor: 'white'}}
                        onChange={handleSearch}
                        startAdornment={<SearchIcon/>}
                        endAdornment={
                            <FilterIcon
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    if (isAuthenticated()) {
                                        setShowFilter(!showFilter);
                                    } else {
                                        setOpen(true);
                                    }
                                }}
                            />
                        }
                    />
                )}
                <FilterSection
                    triggerSearchFilters={triggerSearchFilters}
                    filterAttributes={filterAttributes}
                    setFilterAttributes={setFilterAttributes}
                    open={showFilter}
                    setOpen={setShowFilter}
                />
            </Box>
        </React.Fragment>
    );
};
