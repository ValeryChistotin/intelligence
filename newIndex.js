const epoxCount = 10000;

let weightCoeffs = [];
let weightLimits = [2, 2, 2, 2, 2];
let weightCoeff2 = [];
let errorSumm = 0;

const speedTraining = 1;
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

for (let j = 0; j < 5; j++) {
    let weightCoeff = [];

    for (let i = 0; i < 12; i += 1) {
        weightCoeff.push(Math.round(Math.random()));
    }

    weightCoeffs.push(weightCoeff);
}

for (let i = 0; i < 5; i += 1) {
    weightCoeff2.push(Math.round(Math.random()));
}

const iteration = () => {

    trainingFigures.forEach((inputSignal, index) => {
        //прямой ход

        let bitSumm = [0, 0, 0, 0, 0];
        let answers = [];

        for (let w = 0; w < 5; w++) {
            for (let i = 0; i < 12; i += 1) {
                bitSumm[w] += inputSignal[i] * weightCoeffs[w][i];
            }

            answers[w] = 1 / (1 + Math.exp(-bitSumm[w]));
        }

        // конец первого слоя 

        let bitSumm2 = 0;
        let answer2;

        for (let i = 0; i < 5; i += 1) {
            bitSumm2 += answers[i] * weightCoeff2[i];
        }

        answer2 = 1 / (1 + Math.exp(-bitSumm2));

        //конец второго слоя
        //обратное распространение 2 слой

        let isCorrect = correctAnswer[index] - answer2;
        let df2 = answer2 * (1 - answer2);
        let dw2 = [];

        for (let i = 0; i < 5; i += 1) {
            dw2[i] = df2 * isCorrect * answers[i];
        }

        //первый слой

        let df1 = [];
        let dw1 = [[],[],[],[],[]];

        for (let w = 0; w < 5; w++) {
            df1[w] = answers[w] * (1 - answers[w]);
            errorSumm += isCorrect * df2 * weightCoeff2[w];

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

        for (let j = 0; j < 5; j += 1) {
            weightCoeff2[j] += speedTraining * dw2[j];
        }
    });
}

const train = () => {
    for (let i = 0; i < epoxCount; i++) {
        iteration();
    }
}

function checkEven(numberToCheck) {
    let signal = numberToCheck;

    let bitSumm = [0, 0, 0, 0, 0];
    let answers = [];

    for (let w = 0; w < 5; w++) {
        for (let i = 0; i < 12; i += 1) {
            bitSumm[w] += signal[i] * weightCoeffs[w][i];
        }

        answers[w] = 1 / (1 + Math.exp(-bitSumm));
    }

    let bitSumm2 = 0;
    let answer2;

    for (let i = 0; i < 5; i += 1) {
        bitSumm2 += answers[i] * weightCoeff2[i];
    }

    if (bitSumm2 > 1) {
        answer2 = 1;
    } else {
        answer2 = 0;
    }

    return answer2;
}

window.checkEven = checkEven;