const login = document.getElementById('formularioLogin'); //Creamos un espacio de memoria donde mediante el DOM llamamos al formulario

 login.addEventListener('submit', function(e) { //controlamos el evento de enviar el formulario
  e.preventDefault();  
    const email = document.getElementById('floatingInput').value;               //la información que se ingresa en el input email
    const contraseña = document.getElementById('floatingPassword').value;       //la información que se ingresa en el input contraseña

    localStorage.setItem('email', email);                                       //guardamos el email en la local storage
    localStorage.setItem('password', contraseña);                               //guardamos la contraseña en la local storage
    localStorage.setItem('UsuarioRegistrado', 'true')                           //guardamos la información que el usuario inició sesion

    alert('Login exitoso')                                                      //El usuario recibe el alerta que se inició la sesión

    window.location.href = 'index.html';                                        //Redirige al usuario al inicio
});

const logout = document.getElementById('logout'); // Seleccionamos el botón/enlace de "Cerrar sesión"

logout.addEventListener('click', function(e) {
    e.preventDefault();  // Evitamos que el enlace redirija inmediatamente

    // Eliminamos los datos almacenados en localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('UsuarioRegistrado');

    alert('Sesión cerrada correctamente');  // Alerta para indicar que la sesión se cerró

    window.location.href = 'login.html';  // Redirigimos al usuario a la página de login
});