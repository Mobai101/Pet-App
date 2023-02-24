"use strict";

//#region Selection
// Buttons Selection
const submitBtn = document.querySelector("#submit-btn");
const healthyBtn = document.querySelector("#healthy-btn");
const unhealthyBtn = document.querySelector("#unhealthy-btn");
const bmiBtn = document.querySelector("#bmi-btn");
const deleteBtns = document.querySelectorAll(".btn.btn-danger");

// Sidebar
const sidebarBtn = document.querySelector("#sidebar-title");
const sidebarElement = document.querySelector("#sidebar");

// Fields Selection
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
const tableBody = document.querySelector("#tbody");
//#endregion

// Sidebar Animation
sidebarBtn.addEventListener("click", function () {
  sidebarElement.classList.toggle("active");
});

/* FUNiX code produce 'Unexpected end of JSON input' error => unsuable
// Save to Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Get from storage
function getFromStorage(key, defa) {
  return localStorage.getItem(key) ?? defa;
}
*/

// Function to validate data input by user
function validateData(data) {
  if (!idInput.value) {
    alert("Please input ID!");
    return false;
  } else if (petArr.some((e) => e.id === idInput.value)) {
    alert(" ID must be unique!");
    return false;
  } else if (!data.name) {
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

// Function to render petArr to table
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
    const tableBMI = document.createElement("td");
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
    tableBMI.innerHTML = `${data.bmi ? data.bmi : "?"}`;
    tableDate.innerHTML = `${data.date}`;
    tableAction.innerHTML = `<button type="button" class="btn btn-danger" data-id="${data.id}">Delete</button>`;

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
    tr.appendChild(tableBMI);
    tr.appendChild(tableDate);
    tr.appendChild(tableAction);

    // lastly, append the row
    tableBody.appendChild(tr);
  });
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

//#region Innitialize
let showHealthyOnly = false;
let healthyPetArr = [];
let petArr = localStorage.getItem("petStorage")
  ? JSON.parse(localStorage.getItem("petStorage"))
  : [];

healthyPetArr = petArr.filter(
  (data) => data.vaccinated && data.dewormed && data.sterilized
);
showHealthyOnly ? renderTable(healthyPetArr) : renderTable(petArr);
//#endregion

// Type onchange to update Breed
typeInput.addEventListener("change", function () {
  renderBreedOptions(typeInput.value);
});

// Submit Button
submitBtn.addEventListener("click", function (e) {
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
    date: new Date().toLocaleDateString("en-GB"),
  };

  // If data is filled, add data to array, then clear input on the screen, then show all pet to table
  if (validateData(data)) {
    petArr.push(data);

    localStorage.setItem("petStorage", JSON.stringify(petArr));

    clearInput();

    healthyPetArr = petArr.filter(
      (data) => data.vaccinated && data.dewormed && data.sterilized
    );
    showHealthyOnly ? renderTable(healthyPetArr) : renderTable(petArr);
  }
});

// BMI Button
bmiBtn.addEventListener("click", function (e) {
  // Calculate BMI and store value into data
  petArr.forEach((data) => {
    const bmi = (data.weight * 703) / data.length ** 2;
    data.bmi = Math.round(bmi * 100) / 100;
  });

  // Show BMI value to table

  showHealthyOnly ? renderTable(healthyPetArr) : renderTable(petArr);
});

// Delete button
tableBody.addEventListener("click", function (e) {
  // Guard clauses
  if (!e.target.type) return;
  if (!confirm("Are you sure?")) return;

  // Filter the array according to dataset, then reassign the new filtered array back to petArr
  petArr = petArr.filter((data) => data.id !== e.target.dataset.id);

  // Store new array into local storage
  localStorage.setItem("petStorage", JSON.stringify(petArr));

  // Re assign healthyPetArr incase user is viewing in healthy mode
  healthyPetArr = petArr.filter(
    (data) => data.vaccinated && data.dewormed && data.sterilized
  );

  // re-render the table after deletion
  showHealthyOnly ? renderTable(healthyPetArr) : renderTable(petArr);
});

// Healthy button
healthyBtn.addEventListener("click", function () {
  showHealthyOnly = !showHealthyOnly;

  healthyBtn.innerHTML = `${
    showHealthyOnly ? "Show All Pet" : "Show Healthy Pet"
  }`;

  healthyPetArr = petArr.filter(
    (data) => data.vaccinated && data.dewormed && data.sterilized
  );

  showHealthyOnly ? renderTable(healthyPetArr) : renderTable(petArr);
});
