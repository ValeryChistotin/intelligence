function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function givenFunction(x){
    return -(x*x) + 40 * x + 300;
}

function sumOfGivenFunction(argsArr){
    return argsArr.reduce((accumulator, currentX) => {
        return accumulator + givenFunction(currentX);
    });
}

function parseToBinary(number){
    return number.toString(2);
}

function parseToDecimal(number){
    return +number;
}

function adaptability(x, sum){
    return givenFunction(x)/sum
}

function getPlan(x, sum){
    return adaptability(x, sum) * 4;
}

function crossover (firstNum, secondNum, breakPoint){
    firstNumFPath = firstNum.split('').slice(0, breakPoint);
    firstNumSPath = firstNum.split('').slice(breakPoint);
    secondNumFPath = secondNum.split('').slice(0, breakPoint);
    secondNumSPath = secondNum.split('').slice(breakPoint);
    return {
        firstNum : firstNumFPath.join('') + secondNumSPath.join(''),
        secondNum : secondNumFPath.join('') + firstNumSPath.join('')
    }
}
