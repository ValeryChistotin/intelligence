const helpers = require('./helpers');

const {
  getRandomInt,
  givenFunction,
  sumOfGivenFunction,
  parseToBinary,
  parseToDecimal,
  adaptability,
  getPlan,
  crossover,
  mutate,
  getDecimal
} = helpers;

const indexes = {
  x: getRandomInt.bind(this, 0, 30),
  binary: parseToBinary,
  fx: givenFunction,
  adaptability: adaptability,
  plan: getPlan,
  reality: value => value
};
const aggregation = {};

aggregation.chromosomes = [
  getRandomInt(0, 30),
  getRandomInt(0, 30),
  getRandomInt(0, 30),
  getRandomInt(0, 30)
];

const createField = (field, value, functionsSum) => {
  if (!aggregation[field]) {
    aggregation[field] = [indexes[field](value, functionsSum)];
  } else {
    aggregation[field].push(indexes[field](value, functionsSum));
  }

  return aggregation[field][aggregation[field].length - 1];
};

aggregation.chromosomes.forEach(value => {
  createField('binary', value);

  const cur = createField('x');
  createField('fx', cur);
});

const functionsSum = sumOfGivenFunction(aggregation.x);

aggregation.x.forEach(value => {
  createField('adaptability', value, functionsSum);
  const decimalPlan = createField('plan', value, functionsSum);

  createField('reality', Math.round(decimalPlan));
});

aggregation.sum = functionsSum;
aggregation.max = Math.max.apply(null, aggregation.fx);
aggregation.middle = functionsSum / aggregation.chromosomes.length;

console.log(aggregation);
