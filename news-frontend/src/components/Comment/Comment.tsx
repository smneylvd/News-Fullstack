import React, {useState} from 'react';
import {Avatar, Box, Divider, TextField, Button, Link} from '@mui/material';
import Typography from "@mui/material/Typography";
import colors from "@src/shared/colors";

import {CommentProps} from './CommentProps';
import {fetchNewsDetail} from "@src/store/news/actionCreators";
import {useDispatch} from "react-redux";
import {isAuthenticated} from "@src/utils/userAuth";

const getAvatarColor = (index: number, seed: any) => {
  index += parseInt(seed);
  return colors[index % colors.length];
};

export const Comment: React.FC<CommentProps> = (props) => {
  const {children, comment, repliedTo = null, news_id, seed, ...otherProps} = props;
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyText('');
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };
  const dispatch = useDispatch();

  const handleReplySubmit = async () => {
    // Add logic to handle reply submission here
    console.log(`Replying to comment ID: ${replyingTo}, Text: ${replyText}`);
    setReplyingTo(null); // Reset after submission
    if (news_id && replyText.trim() !== '') {
      try {
        const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch(`${baseURL}api/news/${news_id}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Corrected this line
          },
          body: JSON.stringify({
            text: replyText,
            reply_id: replyingTo
          }),
        });

        if (response.ok) {
          dispatch(fetchNewsDetail(Number(news_id))); // Refetch the news details
        } else {
          console.error('Failed to add comment', response.statusText);
        }
      } catch (error) {
        console.error('Failed to add comment', error);
      }
    }
  };


  return (
    <Box key={`${comment.id}_id`} sx={{
      display: "flex",
      flexDirection: "column",
      border: repliedTo ? "none" : "1px solid rgb(1,1,1,.1)",
      borderRadius: "1rem",
      px: "1rem",
      pt: "1rem",
      pb: repliedTo && comment.replies ? "0" : "1rem",
    }}>
      <Box sx={{display: "flex", gap: "1rem"}}>
        <Avatar sx={{bgcolor: getAvatarColor(comment.user.id, seed)}}>{comment.user.name[0].toUpperCase()}</Avatar>
        <Typography alignSelf="center">{comment.user.name}</Typography>
        {repliedTo && <Typography variant="caption" alignSelf="center">replied to {repliedTo.name} ⬏ </Typography>}
      </Box>
      <Box mt=".5rem" sx={{
        borderLeft: "1px solid",
        minHeight: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }} ml="3rem">
        <Typography alignSelf="start" variant="caption" ml=".5rem">{comment.text}</Typography>
      </Box>

      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography alignSelf="center" ml="auto" variant="caption">
          {comment.created_at.substring(0, 16).replace('T', ' ')}
        </Typography>
        {isAuthenticated() &&
          <Button size="small" variant="text" sx={{p: ".1rem", m: ".5rem"}} color="secondary"
                  onClick={() => handleReplyClick(comment.id)}>
            Reply
          </Button>
        }
      </Box>

      {replyingTo === comment.id && (
        <Box mt="1rem" ml="3rem" display="flex" flexDirection="column" gap="0.5rem">
          <TextField
            label="Write your reply"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={replyText}
            onChange={handleReplyChange}
          />
          <Button variant="contained" color="primary" onClick={handleReplySubmit}>
            Submit Reply
          </Button>
        </Box>
      )}

      {comment.replies && comment.replies.length > 0 &&
        <Box ml="2rem" display="flex" sx={{backgroundColor: "rgba(0,0,0,0.03)", pb: '1rem', borderRadius: "1rem",}}
             flexDirection="column">
          {comment.replies.map((reply: any, index: number) => (
            <React.Fragment key={reply.id}>
              <Comment news_id={news_id} key={reply.id} repliedTo={comment.user} comment={reply} seed={seed}/>
              {comment.replies.length - 1 > index && <Divider key={`${reply.id}_divider`}/>}
            </React.Fragment>
          ))}
        </Box>
      }
    </Box>
  );
};
