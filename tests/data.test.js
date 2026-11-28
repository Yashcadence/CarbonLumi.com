const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

// Load only js/data.js - no browser needed
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "js", "data.js"), "utf8"), context);

// Copy out of the vm so the objects behave normally
const countries      = JSON.parse(JSON.stringify(vm.runInContext("COUNTRIES", context)));
const continentAvgs  = JSON.parse(JSON.stringify(vm.runInContext("CONTINENT_AVERAGES", context)));
const worldAverage   = vm.runInContext("WORLD_AVERAGE", context);

test("data: there are countries to choose from", function () {
  assert.ok(countries.length >= 40);
});

test("data: every country has every field with a sensible type", function () {
  countries.forEach(function (c) {
    assert.ok(typeof c.name === "string" && c.name.length > 0, "name missing");
    assert.ok(typeof c.continent === "string", c.name + ": continent missing");
    assert.ok(typeof c.average === "number", c.name + ": average must be a number");
    assert.ok(c.climate === "hot" || c.climate === "mild", c.name + ': climate must be "hot" or "mild"');
    assert.match(c.currency, /^[A-Z]{3}$/, c.name + ": currency must be 3 capital letters");
    assert.ok(typeof c.perUSD === "number" && c.perUSD > 0, c.name + ": perUSD must be above 0");
  });
});

test("data: country names are unique", function () {
  const names = countries.map(function (c) { return c.name; });
  assert.equal(new Set(names).size, names.length);
});

test("data: every continent used has a continent average", function () {
  countries.forEach(function (c) {
    assert.ok(c.continent in continentAvgs,
      c.name + ': continent "' + c.continent + '" has no entry in CONTINENT_AVERAGES');
  });
});

test("data: averages are above 0 and at most 40 tonnes", function () {
  countries.forEach(function (c) {
    assert.ok(c.average > 0 && c.average <= 40, c.name + ": average " + c.average + " is outside 0-40");
  });
  Object.keys(continentAvgs).forEach(function (name) {
    assert.ok(continentAvgs[name] > 0 && continentAvgs[name] <= 40, name + " continent average is outside 0-40");
  });
});

test("data: the world average is sensible", function () {
  assert.ok(worldAverage > 1 && worldAverage < 10);
});