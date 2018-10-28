const getRandomValue = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1));

const trainingExamples = [
  '112122112112',
  '222212121222',
  '121221121222',
  '222122112222',
  '222112222211',
  '122211222222',
  '222211121211'
];

const output = [
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0]
];

const inputSignalsNumber = 12;
const hiddenNeuronsNumber = 6;
const outputNeurounsNumber = 10;
const epochsNumber = 1;
const trainingExamplesNumber = 6;
const trainingSpeed = 0.5;
const activityFunctionParam = 1;
let initWeightCoefficient1Value = [];
let initWeightCoefficient2Value = [];
const errorsNumber = 0;

for (let i = 0; i < 12; i += 1) {
  initWeightCoefficient1Value.push(
    0.2 * getRandomValue(hiddenNeuronsNumber, inputSignalsNumber + 1)
  );
}

for (let i = 0; i < 12; i += 1) {
  initWeightCoefficient2Value.push(
    0.2 * getRandomValue(outputNeurounsNumber, hiddenNeuronsNumber + 1)
  );
}

for (let px = 1; px <= epochsNumber; px += 1) {
  for (let k = 1; k <= trainingExamplesNumber; k += 1) {
    const x1 = trainingExamples[k];
    const d1 = output[k];

    const x = x1;
    const d = d1;

    // first layer

    const u1 = [];

    for (let i = 0; i < x.length; i += 1) {
      u1.push(initWeightCoefficient1Value[i] * x[i]);
    }

    const y1 = [1];

    for (let i = 1; i <= hiddenNeuronsNumber; i += 1) {
      // should be + 1
      y1[i] = 1 / (1 + Math.exp(-activityFunctionParam * u1[i]));
    }

    // second layer

    const v1 = [];

    for (let i = 0; i < y1.length; i += 1) {
      v1.push(initWeightCoefficient2Value[i] * y1[i]);
    }

    const z = [];

    for (let i = 1; i <= hiddenNeuronsNumber; i += 1) {
      // should be outputNeurounsNumber
      z.push(1 / (1 + Math.exp(-activityFunctionParam * v1[i])));
    }

    // back distribution
    // second layer

    const e = [];
    const df2 = [];
    const dw2 = [[], [], [], [], [], []];

    for (let i = 0; i < hiddenNeuronsNumber; i += 1) {
      // should be outputNeurounsNumber
      e.push(d[i] - z[i]);
      df2.push(activityFunctionParam * z[i] * (1 - z[i]));

      for (let j = 0; j < hiddenNeuronsNumber + 1; j += 1) {
        dw2[i][j] = e[i] * df2[i] * y1[j];
      }
    }

    const df1 = [];
    const dw1 = [[], [], [], [], [], []];

    for (let i = 0; i < hiddenNeuronsNumber; i += 1) {
      df1[i] = activityFunctionParam * y1[i + 1];

      let sum = 0;

      for (kl = 0; kl < hiddenNeuronsNumber; kl += 1) {
        sum += e[kl] * df2[kl] * initWeightCoefficient2Value[i + 1];
      }

      for (j = 0; j < inputSignalsNumber; j += 1) {
        dw1[i][j] = df1[i] * x[j] * sum;
      }
    }

    for (let i = 0; i < initWeightCoefficient1Value.length; i += 1) {
      if (dw1[i]) {
        for (let j = 0; j < dw1[i].length; j += 1) {
          initWeightCoefficient1Value[i] += trainingSpeed * dw1[i][j];
        }
      }
    }

    for (let i = 0; i < initWeightCoefficient2Value.length; i += 1) {
      if (dw2[i]) {
        for (let j = 0; j < dw2[i].length; j += 1) {
          initWeightCoefficient2Value[i] += trainingSpeed * dw2[i][j];
        }
      }
    }
  }
}
