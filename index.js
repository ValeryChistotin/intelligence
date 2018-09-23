const fixValue = value => parseFloat(value.toFixed(2));

const parseToBinary = value => parseFloat(value.toString(2));

const findS = arr => arr.reduce((sum, cur) => (sum += cur));

const findY = (S, w0) => (S >= w0 ? 1 : 0);

const findD = value => (value % 2 === 1 ? 1 : 0);

const findE = () => {};

const figures = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  const currentX = parseToBinary(figure);
  const currentW = fixValue(1 / figure);

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
});

console.log(aggregation);
