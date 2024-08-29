document.addEventListener("DOMContentLoaded", function() {
    // Manejo de clics en las categorías
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });


    // Verificación de sesión de usuario
    const loginExitoso = localStorage.getItem('UsuarioRegistrado');


    if (!loginExitoso) {
        window.location.href = 'login.html'; // Redirige a la página de inicio de sesión si no hay sesión
    } else {
        console.log("El usuario ya está registrado");


        // Mostrar el correo del usuario en el header
        const userEmailElement = document.getElementById('userEmail'); // Obtén el elemento donde se mostrará el correo
        const email = localStorage.getItem('email'); // Recupera el correo del usuario de localStorage
       
        if (userEmailElement) {
            if (email) {
                userEmailElement.textContent = email; // Muestra el correo si está disponible
            } else {
                userEmailElement.textContent = 'Usuario'; // Muestra un texto por defecto si no hay correo
            }
        }
    }
});
