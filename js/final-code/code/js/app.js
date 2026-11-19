const countrySelect = document.getElementById("country");
const questionsForm = document.getElementById("questions");

const sortedCountries = COUNTRIES.slice().sort(function (a, b) {
  return a.name.localeCompare(b.name);
});
sortedCountries.forEach(function (country) {
  countrySelect.add(new Option(country.name, country.name));
});