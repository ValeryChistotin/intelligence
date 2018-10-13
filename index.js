const obj = {
  trainingFigures: []
};

let weightCoeff = [];
let weightCoeff2;
let weightLimit = 2;
let weightLimit2 = 2;
const speedTraining = 1;

for (let i = 0; i < 12; i += 1) {
  weightCoeff.push(Math.round(Math.random()));
}

const train = () => {
  const correctAnswer = [0, 0, 1, 0, 1, 0, 1, 0, 1, 0];

  const trainingFigures = [
    '010101101010',
    '010110010010',
    '111110100111',
    '111110001110',
    '011101111001',
    '111110001110',
    '001010111111',
    '111011010100',
    '111111101111',
    '111111010100'
  ];

  //console.log(weightCoeff);

  let errorSumm;
  let errorSumm2;

  const iteration = () => {
    errorSumm = 0;

    trainingFigures.forEach((inputSignal, index) => {
      let bitSumm;
      let isCorrect;
      let answer;

      bitSumm = 0;

      //  console.log('input signal - ', inputSignal);
      for (let i = 0; i < 12; i += 1) {
        bitSumm += inputSignal[i] * weightCoeff[i];
      }
      // console.log('bit summ - ', bitSumm);

      if (bitSumm > weightLimit) {
        answer = 1;
      } else {
        answer = 0;
      }

      isCorrect = answer - correctAnswer[index];
      errorSumm += isCorrect * isCorrect;
      // console.log('error sum- ', errorSumm);

      for (let i = 0; i < 12; i += 1) {
        weightCoeff[i] -= speedTraining * isCorrect * inputSignal[i];
      }
      // console.log(weightCoeff);

      weightLimit += speedTraining * answer;
      // console.log('weight limit - ', weightLimit, '\n');
      iteration2(answer, correctAnswer[index]);
    });
  };

  const iteration2 = (inputSignal, correctAnswer) => {
      errorSumm2 = 0;

      let bitSumm;
      let isCorrect;
      let answer;

      bitSumm = 0;

      //  console.log('input signal - ', inputSignal);
      bitSumm += inputSignal * weightCoeff2;

      // console.log('bit summ - ', bitSumm);

      if (bitSumm > weightLimit2) {
        answer = 1;
      } else {
        answer = 0;
      }

      isCorrect = answer - correctAnswer;
      errorSumm2 += isCorrect * isCorrect;
      // console.log('error sum- ', errorSumm);

        weightCoeff2 -= speedTraining * isCorrect * inputSignal;
      // console.log(weightCoeff);

      weightLimit2 += speedTraining * answer;
  };

  const extendsErrorCount = 0;

  iteration();

  while (errorSumm > extendsErrorCount) {
    // console.log(weightCoeff);
    iteration();
  }

  console.log('обучение завершено');
  console.log(weightCoeff);
  console.log(weightCoeff2);
};

function checkEven(numberToCheck) {
  // let signal = trainingFigures[numberToCheck];
  let signal = numberToCheck;

  let bitSumm = 0;
  let answer;

  for (let i = 0; i < 12; i += 1) {
    bitSumm += signal[i] * weightCoeff[i];
  }
  //console.log('bit summ - ', bitSumm);

  if (bitSumm > weightLimit) {
    answer = 1;
  } else {
    answer = 0;
  }

  return answer;
}

// const testingFigures = [

window.checkEven = checkEven;
