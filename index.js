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

var aggregation = {};

for (var i = 0; i < 6; i++) {
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
    createField('fx', value);
  });

  const functionsSum = sumOfGivenFunction(aggregation.chromosomes);

  aggregation.chromosomes.forEach(value => {
    createField('adaptability', value, functionsSum);
    const decimalPlan = createField('plan', value, functionsSum);

    let chance = Math.random();
    let result;
    if(getDecimal(value) > chance){
        result = Math.round(decimalPlan);
    } else {
        result = Math.floor(decimalPlan);
    }

    createField('reality', result);
  });

  let randomOrder = [];
  while(randomOrder.length < 4){
      let randomNum = getRandomInt(0,3);

      if(randomOrder.every(item => item!=randomNum)){
        randomOrder.push(randomNum);
      }
  }

  let crossoverArr = crossover(
    aggregation.binary[randomOrder[0]],
    aggregation.binary[randomOrder[1]],
    getRandomInt(0, 4)
  ).concat(
    crossover(aggregation.binary[randomOrder[2]], aggregation.binary[randomOrder[3]], getRandomInt(0, 4))
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
