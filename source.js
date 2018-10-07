const fn = window.checkEven;

const modeList = ['Обучение', 'Тестирование', 'Проверка'];

modeList.forEach((mode, index) => {
  const valuesList = [1, 2, 3, 11, 12, 4, 10, 9, 5, 8, 7, 6];

  const renderValues = valuesList.map(item => {
    const input = document.createElement('input');

    input.value = item;
    input.name = item;
    input.type = 'checkbox';
    input.id = item;
    input.className = 'input-txt' + ' ' + index;

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
    const checkboxes = document.getElementsByClassName('input-txt ' + index);

    let signal = '';

    Array.from(checkboxes).forEach(checkbox => {
      signal += +checkbox.checked;
    });

    const signalElement = document.getElementsByClassName('signal')[index];

    signalElement.textContent = `Цифра ${fn(signal) ? 'четная' : 'нечетная'}`;
  });

  const buttonClear = document.getElementsByClassName('clear')[index];

  buttonClear.addEventListener('click', function() {
    const checkboxes = document.getElementsByClassName('input-txt ' + index);

    Array.from(checkboxes).forEach(checkbox => {
      checkbox.checked = false;
    });
  });
});
