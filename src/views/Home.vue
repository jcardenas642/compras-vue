<template>
  <header>
    <img class="logo" src="@/assets/logo.png" alt="Logo" />
    <div id="nav">
      <router-link to="/">Registrar Compra</router-link> |
      <router-link to="/compras">Lista de Compras</router-link> |
      <router-link :to="{ name: 'Login' }">Cerrar Sesión</router-link>
    </div>
    <h1>{{ titulo }} - Bienvenid@ {{cliente.nombre}}</h1>
  </header>
  <main>
    <div>
      <h2 valor="Hola Mundo">Registrar Compra</h2>
      <form action="#" id="form_compra">

        <label for="producto">Producto:</label>
        <select name="producto" id="productos" v-model="seleccion">
          <option value="-1">Seleccione un producto</option>
          <option
            v-for="(unProducto, llave) in listaProductos"
            :key="llave"
            :value="llave"
          >
            {{ unProducto.nombre }} - ${{ unProducto.precio }}
          </option>
        </select>
        <label for="cantidad">Cantidad:</label>
        <input type="number" name="cantidad" v-model="compra.cantidad" />
        <div v-for="unEnvio, i in listaEnvios" :key="unEnvio.id">
          <input type="radio" name="envio" v-model="envio" :value="i" />
          {{unEnvio.nombre}}
        </div>        
        <button type="reset">Limpiar</button>
        <button @click.prevent="procesarInformacion">Agregar Compra</button>
      </form>
    </div>

    
  </main>
</template>

<script>
// @ is an alias to /src
import ProductoService from "@/services/productos";
import CompraService from "@/services/compras";
import EnvioService from "@/services/envios";
import ClienteService from "@/services/clientes";

export default {
  mounted() {
    ClienteService.obtenerCliente().then((respuesta)=>{
            this.cliente=respuesta.data;
        }).catch((error)=>{
            console.log("Error Cliente",error);
        });
    ProductoService.obtenerTodos().then((respuesta)=>{
            this.listaProductos=respuesta.data;
        }).catch((error)=>{
            console.log("Error Productos",error);
        });

    EnvioService.obtenerTodos().then((respuesta)=>{
            this.listaEnvios=respuesta.data;
        }).catch((error)=>{
            console.log("Error Envios",error);
        });
    this.listaCompras= CompraService.obtenerTodos();
  },
  data() {
    return {
      cliente:{},
      listaProductos: [],
      titulo: "Registro de Compra",
      listaCompras: [],
      compra: {
        cliente: {},
        producto: {},
        cantidad: 0,
        envio:{}
      },
      envio: 1,
      seleccion: -1,
      listaEnvios:[]
    };
  },
  methods: {
    limpiarFormulario() {
      this.compra = {
        cliente: "",
        documento: "",
        producto: {},
        cantidad: 0,
        envio: 1,
      };
      this.seleccion = -1;
    },
    procesarInformacion() {
      this.compra.total = 0;
      this.compra.descuento = 0;

      this.compra.producto = this.listaProductos[this.seleccion];
      this.compra.envio=this.listaEnvios[this.envio];
        this.compra.cliente=this.cliente;

      let subtotal = this.compra.producto.precio * this.compra.cantidad;
      let valorEnvio = 0;

      if (this.compra.cantidad > 10) {
        this.compra.descuento = subtotal * 0.1;
      }

      if (subtotal > 5000000) {
        if (this.envio == 0) {
          valorEnvio = this.listaEnvios[1].precio;
        } else {
          valorEnvio = 0;
        }
        this.compra.descuento +=
          this.listaEnvios[this.envio].precio - valorEnvio;
      } else {
        valorEnvio = this.listaEnvios[this.envio].precio;
      }

      this.compra.total = valorEnvio + subtotal - this.compra.descuento;

      CompraService.registrar(this.compra).then((respuesta)=>{
            this.compra=respuesta.data;
            this.$router.push({name:"Compras"});
        }).catch((error)=>{
            console.log("Error Compra",error);
        });

      this.listaCompras.push(this.compra);

        this.limpiarFormulario();


    },
  },
  name: "Home",
  components: {},
};
</script>

<style scoped>
#form_compra {
  display: grid;
  grid-template-columns: 6rem 10rem;
  row-gap: 1rem;
}

main {
  display: grid;
  grid-template-columns: 4fr 8fr;
  column-gap: 1rem;
  padding: 2rem;
}

table {
  width: 80%;
  margin: auto;
}
</style>
