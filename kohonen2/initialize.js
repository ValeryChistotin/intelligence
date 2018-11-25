/*  brunch watch --server  */

import Kohonen, {hexagonHelper} from 'kohonen';

console.clear();

var d3 = require('d3');


var data = d3.range(500)
.map(function(){
   return [256 * Math.random(),256 * Math.random(),256 * Math.random()]
      .map(Math.floor);
});

function go() {


var grid = 12, width = 960, height= 500, r = height / grid;

// you can use the grid helper to generate a grid with 10x10 hexagons
const k = new Kohonen({data, neurons: hexagonHelper.generateGrid(grid,grid), maxStep: 500});


  var svg = d3
  .select('#app')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

  var neurons = svg.append('g')
  .selectAll('circle')
  .data(k.neurons);
  
  neurons = neurons.merge(neurons
  .enter()
  .append('circle')
  .attr('r', r/2+1)
  .attr('transform', function(d) {
      return 'translate(' + [ d.pos[0]*r, d.pos[1]*r ] + ')';
   }));

  neurons
 .attr('fill', function(d) {
      return d3.rgb(d.v[0]*256, d.v[1]*256, d.v[2]*256)
  })
  .attr('fill-opacity', 0.1)
  ;

  svg.data = svg.append('g')
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 3.5)
  .attr('stroke', 'white')
  .attr('fill', function(d,i) {
      d.v = data[i].map(function(d) { return d/256; });
      return d3.rgb(d.v[0]*256, d.v[1]*256, d.v[2]*256)
  })
  .attr('transform', function(d, i) {
      var a = 2 * Math.PI * Math.random(), r = Math.random() * Math.random() * height /2;
      return 'translate(' + [ height / 2 + Math.cos(a) * r, height / 2 +Math.sin(a) * r ] + ')';
  })


setTimeout(function() {
k.training(); 

  neurons
  .data(k.neurons)
  .transition()
  .duration(4000)
  .attr('fill', function(d) {
      return d3.rgb(d.v[0]*256, d.v[1]*256, d.v[2]*256)
  })
  .attr('fill-opacity', 1)
  ;

  svg.data
  .data(k.mapping())
  .transition()
  .duration(4000)
  .attr('transform', function(d,i) {
      d.pos = [ d[0] + 0.3*Math.cos(i*45)*Math.sqrt(Math.random()), d[1] + 0.3*Math.sin(i*45)*Math.sqrt(Math.random()) ]; 
      return 'translate(' + [ d.pos[0]*r, d.pos[1]*r ] + ')';
   });

}, 1000);

}

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
 // console.clear();
  console.log('Initialized app');

  go();

});