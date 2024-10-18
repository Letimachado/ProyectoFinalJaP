document.addEventListener("DOMContentLoaded", function() {
    const profilePicture = document.getElementById("profilePicture");
    const fileInput = document.getElementById("fileInput");
    const saveButton = document.getElementById("saveButton");
  
    // Cargar la imagen de perfil desde localStorage si existe
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
      profilePicture.src = savedImage;
    }
  
    // Control sobre la carga de la imagen
    fileInput.addEventListener("change", function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(e) {
        profilePicture.src = e.target.result;
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
  });
  