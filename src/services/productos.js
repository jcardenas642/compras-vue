class ProductoService{
    productos=[];

    constructor(){
        this.productos=[
            { nombre: "Disco Duro", precio: 200000 },
            { nombre: "Teclado", precio: 100000 },
            { nombre: "Mouse", precio: 80000 },
            { nombre: "Pantalla", precio: 800000 },
            { nombre: "Memoria USB", precio: 50000 }
        ];
    }

    // Spring boot

    obtenerTodos(){
        return this.productos;
    }

}export default new ProductoService();