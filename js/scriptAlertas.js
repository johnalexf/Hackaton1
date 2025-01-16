
export function productoYaAgregado(){
    Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question"
      });
}

export function productoAgregado(){
    Swal.fire({
    title: "Drag me!",
    icon: "success",
    draggable: true
    });
}

export function confirmacionEliminarProducto(){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}