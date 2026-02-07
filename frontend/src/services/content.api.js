import axios from "axios";
import { API_V1 } from "./apiBase";

/* ---------- AXIOS INSTANCE ---------- */
const API = axios.create({
  baseURL: API_V1,
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