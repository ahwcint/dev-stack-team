'use client';
import axiosInstance from 'axios';
import getHeaders from './getHeaders';

const axios = axiosInstance.create({
  withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
  const BearerToken = await getHeaders('Authorization');
  if (BearerToken) {
    config.headers.Authorization = BearerToken;
  }
  return config;
});

export default axios;
