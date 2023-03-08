const SERVER_URL = 'http://localhost:5052/api/products';

async function getMenu() {
  // Call the backend API to fetch the menu items
  const payload = await fetch(SERVER_URL);
  // Get the JSON data from the response
  const result = await payload.json();
  // Call the showMenu function to display the menu items
  showMenu(result);
}

function showMenu(menu) {
  let table = '';
  // Loop through each item in the menu and create a card for it
  menu.forEach((item) => {
    table += `<div class="item-content" id=${item.id}>`;
    table += `<div><h3>${item.name}</h3></div>`;
    table += `<div><img src=${item.image} /></div></div>`;
  });

  // Display the cards in the .menu-content element
  document.querySelector('.menu-content').innerHTML = table;
  // Add event listener to each card to open the corresponding modal
  const menuCards = document.querySelectorAll('.item-content');
  menuCards.forEach((card) => {
    const itemId = card.getAttribute('id');
    //ne trebuie callback ca sa nu se apeleze imediat
    card.addEventListener('click', () => openModal(itemId));
  });
}

async function openModal(itemId) {
  // Open the modal and add the "open" class to it
  const modal = document.querySelector('.modal');
  modal.classList.add('open');
  // Add event listener to close the modal when clicking on the background or close button
  const exitModal = modal.querySelectorAll('.modal-exit');
  exitModal.forEach((exit) => {
    exit.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  });
  // Call the backend API to fetch the details of the selected item
  const payload = await fetch(`${SERVER_URL}/${itemId}`);
  // Get the JSON data from the response
  const result = await payload.json();
  // Call the displayDetails function to show the details in the modal
  displayDetails(result);
}

function displayDetails(result) {
  // Get the elements in the modal
  const name = document.querySelector('.modal-name');
  const ingredients = document.querySelector('.modal-ingredients');
  const image = document.querySelector('.modal-image');
  const recipe = document.querySelector('.modal-recipe');

  // Set the content of the elements based on the details of the selected item
  name.innerHTML = result.name;
  ingredients.innerHTML = 'Ingrediente: ' + result.ingredients;
  image.src = result.image;
  recipe.innerHTML = 'Reteta: ' + result.recipe;
  // Add event listeners to the delete and edit buttons
  const btnDelete = document.querySelector('.btn-delete');
  const btnEdit = document.querySelector('.btn-edit');
  btnDelete.addEventListener('click', () => deleteItem(result.id));
  btnEdit.addEventListener('click', () => openEditModal(result));
}

async function deleteItem(itemId) {
  // Show a warning message and delete the item if confirmed
  const warning = confirm('Are you sure you want to delete this product?');
  // If user confirms, make the DELETE request to the server
  if (warning) {
    await fetch(`${SERVER_URL}/${itemId}`, {
      //Set the HTTP method to DELETE (token, headere, body, method)
      method: 'DELETE',
    }).then(() => window.location.reload()); // Reload the page to reflect changes
  }
}

function openEditModal(result) {
  const modal = document.querySelector('.edit-modal');
  modal.classList.add('open');

  const exitModal = modal.querySelectorAll('.modal-exit');
  exitModal.forEach((exit) => {
    exit.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  });

  displayEditDetails(result);
}

function displayEditDetails(result) {
  const editName = document.querySelector('.edit-name');
  const editIngredients = document.querySelector('.edit-ingredients');
  const editImage = document.querySelector('.edit-image');
  const editRecipe = document.querySelector('.edit-recipe');

  if (result) {
    editName.setAttribute('value', result.name);
    editIngredients.setAttribute('value', result.ingredients);
    editImage.setAttribute('value', result.image);
    editRecipe.innerHTML = result.recipe;
  }

  document.querySelector('.btn-save').addEventListener('click', () => {
    const editedItem = {
      id: result?.id,
      name: editName.value,
      ingredients: editIngredients.value,
      image: editImage.value,
      recipe: editRecipe.value,
    };

    if (result) {
      updateItem(editedItem);
    } else {
      addItem(editedItem);
    }
  });
}

async function updateItem(editedItem) {
  await fetch(`${SERVER_URL}/${editedItem.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedItem),
  }).then(() => window.location.reload());
}

async function addItem(addedItem) {
  await fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addedItem),
  }).then(() => window.location.reload());
}
