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

    if(producto){
      producto.cantidad++;
      producto.subtotal = producto.cantidad * producto.precio;
      this.actualizarTotal();
    }else{
      console.log("producto no encontrado");
    }
    
  }

  restarCantidad(id) {
    const producto = this.encontrarProducto(id);

    if (producto) {
      if(producto.cantidad > 1){
        producto.cantidad--;
        producto.subtotal = producto.cantidad * producto.precio;
        this.actualizarTotal();
        return true;
      }else{
        return false;
      }
      

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
  
    console.log()
  
    this.productos.forEach(
        producto =>{
          carritoHTML += `
          <div class="filaCarrito ">
  
            <div class="imagenProducto">
              <div>
                <img
                src=${producto.img}
                ,
                alt=${producto.nombre}
                />
              </div>
              <h5 class="nombreImagenProducto">${producto.nombre}</h5>
            </div>
            
            <div class="tituloProducto">
              <h5>${producto.nombre}</h5>
            </div>
  
            <div class="precioProducto">
              <p class="lead fw-bold">$${producto.precio.toLocaleString()}</p>
            </div>
  
            <div class="cantidadCarrito d-flex">
              <div class="input-group ">
                <button class="btn" onclick="disminuirCantidadProducto(${producto.id})">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input type="text"  value="${producto.cantidad}" disabled/>
                <button class="btn" onclick="aumentarCantidadProducto(${producto.id})">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
  
            <div class="totalProducto">
              <p class="lead fw-bold">$${producto.subtotal.toLocaleString()}</p>
            </div>
  
          </div>
          `
  
        }
    );
    carritoHTML += `
      <div class="filaCarrito">
        <div></div>
        <div></div>
        <div>
          <h5>Total pedido</h5>
        </div>
        <div>
          <p class="lead fw-bold">
            $${this.total.toLocaleString()}
          </p>
        </div>
       </div>
    `
    return carritoHTML;
  }
}