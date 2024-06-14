import React, {useEffect} from 'react';

import {Box, Button, Card, CardContent, IconButton, InputAdornment, Link, Typography} from '@mui/material';
import {Input} from '@src/components';
import {IAuthRegister} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegisterRequest,} from "@src/store/auth/actionCreators";
import {routes} from "@src/shared/routes";
import {isAuthenticated} from "@src/utils/userAuth";
import {useNavigate} from "react-router-dom";

export const RegisterPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IAuthRegister>({
        name: "",
        email: "",
        password: "",
        companyName: "",
    });
    const dispatch = useDispatch();
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const payload = state;
        dispatch(fetchRegisterRequest(payload));
        setTimeout(() => {
            const urlElements = window.location.href.split('/');
            if (isAuthenticated() && urlElements.includes('auth')) {
                navigate(routes.main, {replace: true});
            }
        }, 2000);
    };
    const navigate = useNavigate();

    return (
        <Card sx={{marginY: "auto", borderRadius: ".8rem", padding: ".6rem"}}>

            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <Typography fontSize='1.3rem' fontWeight='700'>
                    Registration
                </Typography>
                <form>
                    <Box style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem"}}>
                        <Input type="text" name="name" sx={{background: "white"}} onChange={handleChange}
                               placeholder="Fullname"/>
                        <Input type="text" name="email" sx={{background: "white"}} onChange={handleChange}
                               placeholder="Email"/>
                        <Input type="password" name="password" sx={{background: "white"}} onChange={handleChange}
                               placeholder="Password"/>
                        <Input type="password" name="repassword" sx={{background: "white"}} onChange={handleChange}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           onClick={(e) => {
                                               e.type = "text";
                                           }
                                           }
                                           onMouseDown={(e) => {
                                               e.type = "text";
                                           }
                                           }
                                       >
                                           {/*{this && this.type = "text" ? "on" : "off"}*/}
                                       </IconButton>
                                   </InputAdornment>
                               }
                               placeholder="Repeat password"/>
                        <Button fullWidth={true} variant='contained' onClick={onSubmit}
                                type='submit'>Register</Button>
                    </Box>
                </form>

                <Typography fontSize=".8rem" textAlign="center" mt="1rem">
                    Already have an account? <Link sx={{textDecoration: "none", fontWeight: "600"}} href={routes.login}>
                    Login
                </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};