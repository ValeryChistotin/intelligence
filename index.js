const fixValue = value => parseFloat(value.toFixed(2));

const parseToBinary = value => parseFloat(value.toString(2));

const findS = arr => arr.reduce((sum, cur) => (sum += cur));

const findY = (S, w0) => (S >= w0 ? 1 : 0);

const findD = value => (value % 2 === 1 ? 1 : 0);

const findE = () => {};

// const figures = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const figures = [
  '010110010010'
  //     111110100111,
  //     111110001110,
  //     011101111001,
  //     111011001111,
  //     001010111111,
  //     111011010100,
  //     111111101111,
  //     111111001111
];

const aggregation = {
  X: [],
  W: [],
  S: [],
  y: [],
  d: [],
  e: []
};

const w0 = 2.7;

const interimS = [];

figures.forEach(figure => {
  // const currentX = parseToBinary(figure);
  const currentX = figure;
  const currentW = fixValue(1 / 3);

  aggregation.X.push(currentX);
  aggregation.W.push(currentW);

  interimS.push(currentX * currentW);

  const currentS = findS(interimS);

  aggregation.S.push(fixValue(currentS));

  const currentY = findY(currentS, w0);
  const currentD = findD(figure);

  aggregation.y.push(currentY);
  aggregation.d.push(currentD);
  aggregation.e.push(currentY - currentD);

  aggregation.J = Math.min.apply(null, aggregation.W);
});

// console.log(aggregation);

// schema

const training = {
  W: [],
  Y: [],
  w: []
};

const d = [0, 1, 0, 1, 0, 1, 0, 1, 0];

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

let curr = '';

for (let i = 0; i < 12; i += 1) {
  curr += Math.round(Math.random());
}

let Serr;

const iteration = () => {
  Serr = 0;

  trainingFigures.forEach((x, k) => {
    const w = curr;
    const w0 = 4;
    const nu = 1;

    let S;
    let N = 10; // p = 10
    let e;

    S = 0;

    for (let i = 0; i < N; i += 1) {
      S += x[i] * w[i];
    }

    if (S > w0) {
      training.Y.push(1);
    } else {
      training.Y.push(0);
    }

    e = training.Y[k] - d[k];
    Serr += e * e;

    for (let i = 0; i < N; i += 1) {
      training.w[i] -= nu * e * x[i];
    }
  });
};

const Eson = 1;

iteration();

if (Serr > Eson) {
  iteration();
}
