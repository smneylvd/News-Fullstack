import axios from 'axios';

const per_page = process.env.REACT_APP_ORDERS_PER_PAGE;
const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

const instance = axios.create({
    baseURL: baseURL
});

instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");

    request.headers!["Bearer"] = `${token}`;
    request.headers!["Content-Type"] = "application/json";

    return request;
});
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        const prevReq = error?.config;
        return Promise.reject(error);
    }
);


export const authApi = {
    login(body: { email: string, password: string }) {
        return instance.post(`/api/auth/login`, body);
    },
    register(body: { email: string, password: string, companyName: string }) {
        return instance.post(`/api/auth/register`, body);
    }
};

export const newsApi = {
    search(body: {
        q: string,
        category: string,
        source: string,
        date_from: string,
        date_to: string,
    }) {
        console.log("API", body);
        let query = `api/search?`;
        if (body.q !== "") {
            query += `q=${body.q}&`;
        }
        if (body.category !== "") {
            query += `category=${body.category}&`;
        }
        if (body.source !== "") {
            query += `source=${body.source}&`;
        }
        if (body.date_from !== "") {
            query += `date_from=${body.date_from}&`;
        }
        if (body.date_to !== "") {
            query += `date_to=${body.date_to}&`;
        }
        return instance.get(query);
    },
    getNews() {
        return instance.get(`api/news`);
    },
    getCategories() {
        return instance.get(`api/categories`);
    },
    getSources() {
        return instance.get(`api/sources`);
    },
    getNewsDetail(news_id: number) {
        if (!news_id) {
            news_id = -1;
        }
        return instance.get(`api/news/${news_id}`);
    },
};
export default instance;
