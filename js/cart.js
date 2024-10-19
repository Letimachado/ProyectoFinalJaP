document.addEventListener('DOMContentLoaded', function() {

    const NavPicture = document.getElementById("profilePictureNav");
    const savedImage = localStorage.getItem("profilePicture");
        if (savedImage) {
        NavPicture.src = savedImage;
        }
    logout.addEventListener("click", function() {
    localStorage.clear()
    });

    //const userId = localStorage.getItem('userId');  Asumiendo que guardas el USER_ID en localStorage
    const userId = 1;
    if (userId) {
        fetch(`https://https://japceibal.github.io/emercado-api/user_cart/${userId}.json`) // Reemplaza la URL con tu API real
            .then(response => response.json())
            .then(data => {
                mostrarCarrito(data);
            })
            .catch(error => {
                console.error('Error al cargar el carrito:', error);
            });
    } else {
        alert('Debes iniciar sesión primero');
        window.location.href = 'login.html';
    }
});

function mostrarCarrito(data) {
    const carritoContainer = document.getElementById('carritoContainer'); // Un contenedor en tu cart.html
    let html = '';

    data.articles.forEach(article => {
        html += `
        <div class="articulo">
            <img src="${article.image}" alt="${article.name}">
            <h3>${article.name}</h3>
            <p>Cantidad: ${article.count}</p>
            <p>Precio Unitario: ${article.unitCost} ${article.currency}</p>
            <p>Total: ${article.count * article.unitCost} ${article.currency}</p>
        </div>
        <hr>`;
    });

    carritoContainer.innerHTML = html;
}