// variable para guardar lista de productos disponibles con nombre, imagen y precio.
import { productosDisponibles } from "./listProductos.js";
import { productoCarrito , listaProductos } from "./scriptCarrito.js";

console.log(productosDisponibles);

//variable para poder modificar el contenido del carrito
let contenidoCarrito = document.querySelector("#contenidoCarrito");

// listaComprasId guarda el id deñ producto que se desea agregar al carrito
let listaComprasId = [];

// contenidoCarritoHTML guarda en esquema HTML la lista de los productos agregados al carrito
let contenidoCarritoHTML = "";



let listaCompras = new listaProductos();

console.log(listaCompras);

// función para modificar el contenido de la tabla de compras
export function agregarProducto(idProductoAgregar) {

  
  if(!isNaN( parseInt(idProductoAgregar))){

    let producto = new productoCarrito(
        productosDisponibles[idProductoAgregar],1
    );
    if(listaCompras.agregar(producto)){
    alert('producto agregado al carrito');
    }else{
    alert('el producto ya esta agregado al carrito');

    }
    console.log(producto)

    
  }else{
    console.log("id invalido")
  }
  
  
  console.log(listaCompras);

}

window.agregarProducto = agregarProducto;

//creacion del texto en HTML para mostrar la lista de productos y cargalos en el contenido del carrito
function actualizarCarrito() {
  let total = 0;
  contenidoCarritoHTML = "";
  for (const valor of listaCompras) {
    contenidoCarritoHTML +=
      `
        
        ``<tr>` +
      `<td> <img src="${listaProductos[valor].img}" alt=""> <h6> ${listaProductos[valor].nombre} </h6> </td>` +
      `<td> <button class="boton-carrito" onclick="disminuir('${listaProductos[valor].nombre}')">  - </button> 
            <h6> ${listaProductos[valor].cantidad} </h6> 
              <button class="boton-carrito" onclick="aumentar('${listaProductos[valor].nombre}')"> + </button>
         </td> ` +
      `<td> <h6>$${listaProductos[valor].precio} </h6> </td>` +
      `<td> <h6>$${listaProductos[valor].total} </h6> </td>` +
      `<td>  <button class="boton-carrito" onclick="eliminarProducto('${listaProductos[valor].nombre}')"> X </button> </td>` +
      `</tr>`;
    total += listaProductos[valor].total;
  }
  contenidoCarritoHTML +=
    `<tr>` +
    `<td> <h5> El total de la compra es : </h5> </td>` +
    `<td> <h5>  $${total} </h5> </td>` +
    `</tr>`;

  contenidoCarrito.innerHTML = contenidoCarritoHTML;
}

//funcion para encontrar el indice (ubicacion) de un valor dentro de una lista
function encontrarIndiceArray(lista, valor) {
  let indice = -1;
  for (i = 0; i < lista.length; i++) {
    if (lista[i] == valor) {
      indice = i;
    }
  }
  return indice;
}

//
function encontrarIndiceArrayObjetos(valor) {
  let index = 0;
  for (i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i].nombre == valor) {
      index = i;
    }
  }
  return index;
}

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

function aumentar(producto) {
  let indiceListaProductos = encontrarIndiceArrayObjetos(producto);
  listaProductos[indiceListaProductos].cantidad += 1;
  listaProductos[indiceListaProductos].total =
    listaProductos[indiceListaProductos].cantidad *
    listaProductos[indiceListaProductos].precio;
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
