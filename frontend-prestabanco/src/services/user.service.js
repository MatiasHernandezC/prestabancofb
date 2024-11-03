import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/users/');
}

const create = data => {
    return httpClient.post("/api/v1/users/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/users/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/users/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/users/${id}`);
}
const login = (email, password) => {
    return httpClient.post("/api/v1/users/login", { email, password });
}
export default { getAll, create, get, update, remove, login };