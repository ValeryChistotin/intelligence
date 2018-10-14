const totalEpochs = 5;
const totalExamples = 2;

const m0 = 2;

const x = 2;
const y = 2;

const derivative = f => {
  const h = 0.001;

  return x => (f(x + h) - f(x - h)) / (2 * h);
};

for (let epoch = 0; epoch < totalEpochs; epoch += 1) {
  for (let example = 0; example < totalExamples; example += 1) {
    const signal1 = x * m0; // of example
    const answer1 = y * m0; // of example

    const signal = derivative(signal1);
    const answer = derivative(answer1);
  }
}
