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
      data.forEach(dataPais => main.appendChild(criaDivExata(dataPais)))
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

function criaDivExata(element) {
  const {
    name: {common: nomePais, nativeName }, population: populacaoTotal,
    region: regiao, subregion: subRegiao, capital: capitalPais,
    flags: {png: srcImg}, tld: dominio, currencies, languages, borders
  } = element;

  let linguaPrincipal, moedaUsada, linguasFaladas = [];

  for (const element in nativeName) {
    linguaPrincipal = element;
  }

  for (const element in currencies) {
    moedaUsada = element
  }

  for (const element in languages) {
    linguasFaladas.push(languages[element])
  }

  console.log(element);

  const pais = document.createElement('div');
  pais.className = 'pais';
  pais.innerHTML = `
  <div>
    <img src="${srcImg}" alt="bandeira do pais" />
    
    <h2>${nomePais}</h2>
    
    <ul>
      <li>Native Name: <span>${nativeName[linguaPrincipal].common}</span></li>
      <li>Population: <span>${populacaoTotal}</span></li>
      <li>Region: <span>${regiao}</span></li>
      <li>Sub Region: <span>${subRegiao}</span></li>
      <li>Capital: <span>${capitalPais}</span></li>
    </ul>

    <ul>
      <li>Top Level Domain: <span>${dominio}</span></li>
      <li>Currencies: <span>${currencies[moedaUsada].name}</span></li>
      <li>Languages: <span>${linguasFaladas}</span></li>  
    </ul>

    <nav>
      <h3>Border Countries:</h3>
      <div class="vizinhos">
      </div>
    </nav>
  </div>
  `;

  const vizinhos = pais.querySelector('.vizinhos');

  borders.forEach(codigo => {
    vizinhos.appendChild(chamaBorda(codigo))
  })  

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

function chamaBorda(code) {
  fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then(response => response.json())
    .then(data => {
      const button = document.createElement('button');
      button.className = 'button';
      console.log(data);
      // button.innerText = data.name.common
      return button
    })
    .catch(err => {
      throw err
    })
}