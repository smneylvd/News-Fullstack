import {AppBarProps} from "@mui/material";

export interface ICollectionPageHeader {
    type: string,
    setType: any,
}
export interface IAuthLogin {
    email: string,
    password: string,
}
export interface IAuthRegister {
    name: string,
    email: string,
    password: string,
    companyName: string,
}
export interface IResetPassword {
    email: string,
    password: string,
    repassword: string,
    code: string,
}
export interface IAuthPageBase {
    children: any
}
