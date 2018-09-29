const training = {
  W: [],
  Y: [],
  w: []
};

const correctAnswer = [0, 1, 0, 1, 0, 1, 0, 1, 0];

const trainingFigures = [
  '010110010010',
  '111110100111',
  '111110001110',
  '011101111001',
  '111011001111',
  '001010111111',
  '111011010100',
  '111111101111',
  '111111001111'
];

let weightCoeff = '';

for (let i = 0; i < 12; i += 1) {
  weightCoeff += Math.round(Math.random());
}
console.log(weightCoeff);

let errorSumm;

const iteration = () => {
  errorSumm = 0;

  trainingFigures.forEach((inputSignal, index) => {
    const weightLimit = 2;
    const speedTraining = 1;

    let bitSumm;
    let isCorrect;
    let answer;

    bitSumm = 0;

    for (let i = 0; i < 10; i += 1) {
      bitSumm += inputSignal[i] * weightCoeff[i];
    }

    if (bitSumm > weightLimit) {
      answer = 1;
    } else {
      answer = 0;
    }

    isCorrect = answer - correctAnswer[index];
    errorSumm += isCorrect;

    for (let i = 0; i < 10; i += 1) {
      weightCoeff[i] -= speedTraining * isCorrect * inputSignal[i];
      console.log(weightCoeff);
    }
  });
};

const extendsErrorCount = 4;

iteration();

/* while (errorSumm > extendsErrorCount) {
  console.log(weightCoeff);
  iteration();
} */

console.log(weightCoeff);
