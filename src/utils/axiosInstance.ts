import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Get the JWT token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach the token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (Optional: handle token expiration)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or unauthorized
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
