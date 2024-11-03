document.addEventListener('DOMContentLoaded', function() {
    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
        NavPicture.src = savedImage;
    }

    const logout = document.getElementById("logout");
    logout.addEventListener("click", function() {
        localStorage.clear();
    });

    // Función para actualizar el badge del carrito con la cantidad total de productos
    function actualizarBadgeCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const badge = document.getElementById("cart-badge");

        //Cantidad total de productos en el carrito
        let totalProductos = 0;
        carrito.forEach(producto => {
            const cantidad = parseInt(producto.cantidad, 10) || 1; // Si no hay cantidad, asumimos 1
            totalProductos += cantidad;
        });

        // Actualizamos el contenido del badge con la cantidad total de productos
        badge.textContent = totalProductos; 
    }

    // Llama a la función para mostrar la cantidad al cargar la página
    actualizarBadgeCarrito();

    // Obtiene el array de objetos "carrito", donde se encuentran los productos 
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
                                </div>
                                <p class="card-text">Subtotal: <span id="subtotal-${producto.id}">${producto.moneda} ${producto.precio * producto.cantidad}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            
            html += `
                <div class="text-center mt-5">
                    <h4>Total:</h4>
                    <div id="totalesPorMoneda"></div>
                </div>
            `;
    
            carritoContainer.innerHTML = html;

            // Actualiza el subtotal y el total cuando cambie la cantidad de productos
            document.querySelectorAll('.cantidadProducto').forEach(input => {
                input.addEventListener('input', () => {
                    actualizarCantidadProducto(input);
                    actualizarSubtotal(input);
                    actualizarTotal();
                    actualizarBadgeCarrito(); // Actualiza el badge cuando se cambia la cantidad
                });
            });
    
            function actualizarCantidadProducto(input) {
                const idProducto = input.dataset.id;
                const nuevaCantidad = parseInt(input.value, 10) || 1; // Aseguramos que sea un número válido y mínimo 1
                
                // Actualizamos la cantidad en el carrito
                carrito = carrito.map(producto => {
                    if (producto.id === idProducto) {
                        producto.cantidad = nuevaCantidad;
                    }
                    return producto;
                });

                // Guardamos el carrito actualizado en localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }

            function actualizarSubtotal(input) {
                const idProducto = input.dataset.id;
                const cantidad = parseInt(input.value, 10) || 1; 
                const producto = carrito.find(p => p.id === idProducto);
                const subtotal = cantidad * producto.precio;
                document.getElementById(`subtotal-${idProducto}`).textContent = `${producto.moneda} ${subtotal}`;
            }

            // Función para actualizar el total y agrupar por moneda
            function actualizarTotal() {
                let totalesPorMoneda = {};

                carrito.forEach(producto => {
                    const cantidad = parseInt(document.getElementById(`cantidadProducto-${producto.id}`).value, 10) || 1; // Convertimos a número
                    const subtotal = cantidad * producto.precio;
                    if (totalesPorMoneda[producto.moneda]) {
                        totalesPorMoneda[producto.moneda] += subtotal;
                    } else {
                        totalesPorMoneda[producto.moneda] = subtotal;
                    }
                });

                // Mostrar los valores separados por moneda
                const totalesDiv = document.getElementById('totalesPorMoneda');
                totalesDiv.innerHTML = ''; 
                for (let moneda in totalesPorMoneda) {
                    totalesDiv.innerHTML += `<p><strong>${moneda}:</strong> ${totalesPorMoneda[moneda]}</p>`;
                }
            }
    
            actualizarTotal();
        }
    
        mostrarCarrito();
    } else {
        const carritoContainer = document.getElementById('carritoContainer');
        carritoContainer.innerHTML = `<div class="alert alert-warning text-center">Tu carrito está vacío. Agrega productos para verlos aquí.</div>`;
    }
});
