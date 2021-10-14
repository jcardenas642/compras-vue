import axios from "axios";

class ProductoService{
    url="http://localhost:8000/producto";
    // Spring boot

    obtenerTodos(){
        return axios.get(`${this.url}/todos`);
    }

}export default new ProductoService();