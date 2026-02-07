import axios from "axios";

/* ---------- AXIOS INSTANCE ---------- */
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

/* ---------- FETCH BY TYPE ---------- */
export const fetchContentByType = async (type) => {
  const res = await API.get(`/content/${type}`);
  return res.data.data; // 👈 backend sends { success, data }
};

/* ---------- FETCH BY TYPE + SLUG ---------- */
export const fetchContentBySlug = async (type, slug) => {
  const res = await API.get(`/content/${type}/${slug}`);
  return res.data.data;
};