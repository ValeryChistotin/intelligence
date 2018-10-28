const obj = {
  trainingFigures: []
};

let weightCoeff = [];
let weightCoeff2 = 1;
let weightLimit = 2;
let weightLimit2 = 2;
const speedTraining = 5;

for (let i = 0; i < 12; i += 1) {
  weightCoeff.push(Math.round(Math.random()));
}

const train = () => {
  const correctAnswer = [0, 1, 0, 0, 0, 1, 0, 1, 1, 0];

  const trainingFigures = [
    '001011001001',
    '111101010111',
    '010110010111',
    '111011001111',
    '111001111100',
    '011100111111',
    '111100010100',
    '101111001001',
    '111010100111',
    '010101101010'
  ];

  //console.log(weightCoeff);

  let errorSumm;

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

      answer = 1/(1+Math.exp(-bitSumm));

      isCorrect = answer - correctAnswer[index];
      errorSumm += isCorrect * isCorrect;
      // console.log('error sum- ', errorSumm);

      for (let i = 0; i < 12; i += 1) {
        weightCoeff[i] -= speedTraining * isCorrect * inputSignal[i];
      }
       //console.log(weightCoeff);

      weightLimit += speedTraining * answer;
      // console.log('weight limit - ', weightLimit, '\n');
      iteration2(answer, correctAnswer[index]);
    });
  };

  const iteration2 = (inputSignal, correctAnswer) => {

    let bitSumm;
    let isCorrect;
    let answer;

    bitSumm = 0;

    //  console.log('input signal - ', inputSignal);
    bitSumm += inputSignal * weightCoeff2;

    // console.log('bit summ - ', bitSumm);

    answer = 1/(1+Math.exp(-bitSumm));

    isCorrect = answer - correctAnswer;
    errorSumm += isCorrect * isCorrect;
    // console.log('error sum- ', errorSumm);

    weightCoeff2 -= speedTraining * isCorrect * inputSignal;
    // console.log(weightCoeff);

    weightLimit2 += speedTraining * answer;
  };

  const extendsErrorCount = 1;

  iteration();

 for(let i = 0; i < 10000; i++){
    // console.log(weightCoeff);
    iteration();
  }

  console.log('обучение завершено');
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

  answer = 1/(1+Math.exp(-bitSumm));

  let signal2 = answer;

  let bitSumm2 = 0;
  let answer2;
  bitSumm2 += signal2 * weightCoeff2;

  if(bitSumm2 > 1){
    answer2 = 1;
  } else {
    answer2 = 0;
  }
  
  console.log('bit summ - ', bitSumm2);
  console.log('w coef - ', weightCoeff2);
  console.log('w lim - ', weightLimit2);
  

  return answer2;
}

// const testingFigures = [

window.checkEven = checkEven;
