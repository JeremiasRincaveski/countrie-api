const dropDow = document.getElementById('dropDow');
const valorSelecionado = dropDow.querySelector('#options')
const img = dropDow.querySelector('img');
const menu = dropDow.querySelector('#menu');
const valores = menu.querySelectorAll('li');
const valor = dropDow.querySelector('#selected');

valores.forEach(li => {
  li.addEventListener('click', () => {
    valor.textContent = li.textContent;
  })
})

window.addEventListener('click', e => {
  if (e.target == valorSelecionado || e.target == valor || e.target == img) {
    if (menu.className == 'active') {
      menu.className = '';
      img.className = '';
    } else {
      menu.className = 'active';
      img.className = 'rotate';
    }
  } else {
    menu.className = '';
    img.className = '';
  }
})