export const isAuthenticated = (): boolean => {
    return (localStorage.getItem('token') != null || localStorage.getItem('userRole') != null);
};

