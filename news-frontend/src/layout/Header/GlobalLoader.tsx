import React from "react";

import { useSelector } from "react-redux";

import { LinearProgress } from "@mui/material";
import { selectGlobalIsLoading } from "@src/store/generals/selectors";

export const GlobalLoader: React.FC = () => {

  const isGLoading = useSelector(selectGlobalIsLoading);

  return (
    <React.Fragment>

      {isGLoading && <LinearProgress color='secondary' />}

    </React.Fragment>
  );
};