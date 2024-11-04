import httpClient from "../http-common";

// Configuración para agregar el token de autenticación si está disponible
const authHeader = () => {
    const token = localStorage.getItem("token"); // Asegúrate de ajustar esta línea si usas otro almacenamiento
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = () => {
    return httpClient.get('/api/v1/users/', { headers: authHeader() });
};

const create = (data) => {
    return httpClient.post('/api/v1/users/', data, { headers: authHeader() });
};

const get = (id) => {
    return httpClient.get(`/api/v1/users/${id}`, { headers: authHeader() });
};

const update = (data) => {
    return httpClient.put('/api/v1/users/', data, { headers: authHeader() });
};

const remove = (id) => {
    return httpClient.delete(`/api/v1/users/${id}`, { headers: authHeader() });
};

// Función de login
const login = (email, password) => {
    return httpClient.post('/api/v1/users/login', { email, password });
};

// Función para logout (eliminar el token)
const logout = () => {
    localStorage.removeItem("token");
};

export default { getAll, create, get, update, remove, login, logout };