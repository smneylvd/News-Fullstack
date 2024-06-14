import { Box, CircularProgress, LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useTypedSelector } from "@src/hooks/useTypedSelector";
import React from "react";
import styles from './Loader.module.css';






export const Loader: React.FC = () => {

  return (
    <Box >
      <div className={styles.LoaderActive}>
        <LinearProgress sx={{ height: '5px' }} color="secondary" />
      </div>
    </Box>
  );
};
