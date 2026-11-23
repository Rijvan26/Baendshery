import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/message",
  withCredentials: true,
});

export const getMessages = async (receiverId) => {
  const response = await api.get(`/${receiverId}`);
  return response.data;
};

export const sendMessage = async (receiverId, text) => {
  const response = await api.post(`/send/${receiverId}`, { text });
  return response.data;
};
