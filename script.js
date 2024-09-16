// variable para guardar lista de productos disponibles con nombre, imagen y precio.
//import { listaProductos } from "./listProductos.js";

let listaProductos = [
    {
        nombre: 'Raqueta para niños',
        img: "https://img.freepik.com/foto-gratis/raquetas-badminton-alto-angulo-campo_23-2149733001.jpg?t=st=1726514542~exp=1726518142~hmac=61653d6d329c95ded496be830c2736438a0da84c5a00d626d10c5bdeb94f05a8&w=360" ,
        precio: 150000,
        cantidad: 1,
        total: 150000
    },
    {
        nombre: 'Raqueta para adultos color amarilla',
        img: "https://img.freepik.com/foto-gratis/pelota-amarilla-acostado-tenis-raqueta_23-2147829466.jpg?t=st=1726514579~exp=1726518179~hmac=5e3bb9ef2b5eeef6678f490fed7ddad3de0e815a9da202a9ab1b5a7e116ac90f&w=740" ,
        precio: 321000,
        cantidad: 1,
        total: 321000
    },
    {
        nombre: 'Raqueta para adultos color roja',
        img: "https://img.freepik.com/foto-gratis/concepto-equipo-deporte-pelota-tenis-raqueta_53876-31460.jpg?t=st=1726514610~exp=1726518210~hmac=8905cc8f3cc654fbc806eba0bb930c0575791e514b58670edefdaa6c04eb4ec9&w=740" ,
        precio: 321000,
        cantidad: 1,
        total: 321000
    },
    {
        nombre: 'Ropa para niñas',
        img: "https://img.freepik.com/foto-gratis/primer-plano-nina-tenencia-badminton_23-2147904650.jpg?t=st=1726514878~exp=1726518478~hmac=ca17922a2da50381bab2ca865546d9df99c3e0dc78ebe6ebe302102d96593564&w=740" ,
        precio: 98000,
        cantidad: 1,
        total: 98000
    },
    {
        nombre: 'Ropa para mujer',
        img: "https://img.freepik.com/foto-gratis/retrato-hermosa-mujer-jugando-tenis_23-2148290274.jpg?t=st=1726514897~exp=1726518497~hmac=42defc092ca862505d3e75818fb3d41a3a0dbe04e638522daf08e777228ef4ee&w=360" ,
        precio: 147000,
        cantidad: 1,
        total: 147000
    },
    {
        nombre: 'Ropa para hombre',
        img: "https://img.freepik.com/fotos-premium/hombre-jugar-al-tenis_249974-1904.jpg?w=360" ,
        precio: 128000,
        cantidad: 1,
        total: 128000
    },
    {
        nombre: 'Air Jordan 4 Retro',
        img: "https://static.dafiti.com.co/p/under-armour-6985-8516062-1-catalog-new.jpg" ,
        precio: 329900,
        cantidad: 1,
        total: 329000
    },
    {
        nombre: 'Under Armour Charged Verssert',
        img: "https://static.dafiti.com.co/p/under-armour-2082-2838032-1-catalog-new.jpg" ,
        precio: 799000,
        cantidad: 1,
        total: 799000
    },
    {
        nombre: 'Under Armour Mega 2',
        img: "https://static.dafiti.com.co/p/under-armour-4238-6078852-1-catalog-new.jpg" ,
        precio: 510900,
        cantidad: 1,
        total: 510900
    }
];



console.log(listaProductos)
//variable para traer y poder modificar el contenido del carrito
let contenidoCarrito = document.querySelector('#contenidoCarrito');

// listaCompras guarda el id de cada producto que se agrego al carrito
let listaCompras = [];
// contenidoCarritoHTML guarda en esquema HTML la lista de los productos agregados al carrito
let contenidoCarritoHTML ="";



// funcion para modificar el contenido de la tabla de compras
function agregarProducto(productoComprado){
    //Buscar el indice que contiene el producto agregado y lo agrega al final de la lista listaCompras
    let indeceProductoComprado = encontrarIndiceArrayObjetos(productoComprado);
    let indiceNoEncontrado =  encontrarIndiceArray(listaCompras, indeceProductoComprado)


    if(indiceNoEncontrado == -1){
        listaCompras.push(indeceProductoComprado);
        actualizarCarrito();
        alert(`El producto sera agregado al carrito`);
    }
    else{
        alert("Producto ya agregado, revisa en tu lista de compras");
    }
        

}


//funcion para eliminar un producto
function eliminarProducto(productoDescartado){
    let indiceListaProductos = encontrarIndiceArrayObjetos(productoDescartado);
    let indiceListaCompras = encontrarIndiceArray(listaCompras, indiceListaProductos);
    listaCompras.splice(indiceListaCompras,1);

    actualizarCarrito();

}


//creacion del texto en HTML para mostrar la lista de productos y cargalos en el contenido del carrito
function actualizarCarrito(){
    let total = 0;
    contenidoCarritoHTML = "";
    for( const valor of listaCompras){
        contenidoCarritoHTML += `<tr>`+
        `<td> <img src="${listaProductos[valor].img}" alt=""> <h6> ${listaProductos[valor].nombre} </h6> </td>` +
        `<td> <button class="boton-carrito" onclick="disminuir('${listaProductos[valor].nombre}')">  - </button> 
            <h6> ${listaProductos[valor].cantidad} </h6> 
              <button class="boton-carrito" onclick="aumentar('${listaProductos[valor].nombre}')"> + </button>
         </td> `+
        `<td> <h6>$${listaProductos[valor].precio} </h6> </td>`+
        `<td> <h6>$${listaProductos[valor].total} </h6> </td>`+
        `<td>  <button class="boton-carrito" onclick="eliminarProducto('${listaProductos[valor].nombre}')"> X </button> </td>`+
        `</tr>`
        total += listaProductos[valor].total;
      }
      contenidoCarritoHTML +=  `<tr>`+
      `<td> <h5> El total de la compra es : </h5> </td>`+
      `<td> <h5>  $${total} </h5> </td>`+
      `</tr>`

     contenidoCarrito.innerHTML = contenidoCarritoHTML; 
}


//funcion para encontrar el indice (ubicacion) de un valor dentro de una lista
function encontrarIndiceArray(lista, valor){
    let indice = -1;
    for(i=0 ;i < lista.length ; i++){
        if(lista[i] == valor){
            indice = i;
        }
    }
    return indice;
}

function encontrarIndiceArrayObjetos(valor){
    let index = 0;
    for(i=0 ;i < listaProductos.length ; i++){
        if(listaProductos[i].nombre == valor){
            index = i;
        }
    }
    return index
}

function disminuir(producto){
    let indiceListaProductos = encontrarIndiceArrayObjetos(producto);
    if(listaProductos[indiceListaProductos].cantidad == 1){
        eliminarProducto(producto);
    }else{
        listaProductos[indiceListaProductos].cantidad -= 1;
         listaProductos[indiceListaProductos].total = listaProductos[indiceListaProductos].cantidad * listaProductos[indiceListaProductos].precio ;
    }
    actualizarCarrito()
}

function aumentar(producto){
    let indiceListaProductos = encontrarIndiceArrayObjetos(producto);
    listaProductos[indiceListaProductos].cantidad += 1;
    listaProductos[indiceListaProductos].total = listaProductos[indiceListaProductos].cantidad * listaProductos[indiceListaProductos].precio ;
    actualizarCarrito()

}


