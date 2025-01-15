// variable para guardar lista de productos disponibles con nombre, imagen y precio.
import { productosDisponibles } from "./listProductos.js";
import { productoCarrito , listaProductos } from "./scriptCarrito.js";

console.log(productosDisponibles);

//variable para poder modificar el contenido del carrito
let contenidoCarrito = document.querySelector("#armadoCarritoScript");

// creación de un objeto de la clase listaProductos la cual contiene las funciones
// necesarias para poder interactuar con los productos almacenados en la lista de compras
let listaCompras = new listaProductos();



// función para modificar el contenido de la tabla de compras
export function agregarProducto(idProductoAgregar) {

  
  if(!isNaN( parseInt(idProductoAgregar))){

    // creación de un nuevo producto adicionando la cantidad
    let producto = new productoCarrito(
        productosDisponibles[idProductoAgregar],1
    );

    //la función agregar retorna falso si ya esta el producto en la lista
    if(listaCompras.agregar(producto)){

      actualizarCarrito();

      alert('producto agregado al carrito');
    
    }else{
      alert('el producto ya esta agregado al carrito');
    }
    
  }else{
    console.log("el id no es un numero")
  }
  
}

window.agregarProducto = agregarProducto;

function actualizarCarrito(){
  // contenidoCarritoHTML guarda en esquema HTML la lista de los productos agregados al carrito
  let contenidoCarritoHTML = listaCompras.construirHTML();      
  contenidoCarrito.innerHTML = contenidoCarritoHTML;
}

export function aumentarCantidadProducto(id) {
  listaCompras.sumarCantidad(id);
  actualizarCarrito();
}

window.aumentarCantidadProducto = aumentarCantidadProducto;

export function disminuirCantidadProducto(id) {

  // La función restar cantidad retorna un falso si la cantidad es uno
  // Entonces se confirma al usuario si desea eliminar el producto
  if(!listaCompras.restarCantidad(id)){
    alert('seguro desea eliminar el producto')
    listaCompras.eliminar(id);
  }
  
  actualizarCarrito();
}

window.disminuirCantidadProducto = disminuirCantidadProducto;

function disminuir(producto) {
  let indiceListaProductos = encontrarIndiceArrayObjetos(producto);
  if (listaProductos[indiceListaProductos].cantidad == 1) {
    eliminarProducto(producto);
  } else {
    listaProductos[indiceListaProductos].cantidad -= 1;
    listaProductos[indiceListaProductos].total =
      listaProductos[indiceListaProductos].cantidad *
      listaProductos[indiceListaProductos].precio;
  }
  actualizarCarrito();
}



//funcion para eliminar un producto
function eliminarProducto(productoDescartado) {
  let indiceListaProductos = encontrarIndiceArrayObjetos(productoDescartado);
  let indiceListaCompras = encontrarIndiceArray(
    listaCompras,
    indiceListaProductos
  );
  listaCompras.splice(indiceListaCompras, 1);

  actualizarCarrito();
}
