const url = 'https://restcountries.com/v3.1'

const paises = document.querySelector('#countries')

fetch('https://restcountries.com/v3.1/name/brazil')
  .then(response => response.json())
  .then(data => console.log(data))