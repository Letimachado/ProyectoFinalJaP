document.addEventListener('DOMContentLoaded', function() {
    //Foto de perfil
    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
        NavPicture.src = savedImage;
    }

    //Cerrar sesión
    const logout = document.getElementById("logout");
    logout.addEventListener("click", function() {
        localStorage.clear();
    });

    // FINALIZAR COMPRA - Validación y Modal
    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    const modalEnvio = document.getElementById('detalleEnvio');
    const modalDireccion = document.getElementById('detalleDireccion');
    const modalPago = document.getElementById('detallePago');

    finalizarCompraBtn.addEventListener('click', function() {
         // Obtener el carrito del localStorage
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Verificar si el carrito está vacío
            if (carrito.length === 0) {
                 alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
                console.log("Error: carrito vacío");
                return;
                 }
                

        // Verificar si se ha seleccionado un tipo de envío
        const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
        if (!envioSeleccionado) {
            alert("Por favor selecciona un tipo de envío.");
            console.log("Error: no se seleccionó tipo de envío");
            return;
        }

        // Verificar si todos los campos de la dirección están completos
        const departamento = document.getElementById('departamento') ? document.getElementById('departamento').value.trim() : null;
        const localidad = document.getElementById('localidad') ? document.getElementById('localidad').value.trim() : null;
        const calle = document.getElementById('calle') ? document.getElementById('calle').value.trim() : null;
        const numeroPuerta = document.getElementById('puerta') ? document.getElementById('puerta').value.trim() : null;
        const esquina = document.getElementById('esquina') ? document.getElementById('esquina').value.trim() : null;

        // Verificar que todos los campos existan y no estén vacíos
        if (!departamento || !localidad || !calle || !numeroPuerta || !esquina) {
            alert("Por favor completa todos los campos de la dirección.");
            return;
        }

        // Verificar si se ha seleccionado un método de pago
        const metodoPagoSeleccionado = document.querySelector('input[name="pago"]:checked');
        if (!metodoPagoSeleccionado) {
            alert("Por favor selecciona un método de pago.");
            console.log("Error: no se seleccionó método de pago");
            return;
        }

        // Mostrar los datos en el modal
        modalEnvio.textContent = envioSeleccionado.nextElementSibling.textContent;
        modalDireccion.textContent = `${calle} ${numeroPuerta}, ${localidad}, ${departamento}. Esquina: ${esquina}`;
        modalPago.textContent = metodoPagoSeleccionado.nextElementSibling.textContent;
        const modal = new bootstrap.Modal(document.getElementById('modalCompra'));
        console.log("Modal inicializado y mostrado");
        modal.show(); 
    });

    // Función para actualizar el badge del carrito con la cantidad total de productos
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
                        </div>
                    </div>
                </div>`;
            });

            carritoContainer.innerHTML = html;

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
            })});

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

            function actualizarCantidadProducto(input) {
                const idProducto = input.dataset.id;
                const nuevaCantidad = parseInt(input.value, 10) || 1;

                carrito = carrito.map(producto => {
                    if (producto.id === idProducto) {
                        producto.cantidad = nuevaCantidad;
                    }
                    return producto;
                }).filter(producto => producto.cantidad > 0); // Mantener solo productos con cantidad > 0

                localStorage.setItem("carrito", JSON.stringify(carrito));

              // Si la cantidad del producto es 0, recargar el carrito para reflejar la eliminación
                         if (nuevaCantidad <= 0) {
                         mostrarCarrito();
                          }
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

            actualizarTotal();
        }

        mostrarCarrito();
    } else {
        const carritoContainer = document.getElementById('carritoContainer');
        carritoContainer.innerHTML = `<div class="alert alert-warning text-center" style="display: block">Tu carrito está vacío. Agrega productos para verlos aquí.</div>`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const accordion = document.getElementById("accordionExample");
    const totalDiv = document.getElementById("totalesPorMoneda");
    const totalHeader = document.querySelector("h4");
    const finalizarCompraBtn = document.getElementById("finalizarCompra");

    if (carrito.length === 0) {
        accordion.style.display = "none";
        totalDiv.style.display = "none";
        totalHeader.style.display = "none";
        finalizarCompraBtn.style.display = "none";
    } else {
        accordion.style.display = "block";
        totalDiv.style.display = "block";
        totalHeader.style.display = "block";
        finalizarCompraBtn.style.display = "block";
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const accordion = document.getElementById("accordionExample");
    const totalDiv = document.getElementById("totalesPorMoneda");
    const totalHeader = document.querySelector("h4");
    const finalizarCompraBtn = document.getElementById("finalizarCompra");
    const alertaCarritoVacio = document.getElementById("alertaCarritoVacio");

    if (carrito.length === 0) {
        accordion.style.display = "none";
        totalDiv.style.display = "none";
        totalHeader.style.display = "none";
        finalizarCompraBtn.style.display = "none";
        alertaCarritoVacio.style.display = "block"; // Muestra la alerta
    } else {
        accordion.style.display = "block";
        totalDiv.style.display = "block";
        totalHeader.style.display = "block";
        finalizarCompraBtn.style.display = "block";
        alertaCarritoVacio.style.display = "none"; // Oculta la alerta
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const radioTarjeta = document.getElementById('flexRadioPago1');
    const radioTransferencia = document.getElementById('flexRadioPago2');
    const radioEfectivo = document.getElementById('flexRadioPago3');

    // Función para mostrar el formulario de tarjeta mediante un prompt
    function mostrarFormularioTarjeta() {
        let numeroTarjeta = prompt("Ingrese el número de tarjeta (mínimo 12 dígitos):");

        // Validación: comprobar que el número de tarjeta tenga al menos 12 dígitos
        while (numeroTarjeta && numeroTarjeta.length < 12) {
            numeroTarjeta = prompt("Número de tarjeta inválido. Ingrese un número con al menos 12 dígitos:");
        }

        if (numeroTarjeta) {
            const fechaExpiracion = prompt("Ingrese la fecha de expiración (MM/AA):");
            const codigoSeguridad = prompt("Ingrese el código de seguridad (CVV):");

            if (fechaExpiracion && codigoSeguridad) {
                alert(`Datos de tarjeta recibidos:\nNúmero: ${numeroTarjeta}\nFecha de Expiración: ${fechaExpiracion}\nCódigo de Seguridad: ${codigoSeguridad}`);
            } else {
                alert("Por favor, ingrese todos los datos de la tarjeta.");
            }
        } else {
            alert("El número de tarjeta no fue ingresado correctamente.");
        }
    }

    // Función para mostrar una alerta en caso de transferencia o efectivo
    function mostrarAlertaCorreo() {
        alert("Se enviaron las instrucciones al correo con el cual se logió.");
    }

    // Escuchar cambios en los radio buttons
    radioTarjeta.addEventListener('change', function() {
        if (radioTarjeta.checked) {
            mostrarFormularioTarjeta();
        }
    });

    radioTransferencia.addEventListener('change', function() {
        if (radioTransferencia.checked) {
            mostrarAlertaCorreo();
        }
    });

    radioEfectivo.addEventListener('change', function() {
        if (radioEfectivo.checked) {
            mostrarAlertaCorreo();
        }
    });
});

