
addTB = function(){
	// this puts in the universe name and demographic in advance
	svg.append('g')
		.attr('id', 'theTextG')
		.append('text')
		.attr('id', 'universeName')
		.attr('class', 'universe_name_label')
		.attr('y', textPos.MapNameHeight)
		.attr('x', textPos.x)
		.attr("text-anchor", "left")
		.text('Philadelphia');
	svg.select('#theTextG')
		.append('text')
		.attr('id', 'demoNameText')
		.attr('class', 'demoNameText')
		.text(currentDemo.theName)
		.attr('y', textPos.demoNameHeight)
		.attr('x', textPos.x)
		.attr("text-anchor", "left");
};

addSwitchToHRButton = function(){
	svg.append('g')
		.attr('id', 'switchToHRButton')
		.attr('class', 'switchButton')
		.on('click', switchToHRMode)
		.append('rect')
		.attr("x", 630)
		.attr("y", 360)
		.attr("width", 175)
		.attr("height", 25)
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(220,220,220)');
	svg.select('#switchToHRButton')
		.append('text')
		.attr('class', 'switchButtonText')
		.attr("x", 648)
		.attr("y", 377)
		.text('Click to Show Blocks');
};

switchToHRMode = function(){
	svg.append('g')
		.attr('id', 'pleaseWaitBox')
		.attr('class', 'pleaseWaitBox')
		.append('rect')
		.attr('x', 520)
		.attr('y', 150)
		.attr("width", 150)
		.attr("height", 50)
		.attr('stroke-width', 2)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(255,255,51)');
	svg.select('#pleaseWaitBox')
		.append('text')
		.attr('class', 'pleaseWaitButtonText')
		.attr("x", 525)
		.attr("y", 183)
		.text('Please Wait');
	viewRes.mode = 'HR';
	setTimeout(initMap, 100);
};

addSwitchToLRButton = function(){
	svg.append('g')
		.attr('id', 'switchToLRButton')
		.attr('class', 'switchButton')
		.on('click', function(){
			viewRes.mode='LR';
			initMap();
		})
		.append('rect')
		.attr("x", 630)
		.attr("y", 360)
		.attr("width", 175)
		.attr("height", 25)
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(220,220,220)');
	svg.select('#switchToLRButton')
		.append('text')
		.attr('class', 'switchButtonText')
		.attr("x", 650)
		.attr("y", 377)
		.text('Click to Show Tracts');
};

addBackToLRButton = function(){
	svg.append('g')
		.attr('id', 'backToLRButton')
		.on('click', function(){
			viewRes.mode='LR';
				initMap();
		})
		.append('rect')
		.attr('id', 'backToLRRect')
		.attr("x", 5)
		.attr("y", 5)
		.attr("width", 50)
		.attr("height", 25)
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(220,220,220)');
	svg.select('#backToLRButton')
		.append('text')
		.attr('id', 'backToLRButtonText')
		.attr("x", 9)
		.attr("y", 23)
		.text('Back');
};

getTract = function(a){
	return a.properties.tractce;
};

getClass = function(a){
	if (currentDemo.code != '0'){
		return quantile(parseFloat(a.properties[currentDemo.code]));
	}
	else{
		return 'none';
	}
};

getValue = function(a){
	if (currentDemo.code != '0'){
		return precise_round(a.properties[currentDemo.code], currentDemo.theDecimals);
	}
	else{
		return '';
	}
};

addMap = function(){
	svg.append('g')
		.attr('id', 'theShapeG')
		.attr('class', 'theShapeG')
		.selectAll('path')
		.data(currentFeatureName)
		.enter()
		.append('path')
		.attr('id', function(d) { return getTract(d); })
//		.attr('id', function(d) { return d.properties.tractce; })
		.attr('class', function(d) { return getClass(d); })
//		.attr('class', function(d) { return quantile(parseFloat(d.properties[currentDemo.code])); })
		.attr('LR', function(d) { return d.properties.tractce; })
		.attr('HR', function(d) { return d.properties.blockce; })
		.attr('value', function(d) { return getValue(d); })
//		.attr('value', function(d) {return precise_round(d.properties[currentDemo.code], currentDemo.theDecimals); })
		.attr('stroke', '#fff')
		.attr('stroke-width', 0.1)
		.attr('d', path)
		.on('mouseover', mouseOver)
		.on('mouseout', mouseOut)
		.on('dblclick', dblClick);
};

addTBLRpermLabel = function(){
	svg.select('#theTextG')
		.append('text')
		.attr('id', 'LRName')
		.attr('class', 'LR_name_label')
		.attr('y', textPos.LRNameHeight)
		.attr('x', textPos.x)
		.attr('text-anchor', 'left')
		.text('Tract '+ viewRes.segNumber);
};

addTBLRhoverLabel = function(a){
	svg.select('#theTextG')
		.append('text')
		.attr('id', 'LRsubShapeName')
		.attr('class', 'LR_name_label')
		.attr('y', textPos.LRNameHeight)
		.attr('x', textPos.x)
		.attr('text-anchor', 'left')
		.text('Tract ' + d3.select(a).attr('LR'));
};

addTBHRhoverLabel = function(a){
	svg.select('#theTextG')
		.append('text')
		.attr('id', 'HRsubShapeName')
		.attr('class', 'HR_name_label')
		.attr('y', textPos.HRNameHeight)
		.attr('x', textPos.x)
		.attr('text-anchor', 'left')
		.text('Block ' + d3.select(a).attr('HR'));
};

addTBDemoValue = function(a){
	svg.select('#theTextG')
		.append('text')
		.attr('id', 'demoValueText')
		.attr('class', 'demoValueText')
		.text(d3.select(a).attr('value'))
		.attr('y', textPos.demoValueHeight)
		.attr('x', textPos.x)
		.attr("text-anchor", "left");
};

mouseOver = function(){
	// for all modes add the demo value
	addTBDemoValue(this);
	// if in "LR" mode add the tract number
	if (viewRes.mode == 'LR'){
		addTBLRhoverLabel(this);
	}
	// else if in "zoomIn" mode add the block number
	else if (viewRes.mode == 'zoomIn'){
		addTBHRhoverLabel(this);
	}
	// else if in "HR" mode add the tract and block
	else if (viewRes.mode == 'HR'){
		addTBLRhoverLabel(this);
		addTBHRhoverLabel(this);
	};
};
	
mouseOut = function(){
	svg.select('#LRsubShapeName').remove();
	svg.select('#HRsubShapeName').remove();
	svg.select('#demoValueText').remove();
};

dblClick = function(){
	if (viewRes.mode == 'LR'){
		viewRes.segNumber = this.id;
		viewRes.mode = 'zoomIn';
		initMap();
	}
	else if (viewRes.mode == 'HR'){
		viewRes.segNumber = this.id;
		viewRes.mode = 'zoomIn';
		initMap();
	};
};
