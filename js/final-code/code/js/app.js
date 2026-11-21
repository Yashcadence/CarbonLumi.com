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