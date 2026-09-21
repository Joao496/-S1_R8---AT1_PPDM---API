import axios from "axios";

const api = axios.create({
    baseURL: "https://dragonball-api.com/api"
});

export async function listarPersonagens() {

    const resposta = await api.get("/characters");

    return resposta.data.items;
}