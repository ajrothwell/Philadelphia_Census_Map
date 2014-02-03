
// TB stands for "textBox"
addTB = function(){
	$('.demoNameText').html(currentDemo.theName);
};

addSwitchToHRButton = function(){
	svg.append('g')
		.attr('id', 'switchToHRButton')
		.attr('class', 'switchButton')
		.on('click', switchToHRMode)
		.append('rect')
		.attr("x", absPos.addedButtonX)
		.attr("y", absPos.addedButtonY)
		.attr("width", 142)
		.attr("height", 18)
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(220,220,220)');
	svg.select('#switchToHRButton')
		.append('text')
		.attr('class', 'switchButtonText')
		.attr("x", absPos.addedButtonTextX)
		.attr("y", absPos.addedButtonTextY)
		.text('Click to Show Blocks');
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
		.attr("x", absPos.addedButtonX)
		.attr("y", absPos.addedButtonY)
		.attr("width", 142)
		.attr("height", 18)
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(220,220,220)');
	svg.select('#switchToLRButton')
		.append('text')
		.attr('class', 'switchButtonText')
		.attr("x", absPos.addedButtonTextX)
		.attr("y", absPos.addedButtonTextY)
		.text('Click to Show Tracts');
};

addBackToLRButton = function(){
	svg.append('g')
		.attr('id', 'backToLRButton')
		.attr('class', 'switchButton')
		.on('click', function(){
			viewRes.mode='LR';
				initMap();
		})
		.append('rect')
		.attr('id', 'backToLRRect')
		.attr("x", absPos.addedButtonX)
		.attr("y", absPos.addedButtonY)
		.attr("width", 43)
		.attr("height", 18)
		.attr('stroke-width', 1)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(220,220,220)');
	svg.select('#backToLRButton')
		.append('text')
		.attr('id', 'backToLRButtonText')
		.attr('class', 'switchButtonText')
		.attr("x", absPos.addedButtonTextX)
		.attr("y", absPos.addedButtonTextY)
		.text('Back');
};

switchToHRMode = function(){
	svg.append('g')
		.attr('id', 'pleaseWaitBox')
		.attr('class', 'pleaseWaitBox')
		.append('rect')
		.attr('x', absPos.waitButtonX)
		.attr('y', absPos.waitButtonY)
		.attr("width", 150)
		.attr("height", 50)
		.attr('stroke-width', 2)
		.attr('stroke', 'rgb(0,0,0)')
		.attr('fill', 'rgb(255,255,51)');
	svg.select('#pleaseWaitBox')
		.append('text')
		.attr('class', 'pleaseWaitButtonText')
		.attr("x", absPos.waitButtonTextX)
		.attr("y", absPos.waitButtonTextY)
		.text('Please Wait');
	viewRes.mode = 'HR';
	setTimeout(initMap, 100);
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
		.attr('d', path)
		.on('mouseover', mouseOver)
		.on('mouseout', mouseOut)
		.on('dblclick', dblClick);
};

addTBLRpermLabel = function(){
	$('.LR_name_label').html('Tract '+ viewRes.segNumber);
};

addTBLRhoverLabel = function(a){
	$('.LR_name_label').html('Tract ' + d3.select(a).attr('LR'));
};

addTBHRhoverLabel = function(a){
	$('.HR_name_label').html('Block ' + d3.select(a).attr('HR'));
};

addTBDemoValue = function(a){
	$('.demoValueText').html(d3.select(a).attr('value'));
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
	$('.HR_name_label').html('');
	$('.demoValueText').html('');
	if (viewRes.mode != 'zoomIn'){
		$('.LR_name_label').html('');
	}
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
