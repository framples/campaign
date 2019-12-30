import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : "http://localhost:3001/"

export default {
    saveChar: async function(charObject) {
        const response = await axios.post(`${baseURL}api/characters`, charObject)
        return response.data;
    },
    findChar: async function(charObject) {
        const response = await axios.get(`${baseURL}api/characters`, {params: charObject});
        return response.data;
    },
    deleteChar: async function(charObject) {
        const response = await axios.delete(`${baseURL}api/characters/` + charObject.id, {params: charObject})
        return response.data;
    }
}