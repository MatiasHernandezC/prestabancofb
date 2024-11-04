import httpClient from "../http-common";

const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const uploadDocument = (file, type, userId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("userId", userId);

    return httpClient.post('/api/v1/documents/', formData, {
        headers: {
            ...authHeader(),
            "Content-Type": "multipart/form-data"
        }
    });
};

const getAllDocuments = () => {
    return httpClient.get('/api/v1/documents', { headers: authHeader() });
};

const getDocumentById = (id) => {
    return httpClient.get(`/api/v1/documents/${id}`, { headers: authHeader() });
};

const deleteDocument = (id) => {
    return httpClient.delete(`/api/v1/documents/${id}`, { headers: authHeader() });
};

export default { uploadDocument, getAllDocuments, getDocumentById, deleteDocument };