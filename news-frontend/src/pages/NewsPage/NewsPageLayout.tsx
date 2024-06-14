import React, {useEffect} from 'react';

import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {NewsPageHeader} from "@src/pages/NewsPage/components/NewsPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchNews} from "@src/store/news/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectNewsList} from "@src/store/news/selectors";
import styles from "./NewsPage.module.css";
import {handleLink} from "@src/utils/link";

export const NewsPageLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsList = useSelector(selectNewsList);
  useEffect(() => {
    if (!newsList.length) {
      dispatch(fetchNews());
    }
  }, []);


  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap="0 2rem" pt="2rem">
      <NewsPageHeader/>
      <Box display="flex" flexWrap="wrap" justifyContent="start" gap="0 1rem"
           className={styles.articlesContainer} width="100%" height="100%">
        {newsList ? (
          newsList.map((e: any) => (
            <Card
              key={e.counter}
              elevation={6}
              onClick={() => navigate(`/app/news/${e.id}`)}
              className={styles.article}
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                marginBottom: "1.5rem"
              }}
            >
              <CardMedia
                key={e.counter + "img"}
                component="img"
                className={styles.articleImg}
                image={e.image_url ?? ""}
                alt="Article Image"
              />

              <Box sx={{display: 'flex', flexDirection: 'column', width: "100%", height: "100%"}}>
                <CardContent
                  key={e.counter + "content"}
                  sx={{flex: '1 0 auto', display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                  <Typography mb='.5rem' fontSize="1.25rem" className={styles.mobText}
                              fontWeight="600">
                    {e.title}
                  </Typography>
                  <Typography mb='.5rem' variant="caption" fontSize="1rem" className={styles.mobTextSm}>
                    {e.published_at && e.published_at.substring(0, 10) + ' - ' + e.author}
                  </Typography>
                  <Box display='flex' mt='auto' width='100%'>
                    <Typography fontSize="0.875rem" lineHeight="0.875rem">
                      {e.source && 'Source: ' + e.source.name}
                    </Typography>
                    <Typography fontSize="0.875rem" lineHeight="0.875rem" ml='auto' color="gray">
                      {e.category && e.category.name}
                      {/*{e.keywords.map((el: any) => el.name + " ")}*/}
                    </Typography>
                  </Box>

                </CardContent>
              </Box>
            </Card>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Box>
  );
};