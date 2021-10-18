<template>
  <header>
      <img class="logo" src="@/assets/logo.png" alt="Logo">
  <div id="nav">
    <router-link to="/">Registrar Compra</router-link> |
    <router-link to="/compras">Lista de Compras</router-link> |
    <a @click.prevent="cerrarSesion" href="#">Cerrar Sesión</a>
  </div>
      <h1>Listado de Compras - {{cliente.nombre}}</h1>
        </header> 
        <main>
          <div>
      <table border="1">
        <thead>
          <tr>
            <th>PRODUCTO</th>
            <th>CANTIDAD</th>
            <th>ENVÍO</th>
            <th>DESCUENTO</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody id="datos_compras">
          <tr v-for="unaCompra in listaCompras" :key="unaCompra">
            <td>
              {{ unaCompra.producto.nombre }} - ${{ unaCompra.producto.precio }}
            </td>
            <td>{{ unaCompra.cantidad }}</td>
            <td>{{ unaCompra.envio.nombre }}</td>
            <td>${{ unaCompra.descuento }}</td>
            <td>${{ unaCompra.total }}</td>
          </tr>
        </tbody>
      </table>
    <router-link class="boton" :to="{name:'Registro'}">Crear nueva Compra</router-link>
    </div>



        </main>
</template>

<script>
import CompraService from "@/services/compras.js";
import ClienteService from "@/services/clientes.js";

export default {
  mounted(){
    
    CompraService.obtenerPorCliente().then((respuesta)=>{
      this.listaCompras=respuesta.data;
    });
    

    ClienteService.obtenerCliente().then((respuesta)=>{
        this.cliente=respuesta.data;
    });
 
  },
  data(){
    return {
      titulo:"Página de Acerca de",
      listaCompras:[],
      nombresEnvio: ["Express", "Normal"],
      cliente:{}
    };
  },
  methods:{
    cerrarSesion(){
      localStorage.clear();
      this.$router.push({name:"Login"});
    }
  }
}
</script>

<style scoped>
  .boton{
    color: white;
    background-color: green;
    padding: 1rem;
    text-decoration: none;
    margin-top: 5rem;
  }

  table{
    margin: 2rem auto;    
  }

</style>