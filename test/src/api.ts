import responseApi from "./hook/response-api"

export const getPocApi = (id: number) => {
    return responseApi(`https://pokeapi.co/api/v2/pokemon/${id}`, 'get')
}