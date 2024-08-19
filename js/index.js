document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

const loginExitoso = localStorage.getItem('UsuarioRegistrado');    //creo un espacio de memoria donde guardo la información si el usuario está registrado

if(!loginExitoso) {                                     //si el login no es exitoso
    window.location.href = 'login.html'                 //redirige a la página login
}else{                                                  //sino
    console.log("El usuario ya esta registrado")        //imprime en la consola que el usuario ya está registrado
}