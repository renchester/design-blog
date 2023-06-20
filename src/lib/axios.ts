import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosPublic;
