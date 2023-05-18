// Import stylesheets
import './style.css';

// filter
let textIput = document.querySelector('#search');
let listItems = document
  .querySelector('.search-list')
  .getElementsByTagName('li');

// button of submited item
let btnAddItem = document.querySelector('#btnItem');

// textInput passed by parameter to event
textIput.addEventListener('keyup', (e) => {
  let text = e.target.value; // get the text in input
  //console.log(text);
  let pattern = new RegExp(text, 'i'); // case insensitive pattern in regex

  // all listItems length in ul > li
  for (let i = 0; i < listItems.length; i++) {
    let item = listItems[i];
    // check the item (as string using .innerText, not DOM element just item) if the item.innerText passed in pattern is true or false
    if (pattern.test(item.innerText)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  }
});

btnAddItem.addEventListener('click', (e) => {
  e.preventDefault();

  let itemInput = document.querySelector('#add');
  let listItems = document.querySelector('.search-list');

  if (itemInput.value !== '') {
    let myLi = document.createElement('li');
    listItems.appendChild(myLi);

    let spanItem = document.createElement('span');
    spanItem.innerHTML = itemInput.value;
    myLi.appendChild(spanItem);

    let spanCheck = document.createElement('span');
    spanCheck.innerHTML = `<i class="material-icons">check</i>`;
    spanCheck.setAttribute('class', 'check');
    myLi.appendChild(spanCheck);

    let spanDelete = document.createElement('span');
    spanDelete.innerHTML = `<i class="material-icons">delete</i>`;
    spanDelete.setAttribute('class', 'delete');
    myLi.appendChild(spanDelete);

    itemInput.value = '';

    spanCheck.addEventListener('click', () => {
      spanItem.classList.toggle('completed');
    });

    localStorage.setItem('items', JSON.stringify(getItems()));

    spanDelete.addEventListener('click', () => {
      if (myLi) {
        myLi.style.opacity = 0;
        setTimeout(() => {
          if (myLi) {
            myLi.style.display = 'none';
            myLi.remove();
          }
        }, 500);
      }
    });
  }
});

function getItems() {
  let items = [];
  let listItems = document.querySelectorAll('.search-list li');
  listItems.forEach((listItem) => {
    let item = {
      text: listItem.querySelector('span').textContent,
      completed: listItem.querySelector('span').classList.contains('completed'),
    };
    items.push(item);
  });
  return items;
}

let items = JSON.parse(localStorage.getItem('items')) || [];

items.forEach((item) => {
  let myLi = document.createElement('li');
  let spanItem = document.createElement('span');
  let spanCheck = document.createElement('span');
  let spanDelete = document.createElement('span');

  spanItem.innerHTML = item.text;
  myLi.appendChild(spanItem);

  if (item.completed) {
    spanItem.classList.add('completed');
  }

  spanCheck.innerHTML = `<i class="material-icons">check</i>`;
  spanCheck.setAttribute('class', 'check');
  myLi.appendChild(spanCheck);

  spanDelete.innerHTML = `<i class="material-icons">delete</i>`;
  spanDelete.setAttribute('class', 'delete');
  myLi.appendChild(spanDelete);

  let listItems = document.querySelector('.search-list');
  listItems.appendChild(myLi);

  spanCheck.addEventListener('click', () => {
    item.completed = !item.completed;
    localStorage.setItem('items', JSON.stringify(items));
    spanItem.classList.toggle('completed');
  });

  spanDelete.addEventListener('click', () => {
    let index = items.indexOf(item);
    if (index !== -1) {
      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));
      myLi.style.opacity = 0;
      setTimeout(() => {
        myLi.style.display = 'none';
        myLi.remove();
      }, 500);
    }
  });
});
