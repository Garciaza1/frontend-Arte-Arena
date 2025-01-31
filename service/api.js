import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // URL do backend Laravel
    withCredentials: true, // Permite o envio de cookies (necessário para o CSRF)
});

// Obtém o token CSRF antes de cada requisição
api.interceptors.request.use(async (config) => {
    // Verifica se a requisição já é para obter o token CSRF
    if (!config.url.includes('/sanctum/csrf-cookie')) {
        await api.get('/sanctum/csrf-cookie'); // Obtém o token CSRF
    }
    return config;
});

export default api;