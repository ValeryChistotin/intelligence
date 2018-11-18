const xpPlusFive = xp.map(item => item + 5);

const labels = inputData.map((item, index) => `Day ${index}`);

const shift = 10;
const shiftArr = new Array(shift).fill(0);

const res = [...shiftArr, ...inputData];

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Исходные данные',
        borderColor: 'rgb(255, 99, 132)',
        data: inputData
      },
      {
        label: 'Результат',
        borderColor: 'green',
        data: res
      }
    ]
  },
  options: {}
});
