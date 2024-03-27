let weapons;

function typeCSS(type) {
  switch (type) {
    case "Primary":
      return "bg-orange-500 hover:bg-orange-600 dark:bg-orange-900 dark:hover:bg-orange-700 outline outline-4 outline-orange-500 dark:outline-orange-900 drop-on-death";
      break;

    case "Secondary":
      return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-700 outline outline-4 outline-blue-500 dark:outline-blue-900 drop-on-death";
      break;

    case "Melee":
      return "bg-red-500 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-600 outline outline-4 outline-red-500 dark:outline-red-900 drop-on-death";
      break;

    case 'Melee2':
      return "bg-red-500 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-600 outline outline-4 outline-red-500 dark:outline-red-800";
      break;

    case 'Blueprint':
      return "bg-blue-300 hover:bg-blue-400 outline outline-4 outline-blue-500 hover:outline-blue-600  blueprint";
      break;

    case 'HighTech':
      return "bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-900 dark:hover:bg-yellow-600 outline outline-4 outline-yellow-500 dark:outline-yellow-800 drop-on-death";
      break;

    case 'Exotics':
      break;

    default:
      return "bg-gray-500 hover:bg-gray-600 outline outline-4 outline-gray-700";
      break;
  }
}

let amount = 0;
let weaponList;

async function loadItems(){
  
await fetch("data/Weapons.json")
.then((response) => response.json())
.then((data) => {
  weaponList = data[0].section_items;
  data[0].section_items.forEach((element) => {
    let item_html = `
    <div class="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mb-4 text-gray-200 dark:text-gray-300 items-center text-center ${typeCSS(element.type)}" data-type="${element.type}" data-name="${element.name}" data-unique-id="${element.unique_id}">
      <h2 class="text-2xl font-bold mb-4 text-center">${element.name}</h2>
      <img src="/assets/Weapons/${element.unique_id}.png" alt="${element.name}" class="w-32 h-32 mx-auto mb-4">
      <span class="text-xl font-bold mb-4 text-center">Lvl: ${element.skill} ${element.level}</span>
      </div>`;

    document.querySelector("#result-list").insertAdjacentHTML("beforeend", item_html);

    document.querySelector(`[data-unique-id="${element.unique_id}"]`).addEventListener("click", function () {
      window.location.href = `./view-item.html?id=${element.unique_id}`;
    });

    amount++;
    document.getElementById("result-count").innerHTML = amount;
  });
})
.catch((error) => console.error(error));

await fetch("data/Attachments.json")
.then((response) => response.json())
.then((data) => {
  weaponList = data[0].section_items;
  data[0].section_items.forEach((element) => {
    let item_html = `
    <div class="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mb-4 text-gray-200 dark:text-gray-300 items-center text-center ${typeCSS()}" data-type="Attachments" data-name="${element.name}" data-unique-id="${element.unique_id}">
      <h2 class="text-2xl font-bold mb-4 text-center">${element.name}</h2>
      <img src="/assets/attachment.png" alt="${element.name}" class="w-32 h-32 mx-auto mb-4">
      <span class="text-xl font-bold mb-4 text-center">Lvl: ${element.skill} ${element.level}</span>
      </div>`;

    document.querySelector("#result-list").insertAdjacentHTML("beforeend", item_html);

    document.querySelector(`[data-unique-id="${element.unique_id}"]`).addEventListener("click", function () {
      window.location.href = `./view-item.html?id=${element.unique_id}`;
    });

    amount++;
    document.getElementById("result-count").innerHTML = amount;
  });
})
.catch((error) => console.error(error));

await fetch("data/Ammo.json")
.then((response) => response.json())
.then((data) => {
  weaponList = data[0].section_items;
  data[0].section_items.forEach((element) => {
    let item_html = `
    <div class="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mb-4 text-gray-200 dark:text-gray-300 items-center text-center ${typeCSS()}" data-type="Weapon Ammo" data-name="${element.name}" data-unique-id="${element.unique_id}">
      <h2 class="text-2xl font-bold mb-4 text-center">${element.name}</h2>
      <img src="/assets/ammo/${element.unique_id}.png" alt="${element.name}" class="w-32 h-32 mx-auto mb-4">
      <span class="text-xl font-bold mb-4 text-center">Lvl: ${element.skill} ${element.level}</span>
      </div>`;

    document.querySelector("#result-list").insertAdjacentHTML("beforeend", item_html);

    document.querySelector(`[data-unique-id="${element.unique_id}"]`).addEventListener("click", function () {
      window.location.href = `./view-item.html?id=${element.unique_id}`;
    });

    amount++;
    document.getElementById("result-count").innerHTML = amount;
  });
})
.catch((error) => console.error(error));

}

document.addEventListener("DOMContentLoaded", async function () {
  const categoryCheckboxes = document.querySelectorAll(".category");
  const searchBar = document.querySelector("#search");

  function filterWeapons() {
    const resultList = document.getElementById("result-list");
    const weapons = resultList.querySelectorAll("[data-type]");
    const searchString = searchBar.value.toLowerCase().trim();
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.name);

    let filteredAmount = 0;

    weapons.forEach(function (weapon) {
      const type = weapon.dataset.type;
      const name = weapon.dataset.name.toLowerCase();

      if (
        (searchString === "" || name.includes(searchString)) &&
        (selectedCategories.includes("All") ||
          selectedCategories.includes(type))
      ) {
        weapon.classList.remove("hidden");
        filteredAmount++;
      } else {
        weapon.classList.add("hidden");
      }
    });

    document.getElementById("result-count").innerHTML = filteredAmount;
  }

  searchBar.addEventListener("input", filterWeapons);

  categoryCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", filterWeapons);
  });
 
  await loadItems();
  filterWeapons();

  $("#check-all").on("click", function () {
    $(".category").prop("checked", true);
    filterWeapons();
  });

  $("#uncheck-all").on("click", function () {
    $(".category").prop("checked", false);
    filterWeapons();
  });
});
