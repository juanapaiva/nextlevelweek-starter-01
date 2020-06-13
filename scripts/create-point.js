//#region States and Cities configuration

function getStateOrCityOption(select, url, city) {
  if (city) select.innerHTML = "<option value>Selecione a Cidade</option>";
  
  fetch(url)
    .then((res) => res.json())
    .then((values) => {
      for(const value of values) {
        const auxValue = (city) ? value.nome : value.id;
        select.innerHTML += `<option value="${auxValue}">${value.nome}</option>`;
      }
    });
}

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  getStateOrCityOption(ufSelect, url, false);
}

function populateCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  console.log(stateInput);

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  getStateOrCityOption(citySelect, url, true);
  citySelect.disabled = false;
}

populateUFs();

document
.querySelector("select[name=uf]")
.addEventListener("change", populateCities);

//#endregion

//#region Items configuration

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  // Adiciona e remove uma classe com JavaScript
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => item == itemId);

  if (alreadySelected != -1) {
    const filteredItems = selectedItems.filter((item) => item != itemId);
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems;
}

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

//#endregion