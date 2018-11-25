var canvas_width = 500;
var canvas = d3.select('svg')
		.attr('width', canvas_width)
		.attr('height', canvas_width)
	.append('g');

var cell_number = 10;
var cell_width = canvas_width / cell_number;
var arr = [];
for(var i=-1;++i<cell_number;) {
	for(var j=-1;++j<cell_number;) {
		arr.push({
			x: i,
			y: j,
			r: getRandom255(),
			g: getRandom255(),
			b: getRandom255()
		});
	}
	
}
console.dir(arr);

showCells();
d3.select('#start_button').on('click', start);


function showCells(){
	canvas.selectAll('.cell')
		.data(arr)
		.enter()
		.append('rect')
			.attr('width', cell_width-1)
			.attr('height', cell_width-1)
			.attr('x', function(d){return d.x * cell_width})
			.attr('y', function(d){return d.y * cell_width})
			.attr('fill', function(d){return 'rgb('+d.r+', '+d.g+', '+d.b+')'})
			.attr('class', 'cell')
			.attr('id', function(d){return 'cell'+d.x+'_'+d.y})
	;
}
function getRandom255(){
	return getRabdomByNumber(255)
}
var timer;
function start(){
	d3.select('#start_button').text('pause');
	if(timer) pause();
	timer = setInterval(bakuro, 250);
	d3.select('#start_button').on('click', pause);
}
function pause(){
	clearInterval(timer);
	d3.select('#start_button').text('start');
	d3.select('#start_button').on('click', start);
}
function bakuro(){
	var x = getRabdomByNumber(9);
	var y = getRabdomByNumber(9);
	var target_id = x+'_'+y;
	var r = arr[y*cell_number+x].r, g = arr[y*cell_number+x].g, b = arr[y*cell_number+x].b;

	var neiborlist = [];
	for(var i=-2;++i<2;) {
		if(x+i<0) continue;
		if(x+i>9) break;
		for(var j=-2;++j<2;) {
			if(y+j<0) continue;
			if(y+j>9) break;
			neiborlist.push({x: x+i, y: y+j});
		}
	}
	console.dir(neiborlist);

	neiborlist.map(function(d){
		arr[d.y*cell_number+d.x].r = mixing(arr[d.y*cell_number+d.x].r, r);
		arr[d.y*cell_number+d.x].g = mixing(arr[d.y*cell_number+d.x].g, g);
		arr[d.y*cell_number+d.x].b = mixing(arr[d.y*cell_number+d.x].b, b);
	});

	var selector_str = neiborlist
		.map(function(d){return '#cell'+d.x+'_'+d.y})
		.reduce(function(a,b){return a+' ,'+b});
	canvas.selectAll('.cell')
		.data(arr)
			.attr('fill', function(d){return 'rgb('+d.r+', '+d.g+', '+d.b+')'})
			.attr('class', function(d){
				if(d.x==x&&d.y==y) return 'cell cell_target';
				if(neiborlist.filter(function(e){return e.x==d.x&&e.y==d.y})[0]) return 'cell cell_neigbor';
				return 'cell';
			})
	;
}
function mixing(a, b){
	return Math.round((a + b) / 2)
	//return Math.round(Math.sqrt(a * b))
}
function getRabdomByNumber(number){
	return Math.round(Math.random()*number)
}