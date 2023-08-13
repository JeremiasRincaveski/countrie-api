const paises = document.querySelector('#paises')

// iniciaPagina()

function chamaPais(text) {
  fetch(`https://restcountries.com/v3.1/name/${text}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      const {
        name: {common: nomePais}, population: populacaoTotal,
        region: regiao, capital: capitalPais,
        flags: {png: srcImg}
      } = element

      const pais = document.createElement('div');
      pais.className = 'pais'
      pais.innerHTML = `
      <a href="pais.html?pais=${nomePais}">
        <img src="${srcImg}" alt="bandeira do pais" />
        <div>
        <h2>${nomePais}</h2>
        <p>Population: <span>${populacaoTotal}</span></p>
        <p>Region: <span>${regiao}</span></p>
        <p>Capital: <span>${capitalPais}</span></p>
        </div>
      </a>
      `
      
      paises.appendChild(pais);
    });
  })
  .catch(err => {
    throw err
  })
}

export function iniciaPagina() {
  chamaPais('Germany')
  chamaPais('United States of America')
  chamaPais('brazil')
  chamaPais('Iceland')
  chamaPais('Afghanistan')
  chamaPais('Åland Islands')
  chamaPais('Albania')
  chamaPais('Algeria')
}

export function procuraRegiao(regiao) {
  limpaPaises();

  fetch(`https://restcountries.com/v3.1/region/${regiao}`)
    .then(data => data.json())
    .then((data) => {
      data.forEach(pais => {
        paises.appendChild(criaDiv(pais))
      })
    })
    .catch(err => {
      mensagemErro
    })
}

export function procuraPais(pais) {
  limpaPaises();
  if (pais) { 
    fetch(`https://restcountries.com/v3.1/name/${pais}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(dataPais => paises.appendChild(criaDiv(dataPais)))
    })
    .catch(err => {
      mensagemErro()
    })
  } else {
    fetch(`https://restcountries.com/v3.1/all`)
      .then(response => response.json())
      .then(data => data.forEach(dataPais => paises.appendChild(criaDiv(dataPais))))
  }
}

export function paisExato(pais) {
  const main = document.querySelector(`main`);

  if (pais) { 
    fetch(`https://restcountries.com/v3.1/name/${pais}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      data.forEach(dataPais => main.appendChild(criaDiv(dataPais)))
    })
    .catch(err => {
      throw err
    })
  }
}

function criaDiv(element) {
  const {
    name: {common: nomePais}, population: populacaoTotal,
    region: regiao, capital: capitalPais,
    flags: {png: srcImg}
  } = element;

  const pais = document.createElement('div');
  pais.className = 'pais';
  pais.innerHTML = `
  <a href="pais.html?pais=${nomePais}">
        <img src="${srcImg}" alt="bandeira do pais" />
        <div>
        <h2>${nomePais}</h2>
        <p>Population: <span>${populacaoTotal}</span></p>
        <p>Region: <span>${regiao}</span></p>
        <p>Capital: <span>${capitalPais}</span></p>
        </div>
      </a>
  `;

  return pais;
}

function limpaPaises() {
  paises.innerHTML = '';
}

function mensagemErro() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h3>Pais não encontrado</h3>
  `;

  paises.appendChild(div)
}