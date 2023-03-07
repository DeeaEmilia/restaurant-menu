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
  const exitModal = document.querySelectorAll('.modal-exit');
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
  const btnDelete = document.querySelector('.btn-delete');
  const btnEdit = document.querySelector('.btn-edit');
  // Set the content of the elements based on the details of the selected item
  name.innerHTML = result.name;
  ingredients.innerHTML = 'Ingrediente: ' + result.ingredients;
  image.src = result.image;
  recipe.innerHTML = 'Reteta: ' + result.recipe;
  // Add event listeners to the delete and edit buttons
  btnDelete.addEventListener('click', () => deleteItem(result.id));
  btnEdit.addEventListener('click', () => editModal(result));
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

function editModal(result) {
  // Get the modal element and add the "open" class to it
  const modal = document.getElementById('modal-edit');
  modal.classList.add('open');

  // Get the form fields and set their values based on the details of the selected item
  const nameInput = document.getElementById('edit-name');
  const ingredientsInput = document.getElementById('edit-ingredients');
  const imageInput = document.getElementById('edit-image');
  const recipeInput = document.getElementById('edit-recipe');

  // Set values of form fields based on result object
  nameInput.value = result.name;
  ingredientsInput.value = result.ingredients;
  imageInput.value = result.image;
  recipeInput.value = result.recipe;

  // Get save and cancel buttons
  const saveBtn = document.querySelector('.btn-save');

  // Add event listener to save button
  saveBtn.addEventListener('click', async () => {
    // Create an updated item object with the new values from the form fields
    const updatedItem = {
      name: nameInput.value,
      ingredients: ingredientsInput.value,
      image: imageInput.value,
      recipe: recipeInput.value,
    };
    // Make the PUT request to update the item in the server
    await editItem(result.id, updatedItem);
    // Hide the modal
    modal.classList.remove('open');
  });

  // Add event listener to cancel button
  const exitModal = document.querySelectorAll('.modal-exit');
  exitModal.forEach((exit) => {
    exit.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  });
}

async function editItem(itemId, updatedItem) {
  // Make the PUT request to update the item in the server
  await fetch(`${SERVER_URL}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  }).then(() => window.location.reload()); // Reload the page to reflect changes
}
