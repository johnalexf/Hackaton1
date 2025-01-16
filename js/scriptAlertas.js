
export async function productoAgregado(){
  let respuesta = false;

  await Swal.fire({
    title: "Producto agregado al carrito",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Seguir Comprando",
    cancelButtonText: "Ir al carrito"

  }).then((result) => {
    if(result.dismiss == 'cancel'){
      respuesta = true;
    }
  });

  return respuesta;
}

export async function productoYaAgregado(){

  let respuesta = false;

  await Swal.fire({
        title: "El producto ya está en el carrito",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Seguir Comprando",
        cancelButtonText: "Ir al carrito"

      }).then((result) => {
        if(result.dismiss == 'cancel'){
          
          respuesta = true;
        }
      });

      return respuesta;
}



export async function confirmacionEliminarProducto(){

  let respuesta = false;

  await  Swal.fire({
        title: "Seguro desea eliminar el producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
        
      }).then((result) => {
        respuesta = result.isConfirmed;
      });

      return respuesta;
}

export function productoEliminado(){
  Swal.fire({
    title: "Producto eliminado",
    icon: "success"
  });
}