var table = document.getElementById('mytable');
var input = document.getElementById('myinput');
var cookies =  [ 
        { "name": "Chocolate Chip", "price": "$2.49", "category": "Standard" },
        { "name": "Sugar", "price": "$1.79", "category": "Standard" },
        { "name": "Snickerdoodle", "price": "$2.49", "category": "Standard" },
        { "name": "Oatmeal Raisin", "price": "$2.99", "category": "Standard" },
        { "name": "Peanut Butter", "price": "$2.99", "category": "Standard" },
        { "name": "White Chocolate Macadamia", "price": "$3.99", "category": "Premium" },
        { "name": "Red Velvet", "price": "$3.49", "category": "Premium" },
        { "name": "Black and White", "price": "$3.49", "category": "Premium" },
        { "name": "Triple Chocolate", "price": "$3.99", "category": "Premium" },
        { "name": "White Chocolate Coconut Divine", "price": "$5.99", "category": "Signature" },
        { "name": "Dark Chocolate Pistachio Sea Salt", "price": "$5.49", "category": "Signature" },
        { "name": "Brown Butter Bourbon Spice", "price": "$5.49", "category": "Signature" },
        { "name": "Bacon Chocolate Chip", "price": "$5.99", "category": "Signature" }
      ]
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';

const sort_by = (field, reverse, primer) => {

  const key = primer ?
    function(x) {
      return primer(x[field]);
    } :
    function(x) {
      return x[field];
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
};


function clearArrow() {
  let carets = document.getElementsByClassName('caret');
  for (let caret of carets) {
    caret.className = "caret";
  }
}


function toggleArrow(event) {
  let element = event.target;
  let caret, field, reverse;
  if (element.tagName === 'SPAN') {
    caret = element.getElementsByClassName('caret')[0];
    field = element.id
  }
  else {
    caret = element;
    field = element.parentElement.id
  }

  let iconClassName = caret.className;
  clearArrow();
  if (iconClassName.includes(caretUpClassName)) {
    caret.className = `caret ${caretDownClassName}`;
    reverse = false;
  } else {
    reverse = true;
    caret.className = `caret ${caretUpClassName}`;
  }

  cookies.sort(sort_by(field, reverse));
  populateTable();
}


function populateTable() {
  table.innerHTML = '';
  for (let data of cookies) {
    let row = table.insertRow(-1);
    let name = row.insertCell(0);
    name.innerHTML = data.name;

    let quantity = row.insertCell(1);
    quantity.innerHTML = data.price;

    let price = row.insertCell(2);
    price.innerHTML = data.category;
  }

  filterTable();
}


function filterTable() {
  let filter = input.value.toUpperCase();
  rows = table.getElementsByTagName("TR");
  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = 'yellow';
        } else {
          cell.style.backgroundColor = '';
        }

        flag = true;
      } else {
        cell.style.backgroundColor = '';
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}


populateTable();

let tableColumns = document.getElementsByClassName('table-column');

for (let column of tableColumns) {
  column.addEventListener('click', function(event) {
    toggleArrow(event);
  });
}

input.addEventListener('keyup', function(event) {
  filterTable();
});