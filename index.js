function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function givenFunction(x) {
  return -(x * x) + 40 * x + 300;
}

function sumOfGivenFunction(argsArr) {
  return argsArr.reduce((accumulator, currentX) => {
    return accumulator + givenFunction(currentX);
  });
}

function parseToBinary(number) {
  return number.toString(2);
}

function parseToDecimal(number) {
  return +number;
}

function adaptability(x, sum) {
  return givenFunction(x) / sum;
}

function getPlan(x, sum) {
  return adaptability(x, sum) * 4;
}

function crossover(firstNum, secondNum, breakPoint) {
  firstNumFPath = firstNum.split('').slice(0, breakPoint);
  firstNumSPath = firstNum.split('').slice(breakPoint);
  secondNumFPath = secondNum.split('').slice(0, breakPoint);
  secondNumSPath = secondNum.split('').slice(breakPoint);
  return {
    firstNum: firstNumFPath.join('') + secondNumSPath.join(''),
    secondNum: secondNumFPath.join('') + firstNumSPath.join('')
  };
}

function mutate(givenNumber, chance) {
  var resultNumber = [];
  var numberLength = givenNumber.length;

  var mutatePoint = getRandomInt(0, numberLength);
  var entryArray = givenNumber.split('').slice(mutatePoint);
  var notMutatePath = givenNumber.slice(0, mutatePoint);

  entryArray.every(item => {
    if (Math.random() < chance) {
      resultNumber.push(+!+item);

      return true;
    } else {
      return false;
    }
  });

  return notMutatePath + resultNumber.join('');
}

const getDecimal = num => {
  let str = '' + num;
  const zeroPos = str.indexOf('.');

  if (zeroPos == -1) {
    return 0;
  }

  str = str.slice(zeroPos);

  return +str;
};

const indexes2 = {
  x: getRandomInt.bind(this, 0, 30),
  binary: parseToBinary,
  fx: givenFunction,
  adaptability: adaptability,
  plan: getPlan,
  reality: value => value
};
const aggregation = {};

aggregation.chromosomes = [1, 2, 3, 4];

const createField = (field, value, functionsSum) => {
  if (!aggregation[field]) {
    aggregation[field] = [indexes2[field](value, functionsSum)];
  } else {
    aggregation[field].push(indexes2[field](value, functionsSum));
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

  const decimalReal = getRandomInt(0, 1);

  if (decimalPlan > decimalReal) {
    createField('reality', Math.round(decimalReal));
  } else {
    createField('reality', Math.ceil(decimalReal));
  }
});

aggregation.sum = functionsSum;
aggregation.max = Math.max.apply(null, aggregation.fx);
aggregation.middle = functionsSum / aggregation.chromosomes.length;

console.log(aggregation);
