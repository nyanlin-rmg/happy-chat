import axios from "axios";
import { API_URL } from "./envVariables";

export const axiosInstance = axios.create(
    {
        baseURL: API_URL,
        withCredentials: true
    }
);