const test = require("node:test");
const assert = require("node:assert/strict");
const { loadCalculator } = require("./helper");

const app = loadCalculator();
const uk = app.COUNTRIES.find(function (c) { return c.name === "United Kingdom"; });
const us = app.COUNTRIES.find(function (c) { return c.name === "United States"; });

function calc(answers, country) {
  return app.calculateFootprint(answers, country || uk);
}

test("food: vegan diet is 1 tonne", function () {
  assert.equal(calc({ diet: "vegan" }).Food, 1);
});

test("food: buying local always saves 12 percent", function () {
  assert.equal(calc({ diet: "meat_daily", local: "always" }).Food, 2.38);
});

test("food: 50 percent waste adds a quarter", function () {
  assert.equal(calc({ diet: "vegan", wastePercent: "50" }).Food, 1.25);
});

test("food: eating out is converted from pounds to dollars", function () {
  assert.equal(calc({ diet: "vegan", eatOutWeekly: "78" }).Food, 4.12);
});

test("travel: petrol car with no distance assumes 200 km a week", function () {
  assert.equal(calc({ mode: "car_petrol" }).Travel, 1.77);
});

test("travel: an electric car is cleaner than a petrol car", function () {
  assert.ok(calc({ mode: "car_electric" }).Travel < calc({ mode: "car_petrol" }).Travel);
});

test("travel: train hours are counted even when the main mode is train", function () {
  assert.equal(calc({ mode: "train", trainHours: "5" }).Travel, 0.55);
});

test("travel: bus hours are counted", function () {
  assert.equal(calc({ mode: "walk_cycle", busHours: "2" }).Travel, 0.42);
});

test("travel: flights add up (2 home + 1 abroad)", function () {
  assert.equal(calc({ mode: "walk_cycle", flightsHome: "2", flightsAbroad: "1" }).Travel, 2.4);
});

test("home: 2 adults and 1 child share a semi-detached house with gas heating", function () {
  const answers = { house: "semi", bedrooms: "3", people: "3", adults: "2", heating: "gas" };
  assert.equal(calc(answers).Home, 1.56);
});

test("home: one adult in a one-bedroom flat gets the whole household", function () {
  assert.equal(calc({ house: "apartment", bedrooms: "1", people: "1", adults: "1" }).Home, 1.9);
});

test("home: a heat pump cuts the home figure to 40 percent", function () {
  const answers = { house: "apartment", bedrooms: "2", people: "1", adults: "1", heating: "heat_pump" };
  assert.equal(calc(answers).Home, 0.88);
});

test("home: always switching off standby saves 8 percent", function () {
  const answers = { house: "apartment", bedrooms: "2", people: "1", adults: "1", standby: "always" };
  assert.equal(calc(answers).Home, 2.02);
});

test("home: there is a minimum of half a tonne", function () {
  assert.equal(calc({ bedrooms: "1", people: "1", adults: "1" }).Home, 0.5);
});

test("goods: two TVs and one phone", function () {
  // 2 x 350 + 70 = 770 kg
  assert.equal(calc({ tv: "2", phone: "1" })["Goods & services"], 0.77);
});

test("goods: monthly spending is converted to dollars and multiplied by 12", function () {
  // 78 GBP is about 100 USD; 100 x 12 x 0.5 = 600 kg
  assert.equal(calc({ clothes: "78" })["Goods & services"], 0.6);
});

test("goods: the same spending in dollars gives the same answer", function () {
  assert.equal(
    calc({ clothes: "100" }, us)["Goods & services"],
    calc({ clothes: "78" }, uk)["Goods & services"]
  );
});

test("skipped questions add nothing except the home minimum", function () {
  const result = calc({});
  assert.equal(result.Food, 0);
  assert.equal(result.Travel, 0);
  assert.equal(result["Goods & services"], 0);
  assert.equal(result.Home, 0.5);
});

test("validate: 2 adults in a home of 3 is fine", function () {
  assert.deepEqual(app.validateAnswers({ people: "3", adults: "2" }), []);
});

test("validate: more adults than people is rejected", function () {
  const problems = app.validateAnswers({ people: "2", adults: "3" });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /adults cannot be more than/);
});

test("validate: waste above 100 percent is rejected", function () {
  const problems = app.validateAnswers({ wastePercent: "150" });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /between 0 and 100/);
});

test("validate: half a person is rejected", function () {
  const problems = app.validateAnswers({ people: "2.5", adults: "2" });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /whole number/);
});