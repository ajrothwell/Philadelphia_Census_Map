
function drawGraph(a) {
	
	for (i=0; i<demoNames.length; i++){
		demoVals[i] = d3.select(a).attr(demoNames[i]);
	}
			
	var barWidth = 22;
	var barSeparation = 15;
	var horizontalBarDistance = barWidth + barSeparation;
	var barX = absPos.textBoxX;			
	var firstBarY = 20;

	var textYPosition = firstBarY + 120;

	gsvg.append('g')
		.attr('id', 'theGraph')
		.append('text')
		.attr('id', 'graphTitle')
		.attr('class', 'infoBoxTitle')
		.text('All Races')
		.attr("x", barX)
		.attr("y", 20);
		
	gsvg.select('#theGraph')
		.selectAll('rect')
		.data(demoNames)
		.enter()
		.append('rect')
		.attr('class', 'graphBar')
		.attr("x", function(d, i) {
			return barX + i * horizontalBarDistance;
		})
		.attr("y", function(d, i) {
			return firstBarY + 105 - demoVals[i];
		})
		//.attr("y", firstBarY)
		.attr("width", function(d) {
			return barWidth;
		})
		.attr("height", function(d, i) {
			return demoVals[i];
		});
		//.attr('stroke-width', 1.5)
		//.attr('stroke', 'rgb(0,0,0)');
				

	gsvg.select('#theGraph')
		.append('g')
		.attr('class', 'graphLabels')
		.selectAll('text')
		.data(demoNames)
		.enter()
		.append("text")
		.text(function(d, i) {
			return d;
		})
		.attr('class', 'infoBoxText')
		.attr("x", function(d, i) {
			return barX + i * horizontalBarDistance - 4;
		})
		.attr('y', textYPosition);
}
