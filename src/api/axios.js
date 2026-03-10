import axios from "axios";

// Axios instance pointing to the backend server
const api = axios.create({
    baseURL: "https://caritasconnect.ddns.net/billtill/api",
    headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 (expired/invalid token) globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect and clear storage if NOT on the login page
            if (window.location.pathname !== "/login") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
