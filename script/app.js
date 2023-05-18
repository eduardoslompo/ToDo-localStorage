import './style.css';

// filter
let textIput = document.querySelector('#search');
let listItems = document.querySelector('.search-list');

// button of submit item
let btnAddItem = document.querySelector('#btnItem');
let items = getItems();
let itemInput = document.querySelector('#add');
// textInput passed by parameter to event
textIput.addEventListener('keyup', (e) => {
  let text = e.target.value; // get the text in input
  //console.log(text);
  let pattern = new RegExp(text, 'i'); // case insensitive pattern in regex

  // all listItems length in ul > li
  for (let i = 0; i < listItems.children.length; i++) {
    let item = listItems.children[i];
    // check the item (as string using .innerText, not DOM element just item) if the item.innerText passed in pattern is true or false
    if (pattern.test(item.querySelector('span').innerText)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  }
});

//when click at the button, call function addItem()
btnAddItem.addEventListener('click', (e) => {
  e.preventDefault();

  let text = itemInput.value.trim();

  if (!text) return;

  addItem(text);
  itemInput.value = '';
});

itemInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    let text = itemInput.value.trim();

    if (!text) return;

    addItem(text);
    itemInput.value = '';
  }
});

//add item to array and save in localStorage
function addItem(text) {
  items.push({
    text,
    completed: false,
  });

  localStorage.setItem('items', JSON.stringify(items));
  let newLi = createListItem(text, false);
  listItems.appendChild(newLi);
}

//create a list item li < span
function createListItem(text, completed) {
  const newLi = document.createElement('li');

  const spanItem = document.createElement('span');
  spanItem.innerHTML = text;
  newLi.appendChild(spanItem);

  if (completed) {
    spanItem.classList.add('completed');
  }

  const spanCheck = document.createElement('span');
  spanCheck.innerHTML = '<i class="material-icons">check</i>';
  spanCheck.classList.add('check');
  newLi.appendChild(spanCheck);

  const spanDelete = document.createElement('span');
  spanDelete.innerHTML = '<i class="material-icons">delete</i>';
  spanDelete.classList.add('delete');
  newLi.appendChild(spanDelete);

  spanCheck.addEventListener('click', () => {
    const item = getItemByText(text);
    toggleItem(spanItem, item);
  });

  spanDelete.addEventListener('click', () => {
    const item = getItemByText(text);
    removeItem(newLi, item);
  });

  return newLi;
}

function toggleItem(spanItem, item) {
  item.completed = !item.completed;
  localStorage.setItem('items', JSON.stringify(items));
  spanItem.classList.toggle('completed');
}

function removeItem(myLi, item) {
  const index = items.indexOf(item);
  if (index !== -1) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    myLi.style.opacity = 0;
    setTimeout(() => {
      myLi.style.display = 'none';
      myLi.remove();
    }, 500);
  }
}

//get items in localStorage
function getItems() {
  const savedItems = JSON.parse(localStorage.getItem('items')) || [];
  const items = [];

  savedItems.forEach((item) => {
    const newLi = createListItem(item.text, item.completed);
    listItems.appendChild(newLi);
    items.push(item);
  });
  return items;
}

function getItemByText(text) {
  return items.find((item) => item.text === text);
}
