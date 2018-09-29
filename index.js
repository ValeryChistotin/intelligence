const training = {
  W: [],
  Y: [],
  w: []
};

const correctAnswer = [0, 1, 0, 1, 0, 1, 0, 1, 0];

const trainingFigures = [
  '010110010010', //1
  '111110100111', //2
  '111110001110', //3
  '011101111001', //4
  '111011001111', //5
  '001010111111', //6
  '111011010100', //7
  '111111101111', //8
  '111111001111' //9
];

let weightCoeff = [];

for (let i = 0; i < 12; i += 1) {
  weightCoeff.push(Math.round(Math.random()));
}
console.log(weightCoeff);

let errorSumm;
let weightLimit = 2;
const speedTraining = 1;

const iteration = () => {
  errorSumm = 0;

  trainingFigures.forEach((inputSignal, index) => {
    let bitSumm = 0;
    let isCorrect = 0;
    let answer;

    console.log('input signal - ', inputSignal);
    for (let i = 0; i < 12; i += 1) {
      bitSumm += inputSignal[i] * weightCoeff[i];
    }
    console.log('bit summ - ', bitSumm);

    if (bitSumm > weightLimit) {
      answer = 1;
    } else {
      answer = 0;
    }
    console.log('answer - ', answer, ' correct - ', correctAnswer[index]);

    isCorrect = answer - correctAnswer[index];
    errorSumm += isCorrect * isCorrect;
    console.log('error sum- ', errorSumm);

    for (let i = 0; i < 12; i += 1) {
      weightCoeff[i] -= speedTraining * isCorrect * inputSignal[i];
    }
    console.log(weightCoeff);

    weightLimit += speedTraining * answer;
    console.log('weight limit - ', weightLimit, '\n');
  });
};

const extendsErrorCount = 0;

iteration();

while (errorSumm > extendsErrorCount) {
  console.log(weightCoeff);
  iteration();
}

console.log(weightCoeff);

let signal = '111111101111';
let bitSumm = 0;
let answer;

for (let i = 0; i < 10; i += 1) {
  bitSumm += signal[i] * weightCoeff[i];
}
console.log('bit summ - ', bitSumm);

if (bitSumm > weightLimit) {
  answer = 1;
} else {
  answer = 0;
}

console.log('answer - ', answer);
