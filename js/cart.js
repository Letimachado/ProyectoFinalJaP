document.addEventListener('DOMContentLoaded', function() {

    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
        if (savedImage) {
        NavPicture.src = savedImage;
        }
    logout.addEventListener("click", function() {
    localStorage.clear()
    });

    // Obtiene el array de objetos "carrito", donde se encuentran los productos 
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    // Si hay productos en el carrito ejecuta la función mostrarCarrito
    if (carrito) {
        function mostrarCarrito() {
            const carritoContainer = document.getElementById('carritoContainer');
            let html = '';
            carrito.forEach(producto => {
                html += `
                <div class="card mb-3 container" style="max-width: 740px;">
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <img src="${producto.imagen}" class="rounded mx-auto d-block" alt="${producto.nombre}" style="max-width: 200px;">
                        </div>
                        <div class="col-12 col-md-8">
                            <div class="cardBody">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Precio Unitario: ${producto.moneda} ${producto.precio}</p>
                                <div class="mb-3">
                                    <label for="cantidadProducto-${producto.id}" class="form-label">Cantidad</label>
                                    <input type="number" class="form-control cantidadProducto" id="cantidadProducto-${producto.id}" value="1" style="max-width: 50px;" data-id="${producto.id}">
                                </div>
                                <p class="card-text">Subtotal: <span id="subtotal-${producto.id}">${producto.moneda} ${producto.precio}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
    
            // Muestra en pantalla el precio total del carrito
            html += `
                <div class="text-center mt-5">
                    <h4>Total: <span id="totalCarrito">${carrito[0].moneda}</span></h4>
                </div>
            `;
    
            carritoContainer.innerHTML = html;
            document.querySelectorAll('.cantidadProducto').forEach(input => {
                input.addEventListener('input', () => {
                    actualizarSubtotal(input);
                    actualizarTotal();
                });
            });
    
            function actualizarSubtotal(input) {
                const idProducto = input.dataset.id;
                const cantidad = input.value;
                const producto = carrito.find(p => p.id === idProducto);
                const subtotal = cantidad * producto.precio;
                document.getElementById(`subtotal-${idProducto}`).textContent = `${producto.moneda} ${subtotal}`;
            }
    
            function actualizarTotal() {
                let total = 0;
    
                carrito.forEach(producto => {
                    const cantidad = document.getElementById(`cantidadProducto-${producto.id}`).value;
                    const subtotal = cantidad * producto.precio;
                    total += subtotal;
                });

                document.getElementById('totalCarrito').textContent = `${carrito[0].moneda} ${total}`;
            }
    

            actualizarTotal();
        }
    
        mostrarCarrito();
    } else {
        // En caso de que el carrito esté vacío, se muestra una alerta
        const carritoContainer = document.getElementById('carritoContainer');
        let html = `<div class="alert alert-warning text-center">Tu carrito está vacío. Agrega productos para verlos aquí.</div>`;
        carritoContainer.innerHTML = html;
    }
    
    
});