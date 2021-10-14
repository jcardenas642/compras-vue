import axios from "axios";

class ClienteService{
    url="http://localhost:8000/cliente";

    validar(usuario, password){
        for (const unCliente of this.listado) {
            if (unCliente.usuario==usuario&&unCliente.password==password) {
                this.cliente=unCliente;
                break;
            }else{
                this.cliente={}
            } 
        }
    }

    obtenerCliente(){
        return axios.get(`${this.url}/2`);
    }

}export default new ClienteService();