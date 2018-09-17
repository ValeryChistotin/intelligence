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
  let binaryNum = number.toString(2);

  while (binaryNum.length < 5) {
    binaryNum = '0' + binaryNum;
  }

  return binaryNum;
}

function parseToDecimal(number) {
  return parseInt(number, 2);
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

module.exports = {
  getRandomInt,
  givenFunction,
  sumOfGivenFunction,
  parseToBinary,
  parseToDecimal,
  adaptability,
  getPlan,
  crossover,
  getDecimal,
  mutate
};
