import axios from 'axios';

axios.defaults.baseURL = '/'; // use Vite proxy in dev

axios.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${t}` };
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('token');
      if (location.pathname !== '/login') location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default axios;
