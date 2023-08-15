import { procuraPais, iniciaPagina, getLista } from "./service.js";

const input = document.getElementById('search');
const label = document.querySelector(`#busca>label`);

input.addEventListener('blur', () => {
  procuraPais(input.value)
})

label.addEventListener(`click`, () => {
  procuraPais(input.value)
})

window.addEventListener(`keydown`, e => {
  if (e.key == `Enter`) {
    procuraPais(input.value)
  }
})

window.addEventListener(`load`, () => {
  input.value = ``;
  iniciaPagina();
  getLista();
})