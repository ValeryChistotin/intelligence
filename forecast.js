const inputData = window.data;
// const inputData = require('./data.js');
const timeseriesLength = inputData.length;

const rangeA1 = 1;
const rangeB1 = 10;

const pmin = Math.min.apply(null, inputData);
const pmax = Math.max.apply(null, inputData);
const dp = pmax - pmin;

const normalizedArr = [];

for (let i = 0; i < timeseriesLength; i += 1) {
  const res = (inputData[i] - pmin) / dp * (rangeB1 - rangeA1) + rangeA1;
  normalizedArr.push(res);
}

const testSampleLength = 10;
const timeWindowLength = 10;
const trainingExamplesNumber =
  timeseriesLength - testSampleLength - timeWindowLength;
const firstLayersNeuronsNumber = 4;
const epochsNumber = 10000;
const trainingSpeed = 0.004;
const activityFunctionParam = 0.005;

const weightCoefficient1 = [[], [], [], []];

for (let i = 0; i < firstLayersNeuronsNumber; i += 1) {
  for (let j = 0; j < timeWindowLength + 1; j += 1) {
    weightCoefficient1[i][j] = Math.random() - 0.5;
  }
}

const weightCoefficient2 = [];

for (let i = 0; i < firstLayersNeuronsNumber + 1; i += 1) {
  weightCoefficient2[i] = Math.random() - 0.5;
}

for (let k = 0; k < epochsNumber; k += 1) {
  const weightCoefficient1g = [[], [], []];
  const weightCoefficient2g = [[], [], []];

  const dw1 = [[], [], [], []];
  const dw2 = [];

  const x = [];
  let d;
  const z = [];
  let y = 0;
  let e = 0;
  let v;

  const df = [];

  const e2 = [];

  let e1 = 0;

  weightCoefficient1g[0][k] = weightCoefficient1[0][0];
  weightCoefficient1g[1][k] = weightCoefficient1[0][1];
  weightCoefficient1g[2][k] = weightCoefficient1[1][0];

  weightCoefficient2g[0][k] = weightCoefficient2[0];
  weightCoefficient2g[1][k] = weightCoefficient2[1];
  weightCoefficient2g[2][k] = weightCoefficient2[2];

  for (let i = 0; i < firstLayersNeuronsNumber; i += 1) {
    for (let j = 0; j < timeWindowLength + 1; j += 1) {
      dw1[i][j] = 0;
    }
  }

  for (let i = 0; i < firstLayersNeuronsNumber + 1; i += 1) {
    dw2[i] = 0;
  }

  for (let iprim = 0; iprim < trainingExamplesNumber; iprim += 1) {
    v = [0, 0, 0, 0];
    x[0] = 1;

    for (let i = 1; i < timeWindowLength + 1; i += 1) {
      x[i] = normalizedArr[iprim + i - 1];
    }

    d = normalizedArr[iprim + timeWindowLength];

    // TODO
    for (let i = 0; i < weightCoefficient1.length; i += 1) {
      for (let j = 0; j < weightCoefficient1[i].length; j += 1) {
        v[i] += weightCoefficient1[i][j] * x[i];
      }
    }

    z[0] = 1;

    for (let j = 1; j < firstLayersNeuronsNumber + 1; j += 1) {
      z[j] = 1 / (1 + Math.exp(-activityFunctionParam * v[j - 1]));
    }

    for (let i = 0; i < z.length; i += 1) {
      y += z[i] * weightCoefficient2[i];
    }

    e = d - y;

    e1 += e * e;

    // // TODO
    for (let i = 0; i < dw2.length; i += 1) {
      dw2[i] += e * z[i];
    }

    for (let j = 0; j < firstLayersNeuronsNumber; j += 1) {
      df[j] =
        activityFunctionParam *
        z[j + 1] *
        (1 - z[j + 1]) *
        weightCoefficient2[j + 1];

      for (let m1 = 0; m1 < timeWindowLength + 1; m1 += 1) {
        dw1[j][m1] += e * df[j] * x[m1];
      }
    }

    for (let i = 0; i < firstLayersNeuronsNumber; i += 1) {
      for (let j = 0; j < timeWindowLength + 1; j += 1) {
        weightCoefficient1[i][j] += trainingSpeed * dw1[i][j];
      }
    }

    for (let i = 1; i < firstLayersNeuronsNumber + 1; i += 1) {
      weightCoefficient2[i] += trainingSpeed * dw2[i];
    }
  }

  for (let i = 0; i < e1.length; i += 1) {
    e2[k] = e1[i] / trainingExamplesNumber;
  }
}

let n1 = inputData.length - timeWindowLength;
let mape = 0;
let z = [];
let x = [];
let xp = [];

for (let iprim = 0; iprim < n1; iprim++) {
  x = [1];
  let v = [0, 0, 0, 0];
  let y = 0;

  for (let j = 1; j < timeWindowLength + 1; j++) {
    x[j] = normalizedArr[j + iprim - 1];
  }

  for (let i = 0; i < weightCoefficient1.length; i += 1) {
    for (let j = 0; j < weightCoefficient1[i].length; j += 1) {
      v[i] += weightCoefficient1[i][j] * x[i];
    }
  }

  z[0] = 1;

  for (let j = 1; j < firstLayersNeuronsNumber + 1; j += 1) {
    z[j] = 1 / (1 + Math.exp(-activityFunctionParam * v[j - 1]));
  }

  for (let i = 0; i < z.length; i += 1) {
    y += z[i] * weightCoefficient2[i];
  }

  xp[iprim + timeWindowLength] =
    (y - rangeA1) * dp / (rangeB1 - rangeA1) + pmin;
}

for (let i = 1 + timeWindowLength; i < trainingExamplesNumber; i++) {
  mape += Math.abs((inputData[i] - xp[i]) / inputData[i]);
}

let totalMape =
  100 * mape / (inputData.length - timeWindowLength - testSampleLength);

window.xp = xp;

console.log('w1 ======', weightCoefficient1);
console.log('\n w2 ======', weightCoefficient2);
console.log('\n answer ======', xp);
console.log('\n ошибка обучения ======', totalMape);
