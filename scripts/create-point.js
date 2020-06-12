function getStateOrCityOption(select, url) {
  fetch(url)
    .then((res) => res.json())
    .then((values) => {
      for(const value of values) {
        select.innerHTML += `<option value="${value.id}">${value.nome}</option>`;
      }
    });
}

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  getStateOrCityOption(ufSelect, url);
}

function populateCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  console.log(stateInput);

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  getStateOrCityOption(citySelect, url);
  citySelect.disabled = false;
}

populateUFs();

document
  .querySelector("select[name=uf]")
  .addEventListener("change", populateCities);
  