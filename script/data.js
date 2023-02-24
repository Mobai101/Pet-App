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
const fileInput = document.querySelector("#input-file");
const importBtn = document.querySelector("#import-btn");
const exportBtn = document.querySelector("#export-btn");
//#endregion

// Export Data
exportBtn.addEventListener("click", function () {
  let blob = new Blob([localStorage.getItem("petStorage")], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "petData.json");
});

// Import Data
importBtn.addEventListener("click", function () {
  //#region Initialize and guard clause
  let tempPetArr = [];
  let petArr = localStorage.getItem("petStorage")
    ? JSON.parse(localStorage.getItem("petStorage"))
    : [];

  const importedFile = fileInput.files[0];
  if (!importedFile) {
    alert("Please add file!");
    return;
  }
  //#endregion

  // Import file
  if (importedFile) {
    // Read file to variable tempPetArr
    const reader = new FileReader();
    reader.readAsText(importedFile, "UTF-8");
    reader.onload = function (e) {
      tempPetArr = JSON.parse(e.target.result);

      // Filter the original petArr to remove all duplicate IDs from the original array. Meaning we override them with the IDs from imported file.
      petArr = petArr.filter((pet) =>
        tempPetArr.every((tempPet) => tempPet.id !== pet.id)
      );

      // Concat the filtered old array with the new array from the file
      const newPetArr = petArr.concat(tempPetArr);

      // Final Step, save new array to local storage
      localStorage.setItem("petStorage", JSON.stringify(newPetArr));
      alert("Import Successfully!");
    };
  }
});
