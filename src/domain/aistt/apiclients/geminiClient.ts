import axios from "axios";

export const geminiAxiosInstance = axios.create({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/models/",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
});
