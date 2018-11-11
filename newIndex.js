const epoxCount = 10000;

let weightCoeffs = [];
let weightLimits = [2, 2, 2, 2, 2];
let weightCoeff2 = [];
let actParam = 0.5;


const speedTraining = 1;
const correctAnswer = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0];

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

for (let j = 0; j < 5; j++) {
    let weightCoeff = [];

    for (let i = 0; i < 12 + 1; i += 1) {
        weightCoeff.push(Math.round(Math.random()));
    }

    weightCoeffs.push(weightCoeff);
}

for (let i = 0; i < 6; i += 1) {
    weightCoeff2.push(Math.round(Math.random()));
}

const iteration = () => {

    trainingFigures.forEach((inputSignal, index) => {
        //прямой ход

        let bitSumm = [0, 0, 0, 0, 0];
        let answers = [1];
        let errorSumm = 0;

        for (let w = 0; w < 5; w++) {
            for (let i = 0; i < 12; i += 1) {
                bitSumm[w] += inputSignal[i] * weightCoeffs[w][i];
            }

            answers[w + 1] = 1 / (1 + Math.exp(- actParam * bitSumm[w]));
        }

        // конец первого слоя 

        let bitSumm2 = 0;
        let answer2;

        for (let i = 0; i < 5 + 1; i += 1) {
            bitSumm2 += answers[i] * weightCoeff2[i];
        }

        answer2 = 1 / (1 + Math.exp(- actParam * bitSumm2));

        //конец второго слоя
        //обратное распространение 2 слой

        let isCorrect = correctAnswer[index] - answer2;
        let df2 = actParam * answer2 * (1 - answer2);
        let dw2 = [];

        for (let i = 0; i < 5 + 1; i += 1) {
            dw2[i] = df2 * isCorrect * answers[i];
        }

        //первый слой

        let df1 = [];
        let dw1 = [[], [], [], [], []];

        for (let w = 0; w < 5; w++) {
            df1[w] = actParam * answers[w + 1] * (1 - answers[w + 1]);
            errorSumm += isCorrect * df2 * weightCoeff2[w + 1];

            for (let i = 0; i < 12; i++) {
                dw1[w][i] = df1[w] * inputSignal[i] * errorSumm;
            }
        }

        //коррекция весовых коэффицентов

        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < 12; j += 1) {
                weightCoeffs[i][j] += speedTraining * dw1[i][j];
            }
        }

        for (let j = 0; j < 5 + 1; j += 1) {
            weightCoeff2[j] += speedTraining * dw2[j];
        }
    });
}

const train = () => {
    for (let i = 0; i < epoxCount; i++) {
        iteration();
    }

    console.log(weightCoeffs);
    console.log(weightCoeff2);
}

function checkEven (numberToCheck) {
    let signal = numberToCheck;

    let bitSumm = [0, 0, 0, 0, 0];
    let answers = [1];

    for (let w = 0; w < 5; w++) {
        for (let i = 0; i < 12; i += 1) {
            bitSumm[w] += signal[i] * weightCoeffs[w][i];
        }

        answers[w + 1] = 1 / (1 + Math.exp(- actParam * bitSumm[w]));
    }

    let bitSumm2 = 0;
    let answer2;

    for (let i = 0; i < 5 + 1; i += 1) {
        bitSumm2 += answers[i] * weightCoeff2[i];
    }

    console.log(bitSumm);
    console.log(answers);
    console.log('bit summ 2 === ', bitSumm2);


    answer2 = 1 / (1 + Math.exp(- actParam * bitSumm2));
    answer2 = answer2;
    console.log('ans2 - ', answer2);
    return Math.round(answer2);
}

window.checkEven = checkEven;