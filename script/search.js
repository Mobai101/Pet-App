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
const findBtn = document.querySelector("#find-btn");

const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const typeInput = document.querySelector("#input-type");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const tableBody = document.querySelector("#tbody");
//#endregion

// Function to render petArr to table
function renderTable(petArr) {
  tableBody.innerHTML = "";
  petArr.forEach((pet) => {
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

    // Fill data into column
    tableID.innerHTML = `${pet.id}`;
    tableName.innerHTML = `${pet.name}`;
    tableAge.innerHTML = `${pet.age}`;
    tableType.innerHTML = `${pet.type}`;
    tableWeight.innerHTML = `${pet.weight} kg`;
    tableLength.innerHTML = `${pet.length} cm`;
    tableBreed.innerHTML = `${pet.breed}`;
    tableColor.innerHTML = `<i class="bi bi-square-fill" style="color: ${pet.color}"></i>`;
    tableVacc.innerHTML = `<i class="bi bi-${
      pet.vaccinated ? "check" : "x"
    }-circle-fill"></i>`;
    tableDeworm.innerHTML = `<i class="bi bi-${
      pet.dewormed ? "check" : "x"
    }-circle-fill"></i>`;
    tableSter.innerHTML = `<i class="bi bi-${
      pet.sterilized ? "check" : "x"
    }-circle-fill"></i>`;
    tableDate.innerHTML = `${pet.date}`;

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

    // lastly, append the row
    tableBody.appendChild(tr);
  });
}

// Render Breed option to show on drop down
function renderBreedOptions() {
  // Remove all option and add the default Select Breed each time function is called
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.prepend(option);

  // Get breed list from local storage
  const breedArr = localStorage.getItem("breedStorage")
    ? JSON.parse(localStorage.getItem("breedStorage"))
    : [];

  // Add breed to option
  breedArr.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = `${breed.breed}`;
    breedInput.append(option);
  });
}

//#region initialize
let searchedPetArr = [];
let petArr = localStorage.getItem("petStorage")
  ? JSON.parse(localStorage.getItem("petStorage"))
  : [];
renderBreedOptions();
//#endregion

// Find button
findBtn.addEventListener("click", function () {
  // Log input data into variable
  const searchID = idInput.value;
  const searchName = nameInput.value;
  const searchType = typeInput.value;
  const searchBreed = breedInput.value;
  const searchVaccinated = vaccinatedInput.checked;
  const searchDewormed = dewormedInput.checked;
  const searchSterilized = sterilizedInput.checked;
  searchedPetArr = petArr;

  //#region Guard Clause
  if (
    !searchID &&
    !searchName &&
    searchType === "Select Type" &&
    searchBreed === "Select Breed" &&
    !searchVaccinated &&
    !searchDewormed &&
    !searchSterilized
  ) {
    tableBody.innerHTML = "";
    return;
  }
  //#endregion

  //#region Search filtering
  if (searchID) {
    searchedPetArr = searchedPetArr.filter((pet) =>
      pet.id.toLowerCase().includes(searchID.toLowerCase())
    );
  }
  if (searchName) {
    searchedPetArr = searchedPetArr.filter((pet) =>
      pet.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }
  if (searchType !== "Select Type") {
    searchedPetArr = searchedPetArr.filter((pet) => pet.type === searchType);
  }
  if (searchBreed !== "Select Breed") {
    searchedPetArr = searchedPetArr.filter((pet) => pet.breed === searchBreed);
  }
  if (searchVaccinated) {
    searchedPetArr = searchedPetArr.filter((pet) => pet.vaccinated === true);
  }
  if (searchDewormed) {
    searchedPetArr = searchedPetArr.filter((pet) => pet.dewormed === true);
  }
  if (searchSterilized) {
    searchedPetArr = searchedPetArr.filter((pet) => pet.sterilized === true);
  }
  //#endregion

  renderTable(searchedPetArr);
});
