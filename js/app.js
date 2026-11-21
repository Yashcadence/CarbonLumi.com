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
  car_petrol:   0.17,
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


function buildQuestions(country) {
  const money = "(" + country.currency + ")";   // e.g. "(GBP)"

  let heatingOptions;
  let heatingLabel;
  if (country.climate === "hot") {
    heatingLabel = "How do you cool your home?";
    heatingOptions = [
      ["ac_most_rooms", "Air conditioning in most rooms"],
      ["ac_some_rooms", "Air conditioning in one or two rooms"],
      ["fans_only",     "Fans only"],
      ["natural",       "Natural ventilation only"]
    ];
  } else {
    heatingLabel = "How do you heat your home?";
    heatingOptions = [
      ["gas",       "Gas"],
      ["oil",       "Oil"],
      ["electric",  "Electric heaters"],
      ["heat_pump", "Heat pump"],
      ["wood",      "Wood or biomass"],
      ["district",  "District heating"],
      ["none",      "No heating"]
    ];
  }

  return [
    {
      title: "Food",
      icon: "food",
      questions: [
        { id: "diet", required: true, type: "select",
          label: "Which best describes your diet?",
          options: [
            ["meat_every_meal", "Meat at every meal"],
            ["meat_daily",      "Meat every day"],
            ["meat_twice_week", "Meat twice a week"],
            ["meat_once_week",  "Meat once a week"],
            ["no_beef",         "No beef"],
            ["vegetarian",      "Vegetarian"],
            ["vegan",           "Vegan"]
          ] },
        { id: "eatOutWeekly", type: "number",
          label: "How much do you spend in restaurants and takeaways in a week? " + money },
        { id: "wastePercent", type: "number", max: 100,
          label: "What percentage of the food on your plate gets wasted? (0 to 100)" },
        { id: "local", type: "select",
          label: "How often do you buy locally sourced food (not imported from another country)?",
          options: [["never", "Never"], ["sometimes", "Sometimes"], ["often", "Often"], ["always", "Always"]] }
      ]
    },

    {
      title: "Home",
      icon: "home",
      questions: [
        { id: "house", required: true, type: "select",
          label: "What kind of house do you live in?",
          options: [
            ["detached",  "Detached house"],
            ["semi",      "Semi-detached house"],
            ["terraced",  "Terraced house"],
            ["apartment", "Apartment or flat"],
            ["other",     "Other"]
          ] },
        { id: "bedrooms", required: true, type: "number", min: 1,
          label: "How many bedrooms does your home have?" },
        { id: "people", required: true, type: "number", min: 1,
          label: "How many people live in your home (including you)?" },
        { id: "adults", required: true, type: "number", min: 1,
          label: "How many of them are aged above 17?" },
        { id: "heating", type: "select", label: heatingLabel, options: heatingOptions },
        { id: "standby", type: "select",
          label: "Do you regularly turn off lights and avoid leaving appliances on standby?",
          options: [["always", "Yes, always"], ["sometimes", "Sometimes"], ["rarely", "Rarely"]] }
      ]
    },

    {
      title: "Things you buy",
      icon: "shop",
      questions: [
        { id: "tv", type: "number",
          label: "In the last 12 months, how many TVs or monitors did you buy?" },
        { id: "largeAppliance", type: "number",
          label: "In the last 12 months, how many fridges, washing machines or other large appliances did you buy?" },
        { id: "phone", type: "number",
          label: "In the last 12 months, how many mobile phones did you buy?" },
        { id: "gadget", type: "number",
          label: "In the last 12 months, how many laptops, tablets or other gadgets did you buy?" },
        { id: "clothes", type: "number",
          label: "How much do you spend on clothes in a month? " + money },
        { id: "pets", type: "number",
          label: "How much do you spend on pets and pet food in a month? " + money },
        { id: "health", type: "number",
          label: "How much do you spend on health and grooming in a month? " + money },
        { id: "mobileContract", type: "number",
          label: "How much do you spend on mobile contracts in a month? " + money },
        { id: "hobbies", type: "number",
          label: "How much do you spend on hobbies in a month? " + money }
      ]
    },

    {
      title: "Travel",
      icon: "transport",
      questions: [
        { id: "mode", required: true, type: "select",
          label: "What is your most preferred mode of transport?",
          options: [
            ["car_petrol",   "Car (petrol)"],
            ["car_diesel",   "Car (diesel)"],
            ["car_hybrid",   "Car (hybrid)"],
            ["car_electric", "Car (electric)"],
            ["motorbike",    "Motorbike"],
            ["train",        "Train"],
            ["bus",          "Bus"],
            ["walk_cycle",   "Walking or cycling"]
          ] },
        { id: "carKmWeekly", type: "number",
          label: "If you drive or ride, how many kilometres do you travel in a week? (If you skip this we assume " + DEFAULT_KM_PER_WEEK + " km.)" },
        { id: "trainHours", type: "number",
          label: "TRAIN: how many hours do you travel by train in a week?" },
        { id: "busHours", type: "number",
          label: "BUS: how many hours do you travel by bus in a week?" },
        { id: "flightsHome", type: "number",
          label: "How many return flights do you take each year within your home country?" },
        { id: "flightsAbroad", type: "number",
          label: "How many return flights do you take each year outside your home country?" }
      ]
    }
  ];
}


function buildQuestionHtml(question) {
  let field;

  if (question.type === "select") {
    const blankText = question.required ? "Select…" : "Skip this question";
    let optionsHtml = '<option value="">' + blankText + "</option>";
    question.options.forEach(function (option) {
      optionsHtml += '<option value="' + option[0] + '">' + option[1] + "</option>";
    });
    field = '<select id="' + question.id + '" name="' + question.id + '"' +
            (question.required ? " required" : "") + ">" + optionsHtml + "</select>";
  } else {
    const min = question.min !== undefined ? question.min : 0;
    const max = question.max !== undefined ? ' max="' + question.max + '"' : "";
    field = '<input type="number" id="' + question.id + '" name="' + question.id + '"' +
            ' min="' + min + '"' + max + ' step="any"' +
            (question.required ? " required" : "") + ">";
  }

  const optionalNote = question.required ? "" : " <small>(optional)</small>";
  return '<label for="' + question.id + '">' + question.label + optionalNote + field + "</label>";
}

function showQuestions(country) {
  let html = "";
  buildQuestions(country).forEach(function (section) {
    html += "<fieldset>";
    html += '<legend><img src="images/icon-' + section.icon + '.svg" alt="">' + section.title + "</legend>";
    section.questions.forEach(function (question) {
      html += buildQuestionHtml(question);
    });
    html += "</fieldset>";
  });
  html += '<button class="btn" type="submit">Calculate my footprint</button>';

  questionsForm.innerHTML = html;
  questionsForm.hidden = false;
}

function findCountry(name) {
  return COUNTRIES.find(function (c) { return c.name === name; });
}

countrySelect.addEventListener("change", function () {
  resultsSection.hidden = true;
  const country = findCountry(countrySelect.value);
  if (country) {
    showQuestions(country);
  } else {
    questionsForm.hidden = true;
  }
});

questionsForm.addEventListener("submit", function (event) {
  event.preventDefault();
});


function calculateFootprint(answers, country) {
  function num(id) {
    const value = parseFloat(answers[id]);
    return isNaN(value) ? 0 : value;
  }
  function usd(id) {
    return num(id) / country.perUSD;
  }

  let food = DIET_KG[answers.diet] || 0;
  food = food * (1 - (LOCAL_FOOD_SAVING[answers.local] || 0));
  food = food * (1 + (Math.min(num("wastePercent"), 100) / 100) * WASTE_EFFECT);
  food = food + usd("eatOutWeekly") * 52 * KG_PER_USD_EATING_OUT;

  let travel = 0;
  if (KG_PER_KM[answers.mode] !== undefined) {  
    const kmPerWeek = (answers.carKmWeekly === "" || answers.carKmWeekly === undefined)
      ? DEFAULT_KM_PER_WEEK
      : num("carKmWeekly");
    travel += kmPerWeek * 52 * KG_PER_KM[answers.mode];
  }
  travel += num("trainHours") * 52 * KG_PER_HOUR_TRAIN;
  travel += num("busHours")   * 52 * KG_PER_HOUR_BUS;
  travel += num("flightsHome")   * KG_PER_FLIGHT_HOME_COUNTRY;
  travel += num("flightsAbroad") * KG_PER_FLIGHT_ABROAD;

  const people = Math.max(num("people"), 1);
  const adults = Math.min(Math.max(num("adults"), 1), people);
  const children = people - adults;
  const myShare = 1 / (adults + 0.5 * children);  

  let household = (HOUSE_KG[answers.house] || 0) +
                  EXTRA_KG_PER_BEDROOM_ABOVE_2 * (num("bedrooms") - 2);
  household = Math.max(household, 500);
  household = household * (answers.heating in HEATING_COOLING_FACTOR ? HEATING_COOLING_FACTOR[answers.heating] : 1);
  household = household * (answers.standby in STANDBY_FACTOR ? STANDBY_FACTOR[answers.standby] : 1);
  const home = household * myShare;

  let goods = 0;
  for (const item in KG_PER_ITEM) {
    goods += num(item) * KG_PER_ITEM[item];
  }
  for (const spend in KG_PER_USD) {
    goods += usd(spend) * 12 * KG_PER_USD[spend];
  }

  function tonnes(kg) { return Math.round(kg / 10) / 100; }
  return {
    "Food": tonnes(food),
    "Travel": tonnes(travel),
    "Home": tonnes(home),
    "Goods & services": tonnes(goods)
  };
}

const resultsSection = document.getElementById("results");

function describeDifference(yourTotal, average, placeName) {
  const percent = Math.round((yourTotal / average - 1) * 100);
  const direction = percent >= 0 ? "above" : "below";
  return Math.abs(percent) + "% " + direction + " the " + placeName + " average (" + average + " t)";
}

function showResults(parts, country) {
  const yourTotal = Math.round(Object.values(parts).reduce(function (a, b) { return a + b; }, 0) * 100) / 100;
  const continentAverage = CONTINENT_AVERAGES[country.continent];

  document.getElementById("total").textContent = yourTotal.toFixed(1);
  document.getElementById("comparison").textContent =
    "You are " + describeDifference(yourTotal, country.average, country.name) + ", " +
    describeDifference(yourTotal, continentAverage, country.continent) + ", and " +
    describeDifference(yourTotal, WORLD_AVERAGE, "world") + ".";

  const tip = document.getElementById("tip");
  tip.textContent = biggestSourceTip(parts);
  tip.hidden = false;
  
  resultsSection.hidden = false;
  drawBarChart(yourTotal, country, continentAverage);
  drawDoughnutChart(parts);
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

questionsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const country = findCountry(countrySelect.value);
  const answers = Object.fromEntries(new FormData(questionsForm));
  showResults(calculateFootprint(answers, country), country);
});


function biggestSourceTip(parts) {
  let biggest = "Food";
  for (const group in parts) {
    if (parts[group] > parts[biggest]) {
      biggest = group;
    }
  }
  return "Your biggest source is " + biggest + " (" + parts[biggest] + " t). That is the best place to start cutting.";
}


Chart.defaults.color = "#eaf3ee";
Chart.defaults.borderColor = "rgba(234,243,238,0.15)";

let barChart = null;
let doughnutChart = null;

function drawBarChart(yourTotal, country, continentAverage) {
  if (barChart) { barChart.destroy(); }
  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["You", country.name, country.continent, "World"],
      datasets: [{
        data: [yourTotal, country.average, continentAverage, WORLD_AVERAGE],
        backgroundColor: ["#5fd09b", "#6bb6d9", "#e6b85c", "#c4d1ca"]
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Tonnes CO2e per person per year" }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
}


function drawDoughnutChart(parts) {
  if (doughnutChart) { doughnutChart.destroy(); }
  doughnutChart = new Chart(document.getElementById("doughnutChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(parts),
      datasets: [{
        data: Object.values(parts),
        backgroundColor: ["#5fd09b", "#6bb6d9", "#e6b85c", "#b59ae0"],
        borderColor: "#0d2419"
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: { title: { display: true, text: "Where your emissions come from (tonnes)" } }
    }
  });
}