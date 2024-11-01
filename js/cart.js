document.addEventListener('DOMContentLoaded', function() {

    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
        if (savedImage) {
        NavPicture.src = savedImage;
        }
    logout.addEventListener("click", function() {
    localStorage.clear()
    });

const producto = JSON.parse(localStorage.getItem("productoSeleccionado"))

if (producto) {
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carritoContainer'); // nos redirige al container cart.html
    let html = '';

     // Primero verificamos si el carrito ya tiene articulos
        html += `
        <div class="articulo">
            <h3>${producto.nombre}</h3>
            <p>Precio Unitario: ${producto.moneda} ${producto.precio}</p>
        </div>
        <hr>`;
        carritoContainer.innerHTML = html;
}
mostrarCarrito();
} else {
    // En caso de que el carrito está vacío se muestra una alerta
    html = `<div class="alert alert-warning text-center">Tu carrito está vacío. Agrega productos para verlos aquí.</div>`;
    carritoContainer.innerHTML = html;
  }  
  
});