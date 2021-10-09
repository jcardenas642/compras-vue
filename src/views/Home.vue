<template>
  <header>
    <img class="logo" src="@/assets/logo.png" alt="Logo" />
    <div id="nav">
      <router-link to="/">Registrar Compra</router-link> |
      <router-link to="/compras">Lista de Compras</router-link> |
      <router-link :to="{ name: 'Login' }">Cerrar Sesión</router-link>
    </div>
    <h1>{{ titulo }}</h1>
  </header>
  <main>
    <div>
      <h2 valor="Hola Mundo">Registrar Compra</h2>
      <form action="#" id="form_compra">
        <label for="cliente">Cliente:</label>
        <input type="text" name="cliente" v-model="compra.cliente" />
        <label for="documento">Documento:</label>
        <input type="text" name="documento" v-model="compra.documento" />
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
        <div>
          <input type="radio" name="envio" v-model="compra.envio" value="0" />
          Express
        </div>
        <div>
          <input type="radio" name="envio" v-model="compra.envio" value="1" />
          Normal
        </div>
        <button type="reset">Limpiar</button>
        <button @click.prevent="procesarInformacion">Agregar Compra</button>
      </form>
    </div>

    
  </main>
</template>

<script>
// @ is an alias to /src
import ProductoService from "@/services/productos.js";
import CompraService from "@/services/compras.js";

export default {
  mounted() {
    this.listaProductos= ProductoService.obtenerTodos();
    this.listaCompras= CompraService.obtenerTodos();
  },
  data() {
    return {
      listaProductos: [],
      titulo: "Registro de Compra",
      listaCompras: [],
      compra: {
        cliente: "",
        documento: "",
        producto: {},
        cantidad: 0,
        envio: 1,
      },
      seleccion: -1,
      nombresEnvio: ["Express", "Normal"],
      valoresEnvio: [20000, 10000],
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

      let subtotal = this.compra.producto.precio * this.compra.cantidad;
      let valorEnvio = 0;

      if (this.compra.cantidad > 10) {
        this.compra.descuento = subtotal * 0.1;
      }

      if (subtotal > 5000000) {
        if (this.compra.envio == 0) {
          valorEnvio = this.valoresEnvio[1];
        } else {
          valorEnvio = 0;
        }
        this.compra.descuento +=
          this.valoresEnvio[this.compra.envio] - valorEnvio;
      } else {
        valorEnvio = this.valoresEnvio[this.compra.envio];
      }

      this.compra.total = valorEnvio + subtotal - this.compra.descuento;

      this.listaCompras.push(this.compra);

        this.limpiarFormulario();

        this.$router.push({name:"Compras"});

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
