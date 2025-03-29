const nameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addBtn = document.getElementById("addBtn");
const peopleList = document.getElementById("peopleList");
const deleteBtn = document.getElementById("delete-btn");
const requiredDiv1 = document.getElementById("required1");
const requiredDiv2 = document.getElementById("required2");
const totalCheck = document.getElementById("total-check");

let people = [];
let isEditMode = false;
let currentId = null;

addBtn.addEventListener("click", addPerson);

[nameInput, lastNameInput].forEach(input => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addPerson();
      // nameInput.focus()
      lastNameInput.blur()
    }
  });
});

function addPerson(){
  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const id = Date.now();
  if (!name && !lastName) {
    requiredDiv1.classList.remove("hidden");
    requiredDiv2.classList.remove("hidden");
    return;
  } else if (!name) {
    requiredDiv1.classList.remove("hidden");
    return;
  } else if (!lastName) {
    requiredDiv2.classList.remove("hidden");
    return;
  } else {
    requiredDiv1.classList.add("hidden");
    requiredDiv2.classList.add("hidden");
  }

  if (isEditMode) {
    let editPerson = people.find((person) => person.id === currentId);
    editPerson.name = nameInput.value;
    editPerson.lastName = lastNameInput.value;
    addBtn.innerHTML = "ADD";
    isEditMode = false;
    currentId = null;
  } else {
    people.push({ name, lastName, id: id });
  }
  clearInputs();
  renderList();
}

function renderList() {
  peopleList.innerHTML = "";
  people.forEach((person) => {
    createTableRows(person);
  });
}

function createTableRows(person) {
  return (peopleList.innerHTML += `
    <tr>
    <td class="table-items"><input type="checkbox" name="" class="row-checkbox" id="${person.id}" /></td>
    <td class="table-items">${person.name}</td>
    <td class="table-items">${person.lastName}</td>
    <td class="table-items">
        <button onclick = "deleteItemHandler(${person.id})" >Delete</button>
        <button onclick = "editItemHandler(${person.id})" >Edit</button>
    </td>
  </tr>
    `);
}

function clearInputs() {
  nameInput.value = "";
  lastNameInput.value = "";
}

function deleteItemHandler(id) {
  people = people.filter((person) => person.id !== id);
  renderList();
}

function editItemHandler(id) {
  let foundPerson = people.find((person) => person.id === id);
  nameInput.value = foundPerson.name;
  lastNameInput.value = foundPerson.lastName;
  isEditMode = true;
  addBtn.innerHTML = "Edit";
  currentId = id;
}

deleteBtn.addEventListener("click", deleteSelectedItems);

function deleteSelectedItems(){
  const selectedCheckBoxes = document.querySelectorAll(".row-checkbox:checked");

  const selectedIds = Array.from(selectedCheckBoxes).map((checkbox) => parseInt(checkbox.id, 10));

  people = people.filter((person) => !selectedIds.includes(person.id));

  renderList();

  totalCheck.checked = false;
}

totalCheck.addEventListener("change" , () => {
  const allRowCheckboxes = document.querySelectorAll(".row-checkbox");
  const isChecked = totalCheck.checked;

  allRowCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
  });
})