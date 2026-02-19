//Fruit
const MAIN_URL = "http://localhost:3000/fruits/";
const fruitButtons = document.querySelector("#fruit-buttons");
const calories = document.querySelector("#calories");
const fat = document.querySelector("#fat");
const sugar = document.querySelector("#sugar");
const carbohydrates = document.querySelector("#carbohydrates");
const protein = document.querySelector("#protein");
const fruitsList = document.querySelector("#fruits-list");
const deleteAllButton = document.querySelector("#clear-button");
let currentCalories = 0;
let currentFat = 0;
let currentSugar = 0;
let currentCarbohydrates = 0;
let currentProtein = 0;

//
async function fruitMixButtons() {
  const response = await fetch(MAIN_URL);
  const data = await response.json();
  data.forEach(createButton);
}
function createButton(fruitObj) {
  const button = document.createElement("button");
  button.textContent = fruitObj.name;
  fruitButtons.append(button);
  button.addEventListener("click", () => totalNutritions(fruitObj.id));
  button.addEventListener("click", () => addFruitsList(fruitObj.id));
}
async function totalNutritions(id) {
  const response = await fetch(MAIN_URL + id);
  const data = await response.json();
  currentCalories += Number(data.calories);
  currentCalories = Math.round(currentCalories * 100) / 100;
  calories.textContent = currentCalories;
  //
  currentSugar += Number(data.sugar);
  currentSugar = Math.round(currentSugar * 100) / 100;
  sugar.textContent = currentSugar;
  //
  currentCarbohydrates += Number(data.carbohydrates);
  currentCarbohydrates = Math.round(currentCarbohydrates * 100) / 100;
  carbohydrates.textContent = currentCarbohydrates;
  //
  currentFat += Number(data.fat);
  currentFat = Math.round(currentFat * 100) / 100;
  fat.textContent = currentFat;
  //
  currentProtein += Number(data.protein);
  currentProtein = Math.round(currentProtein * 100) / 100;
  protein.textContent = currentProtein;
}
async function addFruitsList(id) {
  const response = await fetch(MAIN_URL + id);
  const data = await response.json();
  const li = document.createElement("li");
  li.textContent = data.name;
  fruitsList.append(li);

  const button = document.createElement("button");
  button.textContent = "delete";
  li.append(button);
  button.addEventListener("click", () => li.remove());
  button.addEventListener("click", () => {
    currentCalories -= Number(data.calories);
    currentCalories = Math.round(currentCalories * 100) / 100;
    calories.textContent = currentCalories;
    //
    currentSugar -= Number(data.sugar);
    currentSugar = Math.round(currentSugar * 100) / 100;
    sugar.textContent = currentSugar;
    //
    currentCarbohydrates -= Number(data.carbohydrates);
    currentCarbohydrates = Math.round(currentCarbohydrates * 100) / 100;
    carbohydrates.textContent = currentCarbohydrates;
    //
    currentFat -= Number(data.fat);
    currentFat = Math.round(currentFat * 100) / 100;
    fat.textContent = currentFat;
    //
    currentProtein -= Number(data.protein);
    currentProtein = Math.round(currentProtein * 100) / 100;
    protein.textContent = currentProtein;
  });
}
deleteAllButton.addEventListener("click", () => {
  const taskList = document.querySelectorAll("#fruits-list li");
  taskList.forEach((li) => li.remove());
  currentCalories = 0;
  currentFat = 0;
  currentSugar = 0;
  currentCarbohydrates = 0;
  currentProtein = 0;

  calories.textContent = "0";
  fat.textContent = "0";
  sugar.textContent = "0";
  carbohydrates.textContent = "0";
  protein.textContent = "0";
});

fruitMixButtons();
