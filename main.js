import { procuraPais } from "./service.js";

const input = document.getElementById('search')

input.addEventListener('blur', () => {
  procuraPais(input.value)
})