fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then(response => response.json())
    .then(datos => {
        const cardAuto0 = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px;">
              <div class="row g-2">
                <div class="col-md-4">
                  <img src="${datos.products[0].image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7 d-flex">
                        <h5 class="card-title">${datos.products[0].name}</h5>
                      </div>
                      <div class="col-md-5">
                        <h5 class="card-title">Precio:${datos.products[0].currency + + datos.products[0].cost}</h5>
                      </div>
                    </div>
                    <p class="mb-0">Descripción:</p>
                    <p>${datos.products[0].description}</p>
                    <br>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[0].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
        const cardAuto1 = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px;">
              <div class="row g-2">
                <div class="col-md-4">
                  <img src="${datos.products[1].image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7 d-flex">
                        <h5 class="card-title">${datos.products[1].name}</h5>
                      </div>
                      <div class="col-md-5">
                        <h5 class="card-title">Precio:${datos.products[1].currency + + datos.products[1].cost}</h5>
                      </div>
                    </div>
                    <p class="mb-0">Descripción:</p>
                    <p>${datos.products[1].description}</p>
                    <br>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[1].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
        const cardAuto2 = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px;">
              <div class="row g-2">
                <div class="col-md-4">
                  <img src="${datos.products[2].image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7 d-flex">
                        <h5 class="card-title">${datos.products[2].name}</h5>
                      </div>
                      <div class="col-md-5">
                        <h5 class="card-title">Precio:${datos.products[2].currency + + datos.products[2].cost}</h5>
                      </div>
                    </div>
                    <p class="mb-0">Descripción:</p>
                    <p>${datos.products[2].description}</p>
                    <br>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[2].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
        const cardAuto3 = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px;">
              <div class="row g-2">
                <div class="col-md-4">
                  <img src="${datos.products[3].image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7 d-flex">
                        <h5 class="card-title">${datos.products[3].name}</h5>
                      </div>
                      <div class="col-md-5">
                        <h5 class="card-title">Precio:${datos.products[3].currency + + datos.products[3].cost}</h5>
                      </div>
                    </div>
                    <p class="mb-0">Descripción:</p>
                    <p>${datos.products[3].description}</p>
                    <br>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[3].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
        const cardAuto4 = 
        `<div class="container d-flex" style="justify-content: center;">
            <div class="card mb-3" style="max-width: 900px;">
              <div class="row g-2">
                <div class="col-md-4">
                  <img src="${datos.products[4].image}" class="img-fluid rounded-start" alt="imagen" id="imgAuto">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7 d-flex">
                        <h5 class="card-title">${datos.products[4].name}</h5>
                      </div>
                      <div class="col-md-5">
                        <h5 class="card-title">Precio:${datos.products[4].currency + + datos.products[4].cost}</h5>
                      </div>
                    </div>
                    <p class="mb-0">Descripción:</p>
                    <p>${datos.products[4].description}</p>
                    <br>
                    <p class="card-text"><small class="text-muted">Vendidos: ${datos.products[4].soldCount}</small></p>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
        
        document.body.innerHTML += cardAuto0;
        document.body.innerHTML += cardAuto1;
        document.body.innerHTML += cardAuto2;
        document.body.innerHTML += cardAuto3;
        document.body.innerHTML += cardAuto4;
        
    })
    .catch(error => console.log('error', error))


    // document.getElementById('#nombreAuto').textContent = datos.products[0].name