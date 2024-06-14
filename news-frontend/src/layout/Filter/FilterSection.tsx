import React from 'react';
import {Box, Card, MenuItem, Slider, Typography} from "@mui/material";
import {IFilter} from "@src/layout/Filter/FilterSection.props";
import {ReactComponent as CloseIcon} from "@src/assets/icons/cross.svg";
import {degree, regions, specialities, years} from "@src/layout/Filter/generator";
import {Button, Input} from "@src/components";
import styles from "@src/pages/NewsPage/NewsPage.module.css";
import cn from "classnames";
import {MultiSelect} from "@src/components/MultiSelect/MuiltiSelect";
import {useDispatch, useSelector} from 'react-redux';
import {cancelFilters, fetchCategories, fetchNews, fetchSources} from "@src/store/news/actionCreators";
import {DatePicker} from "@mui/lab";
import {selectCategories, selectSources} from "@src/store/news/selectors";

export const FilterSection: React.FC<IFilter> = (props) => {
  const {open, setOpen, filterAttributes, setFilterAttributes, triggerSearchFilters} = props;
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedFromDate, setFromDate] = React.useState("");
  const [selectedToDate, setToDate] = React.useState("");
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const sources = useSelector(selectSources);
  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSources());

  }, [!categories || !sources])
  React.useEffect(() => {
    const filterValues = {
      q: filterAttributes.q,
      category: selectedCategories.join(",") ?? filterAttributes.category,
      source: selectedSources.join(",") ?? filterAttributes.degree,
      date_from: selectedFromDate ?? filterAttributes.date_from,
      date_to: selectedToDate ?? filterAttributes.date_to,
    };
    // Update the filterAttributes state
    setFilterAttributes(filterValues);
    try {
      if (filterValues.q.length ||
        filterValues.category.length ||
        filterValues.date_from.length ||
        filterValues.date_to.length ||
        filterValues.source.length) {

        triggerSearchFilters(filterValues);
      } else {
        dispatch(cancelFilters());
        // dispatch(fetchNews());
      }

    } catch (e: any) {
      console.log(e);
    }


  }, [selectedCategories, selectedFromDate, selectedToDate, selectedSources]);

  const handleChange = (e: any, arr: any, setE: any) => {
    setE(arr.includes(e) ? arr.filter((i: any) => i != e) : [...arr, e]);
  };
  const handleDelete = (e: any, arr: any, setE: any) => {
    setE(arr.filter((i: any) => i != e));
  };

  return (
    <React.Fragment>
      <Box display={open ? 'flex' : 'none'} width='60vw' position='absolute' top='3.3rem'
           right='10rem' justifyContent='center'
           className={styles.filterContainer}
      >
        <Card elevation={6} sx={{
          width: "100%",
          borderRadius: "1rem",
          padding: "2rem 4rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
              className={styles.mobP2}>
          <Box display='flex' justifyContent='space-between'>
            <Typography
              fontSize='1.5rem'
              fontWeight='600'
              className={styles.mobTextMd}
            >
              Filter
            </Typography>
            <CloseIcon style={{cursor: "pointer"}} onClick={() => {
              setOpen(false);
            }}/>
          </Box>
          <Box display='flex' flexWrap='wrap' width='100%' height="25%" justifyContent='space-between'
               gap='1.5rem 0'>
            <Box width='48%' className={styles.mobW100}
            >
              <Typography fontSize='1.25rem' className={styles.mobTextMd}>
                Category
              </Typography>
              <MultiSelect innerLabel="List of categories" handleChange={setSelectedCategories}
                           fullWidth>
                {categories.filter((el: any) => !filterAttributes.category.includes(el.name)).map((category: any) =>
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                )}
              </MultiSelect>
            </Box>
            <Box width='48%' className={styles.mobW100}
            >
              <Typography fontSize='1.25rem' className={styles.mobTextMd}>
                Sources
              </Typography>
              <MultiSelect innerLabel="List of sources" handleChange={setSelectedSources} fullWidth>
                {sources.filter((el: any) => !filterAttributes.source.includes(el.name)).map((source: any) =>
                  <MenuItem key={source.id} value={source.name}>{source.name}</MenuItem>
                )}
              </MultiSelect>
            </Box>

            <Box width='48%' mt="auto" display="flex" flexDirection="column" className={styles.mobW100}>
              <Typography fontSize='1.25rem' className={styles.mobTextMd}>
                Date
              </Typography>
              <Box width='100%' mt="auto" display="flex" gap='1rem' className={styles.mobW100}>
                <Input type="date" style={{
                  backgroundColor: "rgba(0, 0, 0, 0.06)"
                }}
                       onChange={(e) => {
                         setFromDate(e.target.value)
                       }}></Input>
                <Typography>
                  _
                </Typography>
                <Input itemType="date" type="date" style={{
                  backgroundColor: "rgba(0, 0, 0, 0.06)"
                }}
                       onChange={(e) => {
                         setToDate(e.target.value)
                       }}></Input>

              </Box>
            </Box>
            <Box width='48%' mt="auto" display="flex" className={styles.mobW100}>
              <Button variant='outlined'
                      className={styles.mobW100}
                      sx={{marginLeft: "auto"}}
                      onClick={() => {
                        if (filterAttributes.q.length ||
                          filterAttributes.category.length ||
                          filterAttributes.source.length) {
                          setOpen(false);
                          triggerSearchFilters(filterAttributes);
                        } else {
                          dispatch(cancelFilters());
                        }
                      }}>
                Apply
              </Button>

            </Box>

          </Box>
        </Card>
      </Box>


    </React.Fragment>
  );
};
