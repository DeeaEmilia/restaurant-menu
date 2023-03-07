const SERVER_URL = 'http://localhost:5052/api/products';

async function getMenu() {
  //apelam backendul
  const payload = await fetch(SERVER_URL);
  //prelucram ce gasim in backend
  const result = await payload.json();

  showMenu(result);
}

function showMenu(menu) {
  let table = '';

  menu.forEach((item) => {
    table += `<div class="item-content" id=${item.id}>`;
    table += `<div><h3>${item.name}</h3></div>`;
    table += `<div><img src=${item.image} /></div></div>`;
  });

  document.querySelector('.menu-content').innerHTML = table;

  const menuCards = document.querySelectorAll('.item-content');
  menuCards.forEach(card => {
    const itemId = card.getAttribute('id');
    card.addEventListener('click', () => openModal(itemId));
  });
}

async function openModal(itemId) {
  const modal = document.querySelector('.modal');
  modal.classList.add('open');

  const exitModal = document.querySelectorAll('.modal-exit');
  exitModal.forEach(exit => {
    exit.addEventListener('click', () => {
      modal.classList.remove('open');
    })
  })

  const payload = await fetch(`${SERVER_URL}/${itemId}`);
  //prelucram ce gasim in backend
  const result = await payload.json();

  console.log(result);
}



