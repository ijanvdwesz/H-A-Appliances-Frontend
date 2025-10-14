import axios from "axios";

// ✅ Automatically switch between local and production
const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://h-a-appliances.onrender.com",
});

export default API;