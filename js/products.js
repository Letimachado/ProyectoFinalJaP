fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')  //Creo el fetch de la API e-mercado, en este caso de los productos de la categoría auto
    .then(response => response.json())  //recibo la respuesta y la transformo en un json
    .then(datos => {                    //informacion que recibo de la API
        let autos = '';                 //creo una variable donde voy a guardar todas las cards que voy a crear
        for (let i = 0; i < datos.products.length; i++) {           //creo una iteración for que va a crear cada una de las card según el largo de el array productos 
          const cardAuto = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px; border: solid; border-color: orange;">
              <div class="row g-2">
                <div class="col-md-4"> 
                  <img src="${datos.products[i].image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
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
                    <br>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[i].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;  

        autos += cardAuto;      //en la variable autos se va a guardar cada una de las cards auto 
    }
        const container = document.createElement('div'); //con el dom creo un div donde voy a guardar las cards de cada auto
        container.innerHTML = autos;                     //agrego el div creado al html y le agrego dentro la variable autos donde estan cada una de las cards de los autos
        document.body.appendChild(container);             //especifico que el div que cree será hijo del body, osea estará adentro de la etiqueta body
    })
    .catch(error => console.log('error', error))        //en caso de que ocurra un error en la obtención de la información, mostrará en la consola el código del error


