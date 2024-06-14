import React from "react";

import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as ArrowBackIcon } from '@src/assets/icons/arrowBack.svg';
import { HeaderTitleProps } from "./HeaderTitle.Props";


export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, helperText, backTo }) => {
  const navigate = useNavigate();
  const handleBack = (): void => navigate(-1);
  return (
    <Box display="flex" alignItems="center" style={{ cursor:"pointer" }}>

      <ArrowBackIcon onClick={handleBack} />

      <Box ml={1} marginTop='7px'>
        <Typography mb={1} fontSize="25px" noWrap fontWeight="700" lineHeight="1">
          {title}
        </Typography>
        <Typography fontSize="20px">
          {helperText}
        </Typography>
      </Box>
    </Box>
  );
};
