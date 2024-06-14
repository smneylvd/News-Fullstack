const appRoot = '/app';

export const routes = {
    login: `/auth/login`,
    register: `/auth/register`,
    passwordReset: `/auth/password-reset`,
    main: `${appRoot}/main`,
    news: `${appRoot}/news`,
    newsDetail: `${appRoot}/news/:id`,
    university: `${appRoot}/university`,
    universityDetails: `${appRoot}/university/1`,
};
