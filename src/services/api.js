import axios from "axios";

const api = axios.create({
    baseURL: "https://6748003a-cfbf-4996-ba84-8c80138f119e.app.withsutro.com/api/v1.0.1",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;