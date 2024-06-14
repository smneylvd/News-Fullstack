import React from 'react';
import nuLogo from "@src/assets/icons/nu_logo.png";
import hubLogo from "@src/assets/icons/astanahub_logo.png";
import ritLogo from "@src/assets/icons/ritlogo.png";
import kbtuLogo from "@src/assets/icons/KBTU_logo.png";
import {Box, Typography} from "@mui/material";
import styles from "../MainPage.module.css";
export const FooterSection: React.FC = () => {

    return (
        <React.Fragment>
            <Box display='flex' justifyContent='center' my='1rem'>
                <Typography
                    variant='h3'
                    color='#697B7A'
                >
                    Партнеры JASAIM
                </Typography>
            </Box>
            <Box display='flex' className={styles.sliderMobile} justifyContent='center' height='3rem' gap='3rem' my='2rem'>
                <img src={kbtuLogo} alt="KBTU Logo"/>
                <img src={ritLogo} alt="RIT Logo"/>
                <img src={hubLogo} alt="Astana Hub Logo"/>
                <img src={nuLogo} alt="Nazarbaev University Logo"/>
            </Box>

        </React.Fragment>
    );
};
