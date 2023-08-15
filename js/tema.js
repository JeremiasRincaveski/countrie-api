const toggle = document.getElementById('tema');
const svg = document.querySelector('svg>path')

toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');

  const root = getComputedStyle(document.documentElement);
  const tema = root.getPropertyValue('--fonte');

  svg.setAttribute('stroke', tema);
  localStorage.setItem('tema', document.documentElement.className);
})

window.addEventListener('load', () => {
  const tema = localStorage.getItem('tema')

  document.documentElement.className = tema;
  const root = getComputedStyle(document.documentElement);
  const rootTema = root.getPropertyValue('--fonte');

  svg.setAttribute('stroke', rootTema);
})