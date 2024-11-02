import axios from "axios";

const monoliticoServer = import.meta.env.VITE_MONOLITICO_SERVER;
const monoliticoPort = import.meta.env.VITE_MONOLITICO_PORT;

console.log(monoliticoServer)
console.log(monoliticoPort)

export default axios.create({
    baseURL: `http://${monoliticoServer}:${monoliticoPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
}); 