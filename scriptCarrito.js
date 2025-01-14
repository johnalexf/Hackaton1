export class productoCarrito {
  constructor(productoBase , cantidad) {
    this.id = productoBase.id;
    this.nombre = productoBase.nombre;
    this.img = productoBase.img;
    this.precio = productoBase.precio;
    this.cantidad = cantidad;
    this.subtotal = this.cantidad * this.precio;
  }

}

export class listaProductos {
  constructor() {
    this.productos = [];
    this.total = 0;
  }

  actualizarTotal() {
    this.total = 0;
    this.productos.forEach((producto) => (this.total += producto.subtotal));
  }

  agregar(productoAgregar) {
    const producto = this.encontrarProducto(productoAgregar.id);

    if (producto) {
        
      // se retorna falso indicando que el producto no se agrego
      //  por que ya existe en la lista
      console.log("el producto ya esta en el carrito")
      return false;

    } else {

      this.productos.push(productoAgregar);
      this.actualizarTotal();
      console.log("producto agregado correctamente al carrito")
      return true;

    }
  }

  eliminar(id) {
    this.productos = this.productos.filter((producto) => producto.id != id);
    this.actualizarTotal();
  }

  sumarCantidad(id) {
    const producto = this.encontrarProducto(id);

    producto ? 
    producto.cantidad++ : 
    console.log("producto no encontrado");
  }

  restarCantidad(id) {
    const producto = this.encontrarProducto(id);

    if (producto) {
        producto.cantidad > 1 ? 
            producto.cantidad-- :
            alert("seguro desea eliminar el producto")

        this.actualizarTotal();
    } else {
      console.log("producto no encontrado");
    }
  }

  encontrarProducto(id) {
    const producto = this.productos.find(
        (producto) => producto.id === id
    );
    return producto;
  }

  construirHTML(){
    let carritoHTML = ``;
    this.listaProductos.forEach(
        producto =>{
            

        }
    );
  }
}