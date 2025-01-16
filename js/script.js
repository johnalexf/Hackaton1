// variable para guardar lista de productos disponibles con nombre, imagen y precio.
import { productosDisponibles } from "../js/listProductos.js";

// importación de las clases para poder crear productos del carrito y agregarlos a una lista
import { productoCarrito, listaProductos } from "../js/scriptCarrito.js";

// importación de las funciones que permiten mostrar alertas con sweetAlert
import * as alertas from "../js/scriptAlertas.js";

//variable para poder modificar el contenido del carrito
let contenidoCarrito = document.querySelector("#armadoCarritoScript");

// creación de un objeto de la clase listaProductos la cual contiene las funciones
// necesarias para poder interactuar con los productos almacenados en la lista de compras
let listaCompras = new listaProductos();

//contenedor del mensaje que informa que el carrito esta vació
let carritoVacio = document.querySelector(".carritoVacio");

// primera fila del carrito la cual representa los títulos de la tabla,
//  con el fin de ocultarla para pantallas pequeñas
let filaCarrito = document.querySelector(".filaCarrito");



//función para actualizar el DOM de la pagina, en donde:
// se determina si se oculta o se actualiza los nuevos valores
function actualizarCarritoHTML() {
  if (listaCompras.listaVacia()) {
    carritoVacio.style.display = "block";
    filaCarrito.classList.remove("display-grid");
    filaCarrito.classList.add("d-none");
    contenidoCarrito.innerHTML = "";
  } else {
    // contenidoCarritoHTML guarda en esquema HTML la lista de los productos agregados al carrito
    let contenidoCarritoHTML = listaCompras.construirHTML();
    contenidoCarrito.innerHTML = contenidoCarritoHTML;
  }
}

// función para agregar el contenido de la tabla de compras
export async function agregarProducto(idProductoAgregar) {
  if (!isNaN(parseInt(idProductoAgregar))) {
    // bloque que se ejecuta si la lista de productos esta vacía, en donde:
    // se oculta el mensaje de carrito vacío y se muestra los títulos de la tabla del carrito
    if (listaCompras.listaVacia()) {
      carritoVacio.style.display = "none";
      filaCarrito.classList.remove("d-none");
      filaCarrito.classList.add("display-grid");
    }

    // creación de un nuevo producto adicionando la cantidad
    let producto = new productoCarrito(
      productosDisponibles[idProductoAgregar],
      1
    );

    //la función agregar retorna falso si ya esta el producto en la lista
    if (listaCompras.agregar(producto)) {
      actualizarCarritoHTML();
      //la función productoAgregado espera confirmación del usuario si desea ver el carrito
      if (await alertas.productoAgregado()) {
        setTimeout(irAlCarrito, 300);
      }
    } else {
      //la función productoYaAgregado espera confirmación del usuario si desea ver el carrito
      if (await alertas.productoYaAgregado()) {
        setTimeout(irAlCarrito, 300);
      }
    }
  } else {
    console.log("el id no es un numero");
  }
}
window.agregarProducto = agregarProducto;

//Esta función dirige a la pagina a la sección de carrito
//Cuando es llamada en una función asíncrona esta pierde su funcionalidad
//al momento de terminar la función asíncrona, por tanto, al llamarla es necesario darle
//un tiempo de espera para que se ejecute después de que termine la función asíncrona
function irAlCarrito() {
  const elemento = document.getElementById("carrito");
  elemento.scrollIntoView({ behavior: "smooth" });
}

export function aumentarCantidadProducto(id) {
  listaCompras.sumarCantidad(id);
  actualizarCarritoHTML();
}
window.aumentarCantidadProducto = aumentarCantidadProducto;

export async function disminuirCantidadProducto(id) {
  // La función restar cantidad retorna un falso si la cantidad es uno,
  // por tanto, se confirma al usuario si desea eliminar el producto
  if (!listaCompras.restarCantidad(id)) {
    await eliminarProducto(id);
  } else {
    actualizarCarritoHTML();
  }
}
window.disminuirCantidadProducto = disminuirCantidadProducto;

export async function eliminarProducto(id) {
  if (await alertas.confirmacionEliminarProducto()) {
    listaCompras.eliminar(id);
    alertas.productoEliminado();
  }
  actualizarCarritoHTML();
}
window.eliminarProducto = eliminarProducto;
