const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000";

export const API_BASE_URL = API_BASE;
export const API_V1 = `${API_BASE}/api/v1`;
export const API_ADMIN = `${API_BASE}/api/admin`;
export const API_STATS = `${API_BASE}/api/stats`;
