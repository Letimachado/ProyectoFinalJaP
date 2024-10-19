document.addEventListener("DOMContentLoaded", function() {
  const profilePicture = document.getElementById("profilePicture");
  const fileInput = document.getElementById("fileInput");
  const saveButton = document.getElementById("saveButton");
  const saveDataButton = document.getElementById("saveData");
  const NavPicture = document.getElementById("profilePictureNav");

  // Cargar la imagen de perfil desde localStorage si existe
  const savedImage = localStorage.getItem("profilePicture");
  if (savedImage) {
    profilePicture.src = savedImage;
    NavPicture.src = savedImage;
  }

   

  // Control sobre la carga de la imagen
  fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      profilePicture.src = e.target.result;
      NavPicture.src = e.target.result;
    }
    
    if (file) {
      reader.readAsDataURL(file);
    }
  });

  // Guardar la imagen en localStorage
  saveButton.addEventListener("click", function() {
    const imgData = profilePicture.src;
    localStorage.setItem("profilePicture", imgData);
    alert("¡Foto de perfil guardada!");
  });

  //Verificar si hay datos guardados
  const nombre = localStorage.getItem("nombre");
  const segundoNombre = localStorage.getItem("segundoNombre");
  const apellido = localStorage.getItem("apellido");
  const segundoApellido = localStorage.getItem("segundoApellido");
  const email = localStorage.getItem("email");
  const telefono = localStorage.getItem("telefono");

  // Rellenar los campos con los datos existentes
  if (nombre) document.getElementById("username").value = nombre;
  if (segundoNombre) document.getElementById("usersecondname").value = segundoNombre;
  if (apellido) document.getElementById("userapellido").value = apellido;
  if (segundoApellido) document.getElementById("usersecondap").value = segundoApellido;
  if (email) document.getElementById("useremail").value = email;
  if (telefono) document.getElementById("usertel").value = telefono;
 
  //Evento al hacer click al botón guarda los datos
  saveDataButton.addEventListener("click", function() {
    const nombre = document.getElementById("username").value;
    const apellido = document.getElementById("userapellido").value;
    const email = document.getElementById("useremail").value;
    const segundoNombre = document.getElementById("usersecondname").value;
    const segundoApellido = document.getElementById("usersecondap").value;
    const telefono = document.getElementById("usertel").value;
    
    // Validaciones
    if (!nombre || !apellido || !email) {
      alert("Los campos Nombre, Apellido y Email son obligatorios.");
      return; 
    }
     

    // Guardamos los datos en el localstorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("segundoNombre", segundoNombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("segundoApellido", segundoApellido);
    localStorage.setItem("email", email);
    localStorage.setItem("telefono", telefono);

    //Datos guardados
    alert("Datos guardados correctamente.");
  });

  logout.addEventListener("click", function() {
    localStorage.clear()
  });
});


  