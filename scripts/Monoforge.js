let weapons, tools, metal_ingots, equipment;

function WeaponTypeCSS(type) {
  switch (type) {
    case "Primary":
      return "bg-orange-900 hover:bg-orange-700 outline outline-3 outline-orange-900";
      break;
    case "Secondary":
      return "bg-blue-900 hover:bg-blue-700 outline outline-3 outline-blue-900";
      break;
    case "Melee":
      return "bg-red-900 hover:bg-red-700 outline outline-3 outline-red-900";
      break;

    default:
      return "bg-gray-600 hover:bg-gray-500 outline outline-3 outline-gray-600";
      break;
  }
}

weapons = fetch("data/Weapons.json")
  .then((response) => response.json())
  .then((data) => {
    data[0].section_items.forEach((element) => {
      let item_html = `
        <li class="p-2 m-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600  items-center space-x-4">
         <img src="./assets/Weapons/${element.unique_id}.png" alt="${element.name}" class="lines p-2 w-16 h-16 ${WeaponTypeCSS(element.type)}">
         <span class="text-dark dark:text-gray-300 font-bold text-xl"><b>${element.name}</b><span class="text-sm float-right">Req: ${element.skill} ${element.level}</span></span>
        </li>`;

      document
        .querySelector("#items")
        .insertAdjacentHTML("beforeend", item_html);
    });
  })
  .catch((error) => console.error(error));
