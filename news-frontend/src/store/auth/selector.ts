import { RootState } from "../store";

export const selectAuthLoader = (state: RootState) => state.auth.isLoading;
export const selectUserRole = (state: RootState) => state.auth.userRole;
export const selectOtpSent = (state: RootState) => state.auth.otpSent;
export const selectForgotStep = (state: RootState) => state.auth.forgotStep;
export const selectRegistrationStep = (state: RootState) => state.auth.registrationStep;
export const selectRedirectToLogin = (state: RootState) => state.auth.redirectToLogin;
