import axios from 'axios';
import { env } from '@/utils/env';

const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

// Lazily resolved store reference to avoid circular dependency
let _getState: (() => { accessToken: string | null; refreshAccessToken: () => Promise<void>; logout: () => void }) | null = null;

async function getStore() {
  if (!_getState) {
    const { useAuthStore } = await import('@/lib/store/authStore');
    _getState = useAuthStore.getState;
  }
  return _getState();
}

// Request interceptor — attach Bearer token
apiClient.interceptors.request.use(async (config) => {
  const store = await getStore();
  if (store.accessToken) config.headers.Authorization = `Bearer ${store.accessToken}`;
  return config;
});

// Response interceptor — handle 401 with one refresh retry
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
        refreshQueue.push(() => reject(error));
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const store = await getStore();
      await store.refreshAccessToken();
      const { accessToken } = await getStore();
      if (!accessToken) throw new Error('No token after refresh');

      original.headers.Authorization = `Bearer ${accessToken}`;
      refreshQueue.forEach((cb) => cb(accessToken));
      refreshQueue = [];
      return apiClient(original);
    } catch {
      refreshQueue = [];
      const store = await getStore();
      store.logout();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;

export const get = <T>(url: string, config?: Parameters<typeof apiClient.get>[1]) =>
  apiClient.get<T>(url, config).then((r) => r.data);

export const post = <T>(url: string, data?: unknown, config?: Parameters<typeof apiClient.post>[2]) =>
  apiClient.post<T>(url, data, config).then((r) => r.data);

export const patch = <T>(url: string, data?: unknown, config?: Parameters<typeof apiClient.patch>[2]) =>
  apiClient.patch<T>(url, data, config).then((r) => r.data);

export const del = <T>(url: string, config?: Parameters<typeof apiClient.delete>[1]) =>
  apiClient.delete<T>(url, config).then((r) => r.data);
