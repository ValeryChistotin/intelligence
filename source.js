const fn = window.checkEven;

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

const container = document.getElementById('container');

renderValues.forEach(value => {
  container.appendChild(value);
});

const button = document.getElementById('calculate');

button.addEventListener('click', function() {
  const checkboxes = document.getElementsByTagName('input');

  let signal = '';

  Array.from(checkboxes).forEach(checkbox => {
    signal += +checkbox.checked;
  });

  const signalElement = document.getElementById('signal');
  signalElement.textContent = `Number is ${fn(signal) ? 'even' : 'odd'}`;
});
