document.addEventListener('DOMContentLoaded', function() {
    // Código de la foto de perfil y cerrar sesión
    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
        NavPicture.src = savedImage;
    }

    const logout = document.getElementById("logout");
    logout.addEventListener("click", function() {
        localStorage.clear();
    });

    // Función para actualizar el badge del carrito
    function actualizarBadgeCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const badge = document.getElementById("cart-badge");

        let totalProductos = 0;
        carrito.forEach(producto => {
            const cantidad = parseInt(producto.cantidad, 10) || 1;
            totalProductos += cantidad;
        });

        badge.textContent = totalProductos; 
    }

    actualizarBadgeCarrito();

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        function mostrarCarrito() {
            const carritoContainer = document.getElementById('carritoContainer');
            let html = '';
            carrito.forEach(producto => {
                if (!producto.cantidad) {
                    producto.cantidad = 1;
                }

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
                                    <input type="number" class="form-control cantidadProducto" id="cantidadProducto-${producto.id}" value="${producto.cantidad}" style="max-width: 50px;" data-id="${producto.id}">
                                <div class="subtotal-contenedor">
                                <p class="card-text">Subtotal: <span id="subtotal-${producto.id}">${producto.moneda} ${producto.precio * producto.cantidad}</span></p>
                                <button type="button" class="btn eliminarProducto" data-id="${producto.id}">
                                <i class="fas fa-trash-alt"></i>
                                </button>                         
                             </div>
                        </div>
                    </div>
                </div>`;
            });

            carritoContainer.innerHTML = html;

            // Eventos para modificar cantidades
            document.querySelectorAll('.cantidadProducto').forEach(input => {
                input.addEventListener('input', () => {
                    actualizarCantidadProducto(input);
                    actualizarSubtotal(input);
                    actualizarTotal();
                    actualizarBadgeCarrito(); 
                });
            });

            // Evento para eliminar productos
            document.querySelectorAll('.eliminarProducto').forEach(button => {
                button.addEventListener('click', () => {
                    const idProducto = button.dataset.id;
                    eliminarProducto(idProducto);
                });
            });
        }

        function actualizarCantidadProducto(input) {
            const idProducto = input.dataset.id;
            const nuevaCantidad = parseInt(input.value, 10) || 1;

            carrito = carrito.map(producto => {
                if (producto.id === idProducto) {
                    producto.cantidad = nuevaCantidad;
                }
                return producto;
            });

            localStorage.setItem("carrito", JSON.stringify(carrito));
        }

        function actualizarSubtotal(input) {
            const idProducto = input.dataset.id;
            const cantidad = parseInt(input.value, 10) || 1;
            const producto = carrito.find(p => p.id === idProducto);
            const subtotal = cantidad * producto.precio;
            document.getElementById(`subtotal-${idProducto}`).textContent = `${producto.moneda} ${subtotal}`;
        }

        function actualizarTotal() {
            let totalesPorMoneda = {};

            carrito.forEach(producto => {
                const cantidad = parseInt(document.getElementById(`cantidadProducto-${producto.id}`).value, 10) || 1;
                const subtotal = cantidad * producto.precio;
                if (totalesPorMoneda[producto.moneda]) {
                    totalesPorMoneda[producto.moneda] += subtotal;
                } else {
                    totalesPorMoneda[producto.moneda] = subtotal;
                }
            });

            const totalesDiv = document.getElementById('totalesPorMoneda');
            totalesDiv.innerHTML = ''; 
            for (let moneda in totalesPorMoneda) {
                totalesDiv.innerHTML += `<p><strong>${moneda}:</strong> ${totalesPorMoneda[moneda]}</p>`;
            }
        }

        // Función para eliminar producto
        function eliminarProducto(idProducto) {
            // Filtrar el carrito para eliminar el producto correspondiente
            carrito = carrito.filter(producto => producto.id !== idProducto);
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
            // Actualizar la visualización del carrito
            mostrarCarrito();
            // Actualizar el badge del carrito y el total
            actualizarBadgeCarrito();
            actualizarTotal();
        }

        mostrarCarrito();
    } else {
        const carritoContainer = document.getElementById('carritoContainer');
        carritoContainer.innerHTML = `<div class="alert alert-warning text-center">Tu carrito está vacío. Agrega productos para verlos aquí.</div>`;
    }
});
