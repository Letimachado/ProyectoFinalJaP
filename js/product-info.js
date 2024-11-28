document.addEventListener('DOMContentLoaded', () => {
     
    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
      NavPicture.src = savedImage;
    }
    logout.addEventListener("click", function() {
        localStorage.clear()
      });
    const idProducto = localStorage.getItem('prodId');
   
    fetch(`http://localhost:3000/products/${idProducto}`) 
        .then(response => response.json())
        .then(datos => {
            producto = datos; // Guardar los productos en la variable
            loadProductInfo(producto);
        })
        .catch(error => console.log('error', error));
 
    fetch(`http://localhost:3000/products_comments/${idProducto}`)
        .then(response => response.json())
        .then(comentarios => {
            loadProductComments(comentarios); // Función para cargar comentarios
    })
    .catch(error => console.log('error', error));


})

async function loadProductInfo(product) { 
    toggleLoader(true); 
        if (product) {
            // Mostrar la información del producto
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-description').innerText = product.description;
            document.getElementById('product-category').innerText = product.category;
            document.getElementById('product-sold').innerText = product.soldCount;
            document.getElementById('product-cost').innerText = product.cost;
            document.getElementById('product-currency').innerText = product.currency;
            document.getElementById('product-main-image').src = product.images[0]; // Imagen principal

            // Mostrar imágenes relacionadas
            const relatedImagesContainer = document.getElementById('related-images');
            product.images.forEach((imageSrc, index) => {
                console.log("imagen: "+imageSrc)
                if (index !== 0) { // Omitir la imagen principal
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = `${product.name} related image`;
                    relatedImagesContainer.appendChild(img);
                }
            });
            
            // Cargar productos relacionados
            loadRelatedProducts(product.relatedProducts);

            toggleLoader(false); 
            
        } else {
            console.error('Producto no encontrado');
            window.location.href = 'products.html';
        }
       

}

// Función para mostrar los productos relacionados
function loadRelatedProducts(relatedProducts) {
    const relatedProductsContainer = document.getElementById('related-products');
    relatedProductsContainer.innerHTML = '';


    relatedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'related-product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
        `;
        productElement.addEventListener('click', () => {
            // Guardar el ID del producto en localStorage y recargar la página
            localStorage.setItem('prodId', product.id);
            window.location.reload(); // Recargar la página para mostrar el nuevo producto
        });
        relatedProductsContainer.appendChild(productElement);
    });
}


function loadProductInfoById(productId) {
    fetch(`http://localhost:3000/products/${productId}`)
        .then(response => response.json())
        .then(datos => {
            loadProductInfo(datos);
        })
        .catch(error => console.log('error', error));
}

// Función para mostrar los comentarios
function loadProductComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-header">
                <strong>${comment.user}</strong> ${generateStarRating(comment.score)} 
            </div>
            <div class="comment-body m-3">
                <span>${comment.description}</span>
            </div>
            <div class="comment-rating">
                <span class="text-secondary">${comment.dateTime}</span>
            </div>
            <hr>`;

        commentsContainer.appendChild(commentElement);
    });
}

// Función para generar estrellas en base al puntaje
function generateStarRating(score) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            starsHTML += '<span class="star selected">★</span>'; // Estrella llena
        } else {
            starsHTML += '<span class="star">☆</span>'; // Estrella vacía
        }
    }
    return starsHTML;
}

function toggleLoader(show) {
    const loader = document.getElementById('loader');
    const productContainer = document.getElementById('product-container');
    if (show) {
        loader.style.display = 'flex';
        productContainer.style.display = 'none';
    } else {
        loader.style.display = 'none';
        productContainer.style.display = 'block';
    }
}

const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
const submitButton = document.getElementById('submit-rating');
const ratingsList = document.getElementById('ratings-list');

// Recuperar el email del localStorage
const userEmail = localStorage.getItem('email');

stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const value = star.getAttribute('data-value');
        highlightStars(value);
    });

    star.addEventListener('mouseout', () => {
        const selectedValue = ratingValue.value;
        highlightStars(selectedValue);
    });

    star.addEventListener('click', () => {
        ratingValue.value = star.getAttribute('data-value');
        highlightStars(ratingValue.value);
    });
});

function highlightStars(value) {
    stars.forEach(star => {
        star.classList.remove('hover', 'selected');
        if (star.getAttribute('data-value') <= value) {
            star.classList.add('hover');
        }
    });
    if (value) {
        for (let i = 0; i < value; i++) {
            stars[i].classList.add('selected');
        }
    }
}
function agregarAlCarrito() {
    // Obtener la información del producto
    const producto = {
        id: localStorage.getItem('prodId'), // Usa el ID guardado en localStorage
        nombre: document.getElementById('product-name').innerText,
        precio: document.getElementById('product-cost').innerText,
        moneda: document.getElementById('product-currency').innerText,
        imagen: document.getElementById('product-main-image').src
    };

     // Obtener el array de carrito
     let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

     // Verificar si el producto ya se encuentra en el carrito
     const productoExistente = carrito.find(item => item.id === producto.id);
     if (productoExistente) {
        alert("Este producto ya está en el carrito.");
    } else {
    // En caso de que el producto no se encuentre en el carrito lo agrega al array carrito y lo guarda en el localstorage
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Navegar a la pantalla de carrito
    window.location.href = "cart.html";
}
}
