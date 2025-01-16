// variable para guardar lista de productos disponibles con nombre, imagen y precio.
import { productosDisponibles } from "../js/listProductos.js";

// importación de las clases para poder crear productos del carrito y agregarlos a una lista
import { productoCarrito , listaProductos } from "../js/scriptCarrito.js";

import * as alertas from "../js/scriptAlertas.js";

console.log(productosDisponibles);

//variable para poder modificar el contenido del carrito
let contenidoCarrito = document.querySelector("#armadoCarritoScript");

// creación de un objeto de la clase listaProductos la cual contiene las funciones
// necesarias para poder interactuar con los productos almacenados en la lista de compras
let listaCompras = new listaProductos();


let carritoVacio  = document.querySelector('.carritoVacio');

let filaCarrito = document.querySelector('.filaCarrito');

// función para modificar el contenido de la tabla de compras
export async function agregarProducto(idProductoAgregar) {

  if(!isNaN( parseInt(idProductoAgregar))){

    if(listaCompras.listaVacia()){
      carritoVacio.style.display  = "none";
      filaCarrito.classList.remove("d-none");
      filaCarrito.classList.add("display-grid");  
    }
  
    // creación de un nuevo producto adicionando la cantidad
    let producto = new productoCarrito(
        productosDisponibles[idProductoAgregar],1
    );

    //la función agregar retorna falso si ya esta el producto en la lista
    if(listaCompras.agregar(producto)){

      actualizarCarrito();
      
      alertas.productoAgregado()?
      location.href = "#carrito":
      console.log("Seguir comprando")
    
    }else{
      
      if(await alertas.productoYaAgregado()){
        // const elemento = document.getElementById('carrito');
        // const posicionElemento = elemento.offsetTop;
        // // window.scrollTo({ top: posicionElemento, behavior: 'smooth' });
        // elemento.scrollIntoView({behavior: 'smooth'});
      }
      
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

export async function disminuirCantidadProducto(id) {

  // La función restar cantidad retorna un falso si la cantidad es uno
  // Entonces se confirma al usuario si desea eliminar el producto
  if(!listaCompras.restarCantidad(id) ){
    if(await alertas.confirmacionEliminarProducto()){
      listaCompras.eliminar(id);
      alertas.productoEliminado();
    }
  }
  
  if(listaCompras.listaVacia()){
    carritoVacio.style.display  = "block";
    filaCarrito.classList.remove("display-grid");
    filaCarrito.classList.add("d-none");
    contenidoCarrito.innerHTML = "";
  }else{
    actualizarCarrito();
  }
  

}

window.disminuirCantidadProducto = disminuirCantidadProducto;



