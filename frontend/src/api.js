import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ loads from .env

export const getItems = async () => {
  const res = await axios.get(`${API_BASE_URL}/items`);
  return res.data;
};

export const createItem = async (data) => {
  const res = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json(); // return JSON (either {item} or item)
};


export const deleteItem = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/items/${id}`);
  return res.data;
};

export const updateItem = async (id, item) => {
  const res = await axios.put(`${API_BASE_URL}/items/${id}`, item);
  return res.data;
};
