var width = 800,
	height = 600;

var currentX = 0,
	currentY = 0,
	step = 20;

var color_scale = d3.scaleLinear()
	.domain([0, 1])
	.range(['blue', 'red']);
function generate_line() {
			var x0 = currentX,
				y0 = currentY,
				x1, y1;

			var random_value = Math.random()
			if (random_value < 0.25) {
				x1 = currentX + step;
				y1 = currentY + step;
			} else if (random_value < 0.5) {
				x0 = currentX + step;
				x1 = currentX;
				y1 = currentY + step;
			} else if (random_value < 0.75) {
				x0 = currentX;
				x1 = currentX;
				y0 = currentY;
				y1 = currentY + step;
			} else {
				x0 = currentX;
				x1 = currentX + step;
				y0 = currentY + step;
				y1 = currentY + step;
			}

			currentX += step;
			if (currentX > width) {
				currentX = 0;
				currentY += step;
			}
			return `M${x0},${y0}L${x1},${y1}`;
		}
var canvas = d3.select('#canvas')
	.append('svg')
	.attr('width', width)
	.attr('height', height);

function t() {
	canvas.append('path')
		.attr("d", generate_line)
		.attr("stroke", 'black')
		.attr("stroke-width", 2);
};

for (i = 0; i < width*height/(step*(step - 1)); i++)
	t();
function generate() {
	currentX = 0;
	currentY = 0;

	d3.selectAll('path')
		.transition(200)
		.attr('d', generate_line)
		.attr('stroke', color_scale(Math.random()));
}

d3.interval(generate, 500);
function add_step(add) {
	if (add)
		step++;
	else
		step--;
};
