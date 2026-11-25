// Loads js/data.js and js/app.js inside a fake "browser" so the maths can be tested in Node.
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

function fakeElement() {
  return {
    hidden: false, textContent: "", innerHTML: "",
    add() {}, addEventListener() {}, setAttribute() {}, scrollIntoView() {}, focus() {}
  };
}

// Objects made inside the vm are from a different "realm", so copy them into plain objects
function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadCalculator() {
  const context = vm.createContext({
    document: { getElementById: fakeElement },
    Option: function () {},
    FormData: function () {},
    Chart: { defaults: {} }
  });

  ["data.js", "app.js"].forEach(function (file) {
    const code = fs.readFileSync(path.join(__dirname, "..", "js", file), "utf8");
    vm.runInContext(code, context);
  });

  const calculate = vm.runInContext("calculateFootprint", context);
  const validate  = vm.runInContext("validateAnswers", context);

  return {
    calculateFootprint: function (answers, country) { return plain(calculate(answers, country)); },
    validateAnswers:    function (answers) { return plain(validate(answers)); },
    COUNTRIES:          plain(vm.runInContext("COUNTRIES", context))
  };
}

module.exports = { loadCalculator };