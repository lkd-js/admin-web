import axios from "axios";

export const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/7e6619562f860c1fe1118814b35fe0b1/lkd/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

service.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || '';
    }
    return config
})

service.interceptors.response.use((res) => {
    const code: number = res.data.code;
    if (code != 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    console.log(err);
})