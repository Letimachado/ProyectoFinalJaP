document.addEventListener('DOMContentLoaded', () => {
     
    const idProducto = localStorage.getItem('prodId');
    fetch(`https://japceibal.github.io/emercado-api/products/${idProducto}.json`) 
        .then(response => response.json())
        .then(datos => {
            producto = datos; // Guardar los productos en la variable
            loadProductInfo(producto);
            

        })
        .catch(error => console.log('error', error));
 
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`)
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
            loadProductInfoById(product.id);
        });
        relatedProductsContainer.appendChild(productElement);
    });
}


function loadProductInfoById(productId) {
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
        .then(response => response.json())
        .then(datos => {
            loadProductInfo(datos);
        })
        .catch(error => console.log('error', error));
}

// Función para mostrar los comentarios
function loadProductComments(comments) {
    const commentsContainer = document.getElementById('comments-container'); // Asegúrate de tener este contenedor en tu HTML
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        // Plantilla básica de cómo podría ser un comentario
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
            <hr>
        `;

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

submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el envío del formulario

    const rating = ratingValue.value;
    const comment = document.getElementById('comments').value;

    if (rating && userEmail) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${userEmail}</strong>: ${createStars(rating)}<br>
            <span>${comment}</span>
        `;
        ratingsList.appendChild(listItem);

        // Limpiar campos
        document.getElementById('comments').value = '';
        ratingValue.value = '';
        highlightStars(0); // Reinicia la visualización de estrellas
    } else {
        alert('Por favor, selecciona una calificación y asegúrate de haber iniciado sesión.');
    }
});

function createStars(value) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="gold-star">${i <= value ? '&#9733;' : '&#9734;'}</span>`;
    }
    return starsHTML;
}

