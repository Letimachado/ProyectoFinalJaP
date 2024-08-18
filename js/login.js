

const login = document.getElementById('formularioLogin');
login.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('floatingInput').value;
    const contraseña = document.getElementById('floatingPassword').value;

    localStorage.setItem('email', email);
    localStorage.setItem('password', contraseña);
    localStorage.setItem('UsuarioRegistrado', 'true')

    alert('Login exitoso')

    window.location.href = 'index.html';
});

