let weapons;

function WeaponTypeCSS(type) {
  switch (type) {
    case "Primary":
      return "bg-orange-500 hover:bg-orange-600 dark:bg-orange-900 dark:hover:bg-orange-700 outline outline-3 outline-orange-500 dark:outline-orange-900";
      break;
    case "Secondary":
      return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-700 outline outline-3 outline-blue-500 dark:outline-blue-900"; 
      break;
    case "Melee":
      return "bg-red-500 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-600 outline outline-3 outline-red-500 dark:outline-red-900";
      break;

    default:
      return "bg-gray-500 hover:bg-gray-600 outline outline-3 outline-gray-700";
      break;
  }
}

weapons = fetch("data/Weapons.json")
  .then((response) => response.json())
  .then((data) => {
    data[0].section_items.forEach((element) => {
      let item_html = `
        <div class="bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 rounded-lg p-6 flex items-center justify-center space-x-4 cursor-pointer" data-weapon-type="${element.type}">
         <img src="./assets/Weapons/${element.unique_id}.png" alt="${element.name}" class="lines p-2 w-16 h-16 drop-on-death ${WeaponTypeCSS(element.type)}">
         <h2 class="text-2xl font-bold my-4">${element.name}</h2>
        </div>`;

      document
        .querySelector("#weapon-list")
        .insertAdjacentHTML("beforeend", item_html);
    });

  })
  .catch((error) => console.error(error));

  document.addEventListener("DOMContentLoaded", function () {
    const categoryCheckboxes = document.querySelectorAll(".category");

    categoryCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const weaponList = document.getElementById("weapon-list");
            const weapons = weaponList.querySelectorAll("[data-weapon-type]");
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.name);

            weapons.forEach(function (weapon) {
                const weaponType = weapon.dataset.weaponType;
                if (selectedCategories.includes("All") || selectedCategories.includes(weaponType)) {
                    weapon.classList.remove("hidden");
                } else {
                    weapon.classList.add("hidden");
                }
            });
        });
    });
});
