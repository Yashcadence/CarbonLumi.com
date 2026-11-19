const countrySelect = document.getElementById("country");
const questionsForm = document.getElementById("questions");

const sortedCountries = COUNTRIES.slice().sort(function (a, b) {
  return a.name.localeCompare(b.name);
});
sortedCountries.forEach(function (country) {
  countrySelect.add(new Option(country.name, country.name));
});


const DIET_KG = {
  meat_every_meal: 3300,
  meat_daily:      2700,
  meat_twice_week: 2000,
  meat_once_week:  1700,
  no_beef:         1500,
  vegetarian:      1400,
  vegan:           1000
};

const LOCAL_FOOD_SAVING = { never: 0, sometimes: 0.03, often: 0.07, always: 0.12 };

const WASTE_EFFECT = 0.5;

const KG_PER_USD_EATING_OUT = 0.6;

const KG_PER_KM = {
  car_petrol:   1.7,
  car_diesel:   0.16,
  car_hybrid:   0.105,
  car_electric: 0.05,
  motorbike:    0.11
};

const DEFAULT_KM_PER_WEEK = 200;

const KG_PER_HOUR_TRAIN = 2.1;
const KG_PER_HOUR_BUS   = 4.0;

const KG_PER_FLIGHT_HOME_COUNTRY = 400;
const KG_PER_FLIGHT_ABROAD       = 1600;