const idCategoria = localStorage.getItem('catID');

fetch(`https://japceibal.github.io/emercado-api/cats_products/${idCategoria}.json`)  //Creo el fetch de la API e-mercado con los productos de la categoría
    .then(response => response.json())  //recibo la respuesta y la transformo en un json
    .then(datos => {                    //informacion que recibo de la API
        let titulo = `<h2 class="text-center mb-5 mt-5">Categoría: ${datos.catName}</h1>`
        let productos = '';                 //creo una variable donde voy a guardar todas las cards que voy a crear
        for (let i = 0; i < datos.products.length; i++) {           //creo una iteración for que va a crear cada una de las card según el largo de el array productos 
          const cardProductos = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px;">
              <div class="row g-2">
                <div class="col-md-4"> 
                  <img src="${datos.products[i].image}" class="img-thumbnail" alt="imagen" id="imgAuto">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7 d-flex">
                        <h5 class="card-title" style="font-family: Impact">${datos.products[i].name}</h5>
                      </div>
                      <div class="col-md-5">
                        <h5 class="card-title">Precio:${datos.products[i].currency} ${datos.products[i].cost}</h5>
                      </div>
                    </div>
                    <p class="mb-0">Descripción:</p>
                    <p>${datos.products[i].description}</p>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[i].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;  

        productos += cardProductos;      //en la variable productos se va a guardar cada una de las cards auto 
    }
        const container = document.createElement('div'); //con el dom creo un div donde voy a guardar las cards de cada auto
        container.innerHTML = titulo + productos;                     //agrego el div creado al html y le agrego dentro la variable productos donde estan cada una de las cards de los productos
        document.body.appendChild(container);             //especifico que el div que cree será hijo del body, osea estará adentro de la etiqueta body
    })
    
    .catch(error => console.log('error', error))        //en caso de que ocurra un error en la obtención de la información, mostrará en la consola el código del error


