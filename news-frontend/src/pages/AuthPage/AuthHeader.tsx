import React from "react";

import { Typography } from "@mui/material";

export function AuthHeader(): JSX.Element {
  // const { tokens } = useTheme();
  return (
    <React.Fragment>
      <Typography
        textAlign="center"
        color="#FCAF58"
        fontWeight="600"
        fontSize="62px"
      // padding={tokens.space.medium}
      >

      </Typography>
      <Typography
        textAlign="center"
        color="#fff"
        marginBottom="50px"
        fontSize="18px"
        lineHeight="25px"
      >
      </Typography>
    </React.Fragment>
  );
}
