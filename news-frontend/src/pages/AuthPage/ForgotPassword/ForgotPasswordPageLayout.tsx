import React from 'react';

import {Box, Button, Card, CardContent, Link, Typography} from '@mui/material';
import {Input} from '@src/components';
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {IResetPassword} from "@src/pages/AuthPage/types";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "@src/shared/routes";
import OtpInput from 'react-otp-input';
import {selectForgotStep, selectOtpSent, selectRedirectToLogin} from "@src/store/auth/selector";
import {useNavigate} from "react-router-dom";

export const ForgotPasswordPageLayout: React.FC = () => {
    const [state, setState] = React.useState<IResetPassword>({
        email: "",
        password: "",
        repassword: "",
        code: "",
    });
    const dispatch = useDispatch();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        setState({...state, [e.target.name]: e.target.value});
    };
    const otpSent = useSelector(selectOtpSent);
    const step = useSelector(selectForgotStep);
    const sendOtp = (e: React.SyntheticEvent): void => {
        e.preventDefault();
    };

    const verifyEmail = (e: React.SyntheticEvent): void => {
        e.preventDefault();
    };

    const changePass = (e: React.SyntheticEvent): void => {
        e.preventDefault();
    };
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState("");
    const redirectToLogin = useSelector(selectRedirectToLogin);
    React.useEffect(() => {
        state.code = otp;
    }, [otp]);
    React.useEffect(() => {
        if (redirectToLogin) {
            navigate(routes.login);
        }
    }, [redirectToLogin]);
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
                    Сброс пароля
                </Typography>
                <form>
                    {step == 1 &&
                        <Box style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem"}}>
                            <Typography fontSize='1rem' fontWeight='400' textAlign='center'>
                                На вашу почту будет <br/> отправлено письмо с кодом
                            </Typography>
                            <Input type="text" name="email" sx={{background: "white"}} onChange={handleChange}
                                   placeholder="Email"/>
                            <Button fullWidth={true} variant='contained' onClick={sendOtp}
                                    type='submit'>Отправить</Button>
                        </Box>
                    }
                    {step == 2 &&
                        <Box style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                            marginTop: "1rem",
                        }}>
                            <Typography
                                textAlign="center"
                                fontSize="1rem"
                            >
                                Мы отправили код на <br/>указанную вами почту
                            </Typography>
                            <Box display="flex" width="100%" gap='1rem'>
                                <OtpInput value={otp}
                                          containerStyle={{
                                              gap: "1rem",
                                          }}
                                          inputType="tel"
                                          onChange={setOtp}
                                          numInputs={4}
                                          inputStyle={{
                                              borderRadius: ".5rem",
                                              fontSize: "2rem",
                                              borderStyle: "solid",
                                              borderColor: "var(--primary)",
                                              textAlign: "center",
                                              padding: ".5rem",
                                              width: "3rem"
                                          }}
                                          renderInput={(props) => <input {...props} />}/>
                            </Box>
                            <Button fullWidth={true} variant='contained' onClick={verifyEmail}
                                    type='submit'>Проверить</Button>
                        </Box>
                    }
                    {step == 3 &&
                        <Box style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                            marginTop: "1rem",
                        }}>
                            <Input type="password" name="password" sx={{background: "white"}}
                                   onChange={handleChange}
                                   placeholder="Новый пароль"/>
                            <Input type="password" name="repassword" sx={{background: "white"}}
                                   onChange={handleChange}
                                   placeholder="Повтор пароля"/>
                            <Button fullWidth={true} variant='contained' onClick={changePass}
                                    type='submit'>Сменить</Button>
                        </Box>
                    }
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