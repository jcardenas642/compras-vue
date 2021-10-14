import axios from "axios";

class EnvioService{
    url="http://localhost:8000/envio";

    obtenerTodos(){
        return axios.get(`${this.url}/todos`);
    }
}
export default new EnvioService();