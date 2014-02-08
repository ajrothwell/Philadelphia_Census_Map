
function drawLegend() {
			
	var barWidth = 20;
	var barHeight = 8;
	var barSeparation = 8;
	var verticalBarDistance = barHeight + barSeparation;
	var barX = absPos.textBoxX;			
	var firstBarY = 60;
//	var firstBarY = 245;

	var textXOffset = 35;
	var textYOffset = verticalBarDistance / 2;
	var textXPosition = barX + textXOffset;

	// clear any legend already there		
	isvg.selectAll('g').remove();
	
	isvg.append('g')
		.attr('id', 'theLegend')
		.append('text')
		.attr('id', 'legendTitle')
		.attr('class', 'infoBoxTitle')
		.text('Legend')
		.attr("x", barX)
		.attr("y", firstBarY - 15);
		
	isvg.select('#theLegend')
		.selectAll('rect')
		.data(currentDemo.copiedQuantiles)
		.enter()
		.append('rect')
		.attr('id', 'legendBox')
		.attr('class', function(d, i){
			return 'q' + i + '-9_' + currentDemo.theScaletype;
		})
		.attr("x", barX)
		.attr("y", function(d, i) {
			return firstBarY + i * verticalBarDistance;
		})
		.attr("width", function(d) {
			return barWidth;
		})
		.attr("height", function(d) {
			return barHeight;
		})
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)');
				

	isvg.select('#theLegend')
		.append('g')
		.attr('class', 'legendLabels')
		.selectAll('text')
		.data(currentDemo.copiedQuantiles)
		.enter()
		.append("text")
		.text(function(d, i) {
			return d;
//			return i;
		})
		.attr('class', 'infoBoxText')
		.attr('x', textXPosition)
		.attr('y', function(d, i) {
			return firstBarY + i * verticalBarDistance + textYOffset;
		});
			
}


/*
function removeLegend(){

	svg.select('#legendTitle')
		.remove();

	svg.selectAll('#legendBox')
		.remove();

	svg.selectAll('.legendText')
		.remove();		
}
*/