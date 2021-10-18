import axios from "axios";

class CompraService {
    compras = [];
    url="http://localhost:8000/compra"

    constructor() {
        this.compras = [
            
        ];
    }

    obtenerTodos() {
        return this.compras;
    }

    registrar(compra){
        return axios.post(`${this.url}`, compra);
    }

    obtenerPorCliente(){

        let id = localStorage.cliente;
        return axios.get(`${this.url}/cliente/${id}`);

    }

} export default new CompraService();