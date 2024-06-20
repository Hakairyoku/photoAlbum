import axios from 'axios';
let accessToken = '';

const requestAxios = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

console.log(accessToken);

function setAccessToken(token) {
  accessToken = token;
}

requestAxios.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

requestAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await requestAxios.get('/tokens/refresh');
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return requestAxios(prevRequest);
    }
    return Promise.reject(error);
  }
);

export { setAccessToken };

export default requestAxios;