"use strict";

//#region Sidebar
const sidebarBtn = document.querySelector("#sidebar-title");
const sidebarElement = document.querySelector("#sidebar");

// Sidebar Animation
sidebarBtn.addEventListener("click", function () {
  sidebarElement.classList.toggle("active");
});
//#endregion

//#region Selection
const tableBody = document.querySelector("#tbody");
const editBtns = document.querySelectorAll(".btn.btn-warning");
const formContainer = document.querySelector("#container-form");
const submitBtn = document.querySelector("#submit-btn");

const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
//#endregion

// render Table Function
function renderTable(petArr) {
  tableBody.innerHTML = "";
  petArr.forEach((data) => {
    // variable for each data column
    const tr = document.createElement("tr");
    const tableID = document.createElement("th");
    tableID.setAttribute("scope", "row");
    const tableName = document.createElement("td");
    const tableAge = document.createElement("td");
    const tableType = document.createElement("td");
    const tableWeight = document.createElement("td");
    const tableLength = document.createElement("td");
    const tableBreed = document.createElement("td");
    const tableColor = document.createElement("td");
    const tableVacc = document.createElement("td");
    const tableDeworm = document.createElement("td");
    const tableSter = document.createElement("td");
    const tableDate = document.createElement("td");
    const tableAction = document.createElement("td");

    // Fill data into column
    tableID.innerHTML = `${data.id}`;
    tableName.innerHTML = `${data.name}`;
    tableAge.innerHTML = `${data.age}`;
    tableType.innerHTML = `${data.type}`;
    tableWeight.innerHTML = `${data.weight} kg`;
    tableLength.innerHTML = `${data.length} cm`;
    tableBreed.innerHTML = `${data.breed}`;
    tableColor.innerHTML = `<i class="bi bi-square-fill" style="color: ${data.color}"></i>`;
    tableVacc.innerHTML = `<i class="bi bi-${
      data.vaccinated ? "check" : "x"
    }-circle-fill"></i>`;
    tableDeworm.innerHTML = `<i class="bi bi-${
      data.dewormed ? "check" : "x"
    }-circle-fill"></i>`;
    tableSter.innerHTML = `<i class="bi bi-${
      data.sterilized ? "check" : "x"
    }-circle-fill"></i>`;
    tableDate.innerHTML = `${data.date}`;
    tableAction.innerHTML = `<button type="button" class="btn btn-warning" data-id="${data.id}">Edit</button>`;

    // Append all column
    tr.appendChild(tableID);
    tr.appendChild(tableName);
    tr.appendChild(tableAge);
    tr.appendChild(tableType);
    tr.appendChild(tableWeight);
    tr.appendChild(tableLength);
    tr.appendChild(tableBreed);
    tr.appendChild(tableColor);
    tr.appendChild(tableVacc);
    tr.appendChild(tableDeworm);
    tr.appendChild(tableSter);
    tr.appendChild(tableDate);
    tr.appendChild(tableAction);

    // lastly, append the row
    tableBody.appendChild(tr);
  });
}

// Validate edit data by user
function validateEdit(data) {
  if (!data.name) {
    alert("Please input name!");
    return false;
  } else if (!data.age || data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  } else if (!data.weight || data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (!data.length || data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
}

// Render Breed Options
function renderBreedOptions(type) {
  // Remove all option and add the default Select Breed each time function is called
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.prepend(option);

  // Get breed list from local storage
  let breedArr = localStorage.getItem("breedStorage")
    ? JSON.parse(localStorage.getItem("breedStorage"))
    : [];

  // append breed option to html depending on type selected
  if (type === "Cat") {
    const breedArrCat = breedArr.filter((breed) => breed.type === "Cat");

    breedArrCat.forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.append(option);
    });
  } else if (type === "Dog") {
    const breedArrDog = breedArr.filter((breed) => breed.type === "Dog");

    breedArrDog.forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.append(option);
    });
  }
}

// Function to clear all input fields
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//#region Initialize
let edittingPet;
let petArr = localStorage.getItem("petStorage")
  ? JSON.parse(localStorage.getItem("petStorage"))
  : [];
renderTable(petArr);
//#endregion

// Edit Button
tableBody.addEventListener("click", function (e) {
  if (!e.target.type) return;

  // Get the editting pet data into variable
  edittingPet = petArr.find((pet) => pet.id === e.target.dataset.id);
  console.log(edittingPet);

  // Show the form
  formContainer.classList.remove("hide");

  // show data from variable to the form
  idInput.value = edittingPet.id;
  nameInput.value = edittingPet.name;
  ageInput.value = edittingPet.age;
  typeInput.value = edittingPet.type;
  weightInput.value = edittingPet.weight;
  lengthInput.value = edittingPet.length;
  colorInput.value = edittingPet.color;
  vaccinatedInput.checked = edittingPet.vaccinated;
  dewormedInput.checked = edittingPet.dewormed;
  sterilizedInput.checked = edittingPet.sterilized;
  // breed is a special field, which needs the renderBreedOptions function first to get the option list
  renderBreedOptions(edittingPet.type);
  breedInput.value = edittingPet.breed;
});

// Type onchange to update Breed
typeInput.addEventListener("change", function () {
  renderBreedOptions(typeInput.value);
});

submitBtn.addEventListener("click", function () {
  // Store user input into data object
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: edittingPet.date,
  };

  // If data is filled, add data to array, then clear input on the screen, then show all pet to table
  if (validateEdit(data)) {
    petArr = petArr.filter((pet) => pet.id !== data.id);
    petArr.push(data);

    localStorage.setItem("petStorage", JSON.stringify(petArr));

    clearInput();
    renderTable(petArr);
    formContainer.classList.add("hide");
  }
});
