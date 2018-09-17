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

let max;

const indexes = {
  x: getRandomInt.bind(this, 0, 30),
  binary: parseToBinary,
  fx: givenFunction,
  adaptability: adaptability,
  plan: getPlan,
  reality: value => value
};

for (var i = 0; i < 6; i++) {
  var aggregation = {};

  const createField = (field, value, functionsSum) => {
    if (!aggregation[field]) {
      aggregation[field] = [indexes[field](value, functionsSum)];
    } else {
      aggregation[field].push(indexes[field](value, functionsSum));
    }

    return aggregation[field][aggregation[field].length - 1];
  };

  if (!aggregation.chromosomes) {
    aggregation.chromosomes = [
      getRandomInt(0, 30),
      getRandomInt(0, 30),
      getRandomInt(0, 30),
      getRandomInt(0, 30)
    ];
  }

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

  let crossoverArr = crossover(
    aggregation.binary[0],
    aggregation.binary[1],
    getRandomInt(0, 4)
  ).concat(
    crossover(aggregation.binary[2], aggregation.binary[3], getRandomInt(0, 5))
  );

  let crossoveredValueInDec = crossoverArr.map(item => {
    return parseToDecimal(item);
  });

  let crossoveredFx = crossoveredValueInDec.map(item => {
    return givenFunction(item);
  });

  aggregation.sum = functionsSum;
  aggregation.middle = functionsSum / aggregation.chromosomes.length;
  aggregation.crossover = crossoverArr;
  aggregation.crossoveredValues = crossoveredValueInDec;
  aggregation.crossoveredFx = crossoveredFx;

  if (max) {
    var curMax = Math.max.apply(null, aggregation.fx);
    max = max > curMax ? max : curMax;
  } else {
    max = Math.max.apply(null, aggregation.fx);
  }

  console.log(aggregation);

  aggregation = {};

  aggregation.chromosomes = crossoveredValueInDec;
}

console.log(max);
