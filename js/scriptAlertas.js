
export function productoAgregado(){
  Swal.fire({
  title: "Producto agregado al carrito",
  icon: "success",
  draggable: true
  });
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
        console.log(result)
        if(result.dismiss == 'cancel'){
          document.getElementById('carrito').scrollIntoView();
          location.href = '#carrito'; 
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
        console.log(result)
        respuesta = result.isConfirmed;
      });

      return respuesta;
}

export function productoEliminado(){
  Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
}