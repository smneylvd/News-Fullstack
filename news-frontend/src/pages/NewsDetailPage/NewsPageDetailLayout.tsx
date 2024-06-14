import React, {useEffect, useState} from 'react';
import {Box, Card, CardMedia, Chip, Paper, Typography, TextField, Button} from '@mui/material';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Comment} from "@src/components";
import {fetchNewsDetail} from "@src/store/news/actionCreators";
import {selectNewsDetail} from "@src/store/news/selectors";
import styles from "./NewsPageDetail.module.css";
import {handleLink} from "@src/utils/link";
import {isAuthenticated} from "@src/utils/userAuth";

export const NewsPageDetailLayout: React.FC = () => {
  const dispatch = useDispatch();
  const newsItem = useSelector(selectNewsDetail);
  const {id} = useParams<{ id: string }>(); // Get the id from the URL
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(Math.round(Math.random() * 100));
  }, [!seed])

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetail(Number(id))); // Fetch news details using the id
    }
  }, [id, dispatch]);

  const handleAddComment = async () => {
    if (id && comment.trim() !== '') {
      setLoading(true);
      try {
        const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch(`${baseURL}api/news/${id}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Corrected this line
          },
          body: JSON.stringify({
            text: comment
          }),
        });

        if (response.ok) {
          setComment(''); // Clear the comment field after successful submission
          dispatch(fetchNewsDetail(Number(id))); // Refetch the news details
        } else {
          console.error('Failed to add comment', response.statusText);
        }
      } catch (error) {
        console.error('Failed to add comment', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" flexDirection="column" justifyContent="center" width="100%" gap="2rem" pt="2rem"
         className={styles.articlesContainer}>
      <Box display="flex" flexWrap="wrap" justifyContent="start" gap="0 1rem" height="100%">
        {newsItem && newsItem.id ? (
          <Box display="flex" gap="2rem" width="100%">
            <CardMedia
              key={newsItem.counter + "img"}
              component="img"
              className={styles.articleImg}
              image={newsItem.image_url ?? ""}
              alt="Article Image"
            />
            <Card
              key={newsItem.counter}
              elevation={3}
              onClick={() => handleLink(newsItem.original_source_url!)}
              className={styles.article}
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              <Box p="2rem" sx={{display: 'flex', flexDirection: 'column', gap: "1rem", width: "100%", height: "100%"}}>
                <Typography fontSize="2rem" className={styles.mobText}
                            fontWeight="600">
                  {newsItem.title}
                </Typography>

                <Box display='flex' flexDirection="column" width='100%'>
                  <Typography mb='.5rem' variant="caption" fontSize="1rem" className={styles.mobTextSm}>
                    Publish date: {newsItem.published_at && newsItem.published_at.substring(0, 10)}
                  </Typography>
                  <Typography mb='.5rem' variant="caption" fontSize="1rem" className={styles.mobTextSm}>
                    Author: {newsItem.author}
                  </Typography>
                  <Typography mb='.5rem' variant="caption" fontSize="1rem" className={styles.mobTextSm}>
                    {newsItem.source && 'Source: ' + newsItem.source.name}
                  </Typography>
                  <Typography mb='.5rem' variant="caption" fontSize="1rem" className={styles.mobTextSm}>
                    Category:
                    <Chip sx={{ml: ".5rem"}} label={newsItem.category && newsItem.category.name}/>
                  </Typography>
                </Box>
                <Typography mb='.5rem' variant="caption" fontSize="1.2rem" className={styles.mobTextSm}>
                  {newsItem.description}
                </Typography>
                <Typography mt="auto" variant="caption" color="gray">*Click to go to original source</Typography>
              </Box>
            </Card>
          </Box>
        ) : (
          <div>Loading...</div>
        )}
      </Box>

      {isAuthenticated() &&
        <Paper sx={{p: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}} elevation={3}>
          <Typography fontSize="1.5rem" className={styles.mobText} fontWeight="600">Add a Comment:</Typography>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddComment} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Paper>}

      <Paper sx={{p: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}} elevation={3}>
        <Typography fontSize="1.5rem" className={styles.mobText} fontWeight="600">Comments: </Typography>
        {newsItem && newsItem.comments && newsItem.comments.map((comment: any) =>
          <Comment key={comment.id} news_id={comment.news_id} comment={comment} seed={seed}/>
        )}
      </Paper>
    </Box>
  );
};
