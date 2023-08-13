const paises = document.querySelector('#paises')

chamaPais('germany')
chamaPais('United States of America')
chamaPais('brazil')
chamaPais('iceland')
chamaPais('afghanistan')
chamaPais('Åland Islands')
chamaPais('albania')
chamaPais('algeria')

function chamaPais(text) {
  fetch(`https://restcountries.com/v3.1/name/${text}`)
  .then(response => response.json())
  // .then(data => {
  //   console.log(data)
  //   return data;
  // })
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
      <img src="${srcImg}" alt="bandeira do pais" />
      <div>
        <h2>${nomePais}</h2>
        <p>Population: <span>${populacaoTotal}</span></p>
        <p>Region: <span>${regiao}</span></p>
        <p>Capital: <span>${capitalPais}</span></p>
      </div>
      `
      
      paises.appendChild(pais);
    });
  })
  .catch(err => {
    throw err
  })
}