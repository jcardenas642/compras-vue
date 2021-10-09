class ClienteService{
    cliente={};
    listado=[];

    constructor(){
        this.listado=[
            {nombre:"Juan", usuario:"juan", password:"123456"},
            {nombre:"Maria", usuario:"maria", password:"654321"},
        ]
    }

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
        return this.cliente;
    }

}export default new ClienteService();