
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api":"/api",
  withCredentials: true,
});

// You can add interceptors or additional config if needed

export default axiosInstance;