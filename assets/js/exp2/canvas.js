'use strict';
function randomN(min, max) {
    return Math.random() * (max - min) + min;
}
var MIN = 5, MAX = 20

d3.json("/blog/assets/js/exp2/data.json", (data) => {
    console.log(data)
    var yScale = d3.scaleLinear()
        .domain([d3.min(data['y']), d3.max(data['y'])])
        .range([600, 20])

    var xScale = d3.scaleLinear()
        .domain([d3.min(data['y']), d3.max(data['y'])])
        .range([20, 600])

    var colorScale = d3.interpolateViridis;

    var canvas = d3.select(".canvas")
        .append("svg")
        .attr("width", d3.max(data['x'])*1.1)
        .attr("height", 620);

    var currentCS = 0
    canvas.on('click', () => {
        let colorScales = [d3.interpolateViridis, d3.interpolateMagma, d3.interpolateCubehelixDefault, d3.interpolateRainbow];
        currentCS = (currentCS + 1 ) %  colorScales.length;
        console.log(currentCS);
        colorScale = colorScales[currentCS];
    })

    for (let i = 0; i < data['x'].length; i++) {
        canvas.append("circle")
            .attr("cx", xScale(data['x'][i]))
            .attr("cy", yScale(data['y'][i]))
            .attr("fill", colorScale(Math.random()))
            .attr("opacity", 0.7)
            .attr('r', randomN(MIN, MAX));
    }

    d3.selectAll("circle").transition()
        .delay(800)
        .ease(d3.easeLinear)
        .on("start", function repeat() {
            d3.active(this)
                .transition()
                .attr("r", function() {return randomN(MIN, MAX);})
                .attr("fill", colorScale(Math.random()))

                .duration(2000)
                //.delay(800)
                .on('start', repeat)
        })

});
