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
const submitBtn = document.querySelector("#submit-btn");
const deleteBtn = document.querySelectorAll(".btn.btn-danger");

const breedInput = document.querySelector("#input-breed");
const typeInput = document.querySelector("#input-type");
const tableBody = document.querySelector("#tbody");
//#endregion Selection

// Function to validate input data
function validateData(breed) {
  if (!breedInput.value) {
    alert("Please input Breed!");
    return false;
  } else if (
    breedArr.some(
      (e) => e.breed === breedInput.value && e.type === typeInput.value
    )
  ) {
    alert("Breed already exist!");
    return false;
  } else if (typeInput.value === "Select Type") {
    alert("Please Select Type!");
    return false;
  }
  return true;
}

// Clear Input
function clearInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

// Render Breed
function renderBreed(breedArr) {
  let breedNumber = 1;
  tableBody.innerHTML = "";
  breedArr.forEach((breed) => {
    // variable for each data column
    const tr = document.createElement("tr");
    const tableNum = document.createElement("th");
    tableNum.setAttribute("scope", "row");
    const tableBreed = document.createElement("td");
    const tableType = document.createElement("td");
    const tableAction = document.createElement("td");

    // Fill data into column
    tableNum.innerHTML = `${breedNumber}`;
    tableBreed.innerHTML = `${breed.breed}`;
    tableType.innerHTML = `${breed.type}`;
    tableAction.innerHTML = `<button type="button" class="btn btn-danger" data-breed="${breed.id}">Delete</button>`;

    breedNumber += 1;

    // Append all column
    tr.appendChild(tableNum);
    tr.appendChild(tableBreed);
    tr.appendChild(tableType);
    tr.appendChild(tableAction);

    // lastly, append the row
    tableBody.appendChild(tr);
  });
}

//#region Initalize
let breedArr = localStorage.getItem("breedStorage")
  ? JSON.parse(localStorage.getItem("breedStorage"))
  : [];

renderBreed(breedArr);
//#endregion Initalize

// Submit button
submitBtn.addEventListener("click", function () {
  // Store user input into data object
  const breed = {
    // Auto Generate a random ID for each breed
    id:
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36),
    breed: breedInput.value,
    type: typeInput.value,
  };
  // If data is filled, add data to array, then clear input on the screen, then show all breed to table
  if (validateData(breed)) {
    breedArr.push(breed);
    localStorage.setItem("breedStorage", JSON.stringify(breedArr));
    clearInput();
    renderBreed(breedArr);
  }
});

// Delete Button
tableBody.addEventListener("click", function (e) {
  if (!e.target.type) return;
  if (!confirm("Are you sure?")) return;

  breedArr = breedArr.filter((breed) => breed.id !== e.target.dataset.breed);
  localStorage.setItem("breedStorage", JSON.stringify(breedArr));
  renderBreed(breedArr);
});
