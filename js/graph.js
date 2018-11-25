const getSourceData = () =>
  resultData.map(arr =>
    arr.map(item => ({
      x: item[0],
      y: item[1]
    }))
  );

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';

  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getDatasets = () =>
  getSourceData().map((item, index) => ({
    label: `Cluster ${index + 1}`,
    data: item,
    backgroundColor: getRandomColor()
  }));

const ctx = document.getElementById('myChart').getContext('2d');
const scatterChart = new Chart(ctx, {
  type: 'bubble',
  data: {
    datasets: getDatasets()
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom'
        }
      ]
    }
  }
});
