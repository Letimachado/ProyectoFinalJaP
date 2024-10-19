const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const loginExitoso = localStorage.getItem('UsuarioRegistrado') === 'true'; // Verificamos el estado de 'UsuarioRegistrado'
  
  if (!loginExitoso) {
      window.location.href = 'login.html'; // Redirigimos al login si no está registrado
  }


 

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
 

 const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Función para cambiar el tema
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
    themeToggleButton.textContent = '☼';
  } else {
    body.classList.remove('dark-theme');
    themeToggleButton.textContent = '☾';
  }
}

// Verificar si hay un tema guardado en localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

// Alternar tema al hacer clic en el botón
themeToggleButton.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  } else {
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  }
});

});
