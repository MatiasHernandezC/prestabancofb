import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/userLoans/');
}

const create = data => {
    return httpClient.post("/api/v1/userLoans/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/userLoans/${id}`);
}
const getRequirements = loanName => {
    return httpClient.get(`/api/v1/requirements/loanName/${loanName}`);
}
const requestLoan = (loanName, amount, years, interest, userRut) => {
    return httpClient.post(`/api/v1/userLoans/request/${loanName}/${amount}/${years}/${interest}/${userRut}`);
}

const update = data => {
    return httpClient.put('/api/v1/userLoans/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/userLoans/${id}`);
}
export default { getAll, create, get, update, remove, getRequirements, requestLoan };