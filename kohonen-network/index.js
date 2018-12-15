let objects = [];
let weightCoeffs = [];
let speedTraining = 1;
let objectCount = 15;
let epoxCount = 100;
let klasters = [[], [], [], []];

function concur (x1, x2, w1, w2) {
  return Math.sqrt(Math.pow(w1 - x1, 2) + Math.pow(w2 - x2, 2));
}

function correct (x, w) {
  weightCoeffs[w][0] = weightCoeffs[w][0] + speedTraining * (objects[x][0] - weightCoeffs[w][0]);
  weightCoeffs[w][1] = weightCoeffs[w][1] + speedTraining * (objects[x][1] - weightCoeffs[w][1]);
}

for (let i = 0; i < objectCount; i += 1) {
  let obj = [Math.random(), Math.random()];
  objects.push(obj);
}

for (let i = 0; i < 4; i += 1) {
  let w = [Math.random(), Math.random()];
  weightCoeffs.push(w);
}

for (let k = 0; k < epoxCount; k++) {
  for (let i = 0; i < objects.length; i++) {
    let concurArr = [];
    for (let j; j < weightCoeffs.length; j++) {
      concurArr[j] = concur(objects[i][0], objects[i][1], weightCoeffs[j][0], weightCoeffs[j][1]);
    }

    let minIndex = concurArr.reduce((accum, item, index, array) => {
      return array[index] < array[accum] ? index : accum
    }, 0);

    correct(i, minIndex);
  }
}

let klastersIndex = [];

for (let i = 0; i < objects.length; i++) {
  let s = [];

  for (let j = 0; j < 4; j++) {
    s[j] = Math.sqrt(Math.pow(weightCoeffs[j][0] - objects[i][0], 2) + Math.pow(weightCoeffs[j][1] - objects[i][1], 2));
  }

  let minIndex = 0;
  let minVal = s[minIndex];
  for (let j = 0; j < 4; j++) {
    if (minVal > s[j]) {
      minVal = s[j];
      minIndex = j;
    }
  }
  klastersIndex[i] = minIndex;
}

for (let i = 0; i < objects.length; i++) {
  for (let j = 0; j < 4; j++) {

    if (klastersIndex[i] === j) {
      klasters[j].push([objects[i][0], objects[i][1]]);
    }
  }
}

console.log('1 klaster: \n', klasters[0]);
console.log('2 klaster: \n', klasters[1]);
console.log('3 klaster: \n', klasters[2]);
console.log('4 klaster: \n', klasters[3]);
