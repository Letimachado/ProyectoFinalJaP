document.addEventListener('DOMContentLoaded', () => {
     
    const idProducto = localStorage.getItem('prodId');
    fetch(`https://japceibal.github.io/emercado-api/products/${idProducto}.json`) 
        .then(response => response.json())
        .then(datos => {
            producto = datos; // Guardar los productos en la variable
            loadProductInfo(producto);
            

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
            toggleLoader(false); 
            
        } else {
            console.error('Producto no encontrado');
            window.location.href = 'products.html';
        }
       

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
