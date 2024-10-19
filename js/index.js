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
    //Carga la imágen de perfil en el navbar
    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
      NavPicture.src = savedImage;
    }
    logout.addEventListener("click", function() {
        localStorage.clear()
      });

});


