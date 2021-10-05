<template>
  <header>
            <h1>Página de gestión de compras</h1>
        </header>
        
        <main>
            <div>
                <h2 valor="Hola Mundo">Registrar Compra</h2>
                <form action="#" id="form_compra">
                    <label for="cliente">Cliente:</label>
                    <input type="text" name="cliente">
                    <label for="documento">Documento:</label>
                    <input type="text" name="documento">
                    <label for="producto">Producto:</label>
                    <select name="producto" id="productos">                        
                    </select>
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" name="cantidad">
                    <div>
                        <input type="radio" name="envio" value="0"> Express
                </div>
                <div>
                    <input type="radio" name="envio" value="1"> Normal
                </div>
                <button type="reset">Limpiar</button>
                <button onclick="procesarInformacion()" type="button">Agregar Compra</button>
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
                    
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
// @ is an alias to /src

export default {
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
