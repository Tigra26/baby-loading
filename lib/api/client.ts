import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

let refreshPromise: Promise<boolean> | null = null;

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      refreshPromise ??= apiClient
        .get("/auth/session")
        .then((res) => res.data.success)
        .catch(() => false)
        .finally(() => {
          refreshPromise = null;
        });

      const refreshed = await refreshPromise;

      if (refreshed) {
        return apiClient(original);
      }
    }

    return Promise.reject(error);
  }
);
