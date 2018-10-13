const fn = window.checkEven;

const modeList = ['Обучение', 'Тестирование', 'Проверка'];

const buttonTrain = document.getElementsByClassName('train')[0];

buttonTrain.addEventListener('click', function() {
  train();
});

modeList.forEach((mode, index) => {
  const valuesList = [1, 2, 3, 11, 12, 4, 10, 9, 5, 8, 7, 6];

  const renderValues = valuesList.map(item => {
    const input = document.createElement('input');

    input.value = item;
    input.name = item;
    input.type = 'checkbox';
    input.id = item;
    input.className = 'input-txt';

    return input;
  });

  const modeElement = document.getElementsByClassName('mode')[index];

  modeElement.textContent = mode;

  const container = document.getElementsByClassName('container')[index];

  renderValues.forEach(value => {
    container.appendChild(value);
  });

  const button = document.getElementsByClassName('calculate')[index];

  button.addEventListener('click', function() {
    const checkboxes = document.getElementsByClassName('input-txt');

    let signal = '';

    Array.from(checkboxes).forEach(checkbox => {
      signal += +checkbox.checked;
    });

    const signalElement = document.getElementsByClassName('signal')[index];

    signalElement.textContent = `Цифра ${fn(signal) ? 'четная' : 'нечетная'}`;
  });

  const buttonClear = document.getElementsByClassName('clear')[index];

  buttonClear.addEventListener('click', function() {
    const checkboxes = document.getElementsByClassName('input-txt');

    Array.from(checkboxes).forEach(checkbox => {
      checkbox.checked = false;
    });
  });

  const buttonTest = document.getElementsByClassName('test')[index];

  const testingFigures = [
    '001011001001',
    '111101010111',
    '010110010111',
    '111011001111',
    '111001111100',
    '011100111111',
    '111100010100',
    '101111001001',
    '111010100111'
  ];

  const rightFigures = [1, 8, 1, 9, 7, 6, 5, 4, 2];

  const testingCorrectAnswer = [0, 1, 0, 0, 0, 1, 0, 1, 1];

  buttonTest.addEventListener('click', function() {
    let errorsCount = 0;

    testingFigures.forEach((testingFigure, index) => {
      const answer = checkEven(testingFigure);

      if (answer !== testingCorrectAnswer[index]) {
        console.log('Ошибка');
        errorsCount += 1;
      }

      console.log(
        `Цифра ${rightFigures[index]} ${answer ? 'четная' : 'нечетная'}`
      );
    });

    console.log('===============================');
    console.log(`Ошибок допущено: ${errorsCount}`);
    console.log(
      `Процент ошибок: ${parseFloat(
        (errorsCount * 100 / testingFigures.length).toFixed(2)
      )} %`
    );
  });
});
