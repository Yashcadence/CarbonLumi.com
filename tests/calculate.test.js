const test = require("node:test");
const assert = require("node:assert/strict");
const { loadCalculator } = require("./helper");

const app = loadCalculator();
const uk = app.COUNTRIES.find(function (c) { return c.name === "United Kingdom"; });
const us = app.COUNTRIES.find(function (c) { return c.name === "United States"; });

// Shortcut: calculate for the UK unless another country is given
function calc(answers, country) {
  return app.calculateFootprint(answers, country || uk);
}

// ----- FOOD -----
test("food: vegan diet is 1 tonne", function () {
  assert.equal(calc({ diet: "vegan" }).Food, 1);
});

test("food: buying local always saves 12 percent", function () {
  // 2700 kg x 0.88 = 2376 kg
  assert.equal(calc({ diet: "meat_daily", local: "always" }).Food, 2.38);
});

test("food: 50 percent waste adds a quarter", function () {
  // 1000 kg x (1 + 0.5 x 0.5) = 1250 kg
  assert.equal(calc({ diet: "vegan", wastePercent: "50" }).Food, 1.25);
});

test("food: eating out is converted from pounds to dollars", function () {
  // 78 GBP is about 100 USD; 100 x 52 weeks x 0.6 = 3120 kg, plus 1000 kg vegan diet
  assert.equal(calc({ diet: "vegan", eatOutWeekly: "78" }).Food, 4.12);
});

// ----- TRAVEL -----
test("travel: petrol car with no distance assumes 200 km a week", function () {
  // 200 x 52 x 0.17 = 1768 kg
  assert.equal(calc({ mode: "car_petrol" }).Travel, 1.77);
});

test("travel: an electric car is cleaner than a petrol car", function () {
  assert.ok(calc({ mode: "car_electric" }).Travel < calc({ mode: "car_petrol" }).Travel);
});

test("travel: train hours are counted even when the main mode is train", function () {
  // 5 hours x 52 x 2.1 = 546 kg
  assert.equal(calc({ mode: "train", trainHours: "5" }).Travel, 0.55);
});

test("travel: bus hours are counted", function () {
  // 2 hours x 52 x 4.0 = 416 kg
  assert.equal(calc({ mode: "walk_cycle", busHours: "2" }).Travel, 0.42);
});

test("travel: flights add up (2 home + 1 abroad)", function () {
  // 2 x 400 + 1 x 1600 = 2400 kg
  assert.equal(calc({ mode: "walk_cycle", flightsHome: "2", flightsAbroad: "1" }).Travel, 2.4);
});