import { procuraPais } from "./service.js";

const input = document.getElementById('search')
const label = document.querySelector(`#busca>label`)

console.log(label);

input.addEventListener('blur', () => {
  procuraPais(input.value)
})

label.addEventListener(`click`, () => {
  procuraPais(input.value)
})

window.addEventListener(`keydown`, e => {
  console.log(e);
  if (e.key == `Enter`) {
    procuraPais(input.value)
  }
})

window.addEventListener(`load`, () => {
  input.value = ``
  input.focus()
})