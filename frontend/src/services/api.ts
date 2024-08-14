import axios from 'axios';
import { searchChefsProps } from '../type';
import { Chef } from '../components/type';

const API_URL = 'https://swaad-link-backend.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
});



export const getChefs = async (params?: string):Promise<Chef[]> => {
  const response = await api.get('/chefs', { params });
  return response.data;
};

export const getChefById = async (id: string):Promise<Chef> => {
  const response = await api.get(`/chefs/${id}`);
  return response.data;
};


export const searchChefs = async (params: searchChefsProps) => {
  const response = await api.get('/chefs/search', { params });
  return response.data;
};