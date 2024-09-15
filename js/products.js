    document.addEventListener('DOMContentLoaded', () => {
      let productos = []; // Variable para almacenar los productos
    
      const idCategoria = localStorage.getItem('catID');
      fetch(`https://japceibal.github.io/emercado-api/cats_products/${idCategoria}.json`) 
          .then(response => response.json())
          .then(datos => {
              productos = datos.products; // Guardar los productos en la variable
              mostrarProductos(productos); // Mostrar los productos inicialmente
             

              // Configurar el evento de filtrado
              document.getElementById('filter-form').addEventListener('submit', (event) => {
                  event.preventDefault();
                  aplicarFiltrosYOrden();
              });
    
              // Configurar el evento de ordenamiento
              document.getElementById('sort-order').addEventListener('change', () => {
                  aplicarFiltrosYOrden();
                });

             // Configurar el evento de búsqueda
                document.getElementById('buscador').addEventListener('input', () => { aplicarFiltrosYOrden(); 
                });

            // Configurar el evento de eliminar filtros
               document.getElementById('reset-filters').addEventListener('click', () => {
            // Restablecer los valores de los filtros
                document.getElementById('min-price').value = '';
                document.getElementById('max-price').value = '';
                document.getElementById('sort-order').value = 'price-asc'; // Valor predeterminado
                document.getElementById('buscador').value = ''; // Limpiar el campo de búsqueda

            // Mostrar todos los productos sin filtros
                mostrarProductos(productos);
              });
            })
            
          .catch(error => console.log('error', error));
    
      function mostrarProductos(listaProductos) {
  
          const productList = document.getElementById('product-list'); // Obtén el contenedor de productos
          productList.innerHTML = listaProductos.map(producto => `
              <div onclick="setProdId(${producto.id})" class="container d-flex" style="justify-content: center;">
                  <div class="card mb-3" style="max-width: 900px; border: solid; border-color: orange;">
                      <div class="row g-2">
                          <div class="col-md-4">
                              <img src="${producto.image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
                          </div>
                          <div class="col-md-8">
                              <div class="card-body">
                                  <div class="row">
                                      <div class="col-md-7 d-flex">
                                          <h5 class="card-title" style="font-family: Impact">${producto.name}</h5>
                                      </div>
                                      <div class="col-md-5">
                                          <h5 class="card-title">Precio:${producto.currency} ${producto.cost}</h5>
                                      </div>
                                  </div>
                                  <p class="mb-0">Descripción:</p>
                                  <p>${producto.description}</p>
                                  <p class="card-text"><small class="text-muted">Vendidos: ${producto.soldCount}</small></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          `).join('');
      }
    
      function aplicarFiltrosYOrden() {
          const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
          const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
          const sortValue = document.getElementById('sort-order').value;
          const searchText = document.getElementById('buscador').value.toLowerCase();

          let productosFiltrados = productos 
          .filter(producto => producto.cost >= minPrice && producto.cost <= maxPrice ) 
          .filter(producto => // Filtrar productos por nombre o descripción que coincida con la búsqueda 
            producto.name.toLowerCase().includes(searchText) || producto.description.toLowerCase().includes(searchText) ); 
    
          if (sortValue === 'price-asc') {
              productosFiltrados.sort((a, b) => a.cost - b.cost);
          } else if (sortValue === 'price-desc') {
              productosFiltrados.sort((a, b) => b.cost - a.cost);
          } else if (sortValue === 'relevance-desc') {
              productosFiltrados.sort((a, b) => b.soldCount - a.soldCount);
          }
    
          mostrarProductos(productosFiltrados);
      }


    
    });

    function setProdId(id) {
        localStorage.setItem("prodId", id);
        window.location = "product-info.html"
    }