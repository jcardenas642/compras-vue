<template>
  <header>
            <h1>{{titulo}}</h1>
        </header>        
        <main>
            <div>
                <h2 valor="Hola Mundo">Registrar Compra</h2>
                <form action="#" id="form_compra">
                    <label for="cliente">Cliente:</label>
                    <input type="text" name="cliente" v-model="cliente">
                    <label for="documento">Documento:</label>
                    <input type="text" name="documento" v-model="documento">
                    <label for="producto">Producto:</label>
                    <select name="producto" id="productos" v-model="seleccion">
                        <option value="-1">Seleccione un producto</option>
                        <option v-for="unProducto, llave in listaProductos" :key="llave" :value="llave">{{unProducto.nombre}} - ${{unProducto.precio}}</option>                       
                    </select>
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" name="cantidad" v-model="cantidad">
                    <div>
                        <input type="radio" name="envio" v-model="envio" value="0"> Express
                </div>
                <div>
                    <input type="radio" name="envio" v-model="envio" value="1"> Normal
                </div>
                <button type="reset">Limpiar</button>
                <button @click.prevent="procesarInformacion" type="button">Agregar Compra</button>
            </form>  
            
        </div>
        
        <div>
            <h2>Listado de Compras</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>CLIENTE</th>
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>
                        <th>ENVÍO</th>
                        <th>DESCUENTO</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody id="datos_compras">
                    <tr v-for="unaCompra in listaCompras" :key="unaCompra">
                <td>{{unaCompra.cliente}} ({{unaCompra.documento}})</td>
                <td>{{unaCompra.producto.nombre}} - ${{unaCompra.producto.precio}}</td>
                <td>{{unaCompra.cantidad}}</td>
                <td>{{nombresEnvio[unaCompra.envio]}}</td>
                <td>${{unaCompra.descuento}}</td>
                <td>${{unaCompra.total}}</td>
            </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
// @ is an alias to /src

export default {
    mounted(){
        let producto1 = {"nombre":"Disco Duro", "precio":200000};
        let producto2 = {"nombre":"Teclado", "precio":100000};
        let producto3 = {"nombre":"Mouse", "precio":80000};
        let producto4 = {"nombre":"Pantalla", "precio":800000};
        let producto5 = {"nombre":"Memoria USB", "precio":50000};

        this.listaProductos = [producto1, producto2, producto3, producto4, producto5];
    },
    data(){
        return {
            listaProductos:[],
            titulo:"Registro y Listado de Compras",
            listaCompras:[],
            compra:{},
            cliente:"",
            documento:"",
            producto:{},
            cantidad:0,
            envio:1,            
            seleccion:-1,
            nombresEnvio : ["Express", "Normal"],
            valoresEnvio : [20000, 10000],
        };
    },
    methods:{
        procesarInformacion(){

        this.compra.cliente=this.cliente;
        this.compra.documento=this.documento;
        this.compra.envio=this.envio;
        this.compra.cantidad=this.cantidad;
            this.compra.total=0;
    this.compra.descuento=0;

    this.compra.producto = this.listaProductos[this.seleccion];

    let subtotal = this.compra.producto.precio*this.compra.cantidad;
    let valorEnvio=0;

    if(this.compra.cantidad>10){
        this.compra.descuento = subtotal*0.1;
    }


    if(subtotal>5000000){
        if (this.compra.envio==0) {
            valorEnvio = this.valoresEnvio[1];
            
        } else {
            valorEnvio=0;
        }
        this.compra.descuento += this.valoresEnvio[this.compra.envio] - valorEnvio;
    }else{
        valorEnvio = this.valoresEnvio[this.compra.envio];
    }


    this.compra.total = valorEnvio + subtotal - this.compra.descuento;

    var unaCompra = this.compra;

    this.listaCompras.push(unaCompra);


        }
    },
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>

body{
                padding: 1rem;
            }
            
            #form_compra{
                display: grid;
                grid-template-columns: 6rem 10rem;
                row-gap: 1rem;
            }
            
            main{
                display: grid;
                grid-template-columns: 4fr 8fr;
                column-gap: 1rem;
            }
            
            table{
                width: 80%;
                margin: auto;
            }


</style>
