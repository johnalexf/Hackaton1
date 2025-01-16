// variable para guardar lista de productos disponibles con nombre, imagen y precio.
import { productosDisponibles } from "./listProductos.js";
import { productoCarrito , listaProductos } from "./scriptCarrito.js";

console.log(productosDisponibles);

//variable para poder modificar el contenido del carrito
let contenidoCarrito = document.querySelector("#armadoCarritoScript");

// creación de un objeto de la clase listaProductos la cual contiene las funciones
// necesarias para poder interactuar con los productos almacenados en la lista de compras
let listaCompras = new listaProductos();


let carritoVacio  = document.querySelector('.carritoVacio');

let filaCarrito = document.querySelector('.filaCarrito');

// función para modificar el contenido de la tabla de compras
export function agregarProducto(idProductoAgregar) {

  
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



