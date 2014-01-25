
function initMap(){

	if(viewRes.mode == 'LR'){
		projection = d3.geo.mercator()
			.center([-75.12, 40])
			.translate([w/2+150, h/2])
			.scale(60000);
		path = d3.geo.path()
			.projection(projection);
		currentFeatureName = jsonobj.tractData.features;
	}
	else if(viewRes.mode == 'zoomIn'){
//		alert('starting initMap in zoomIn')
		centerZoomView();
		projection = d3.geo.mercator()
			.center([Coords.centerLon, Coords.centerLat])
			.scale(Coords.theReScale-(Coords.theReScale*.2))
			.translate([w/2+150, h/2]);
		path = d3.geo.path()
			.projection(projection);
		// step through the HR data and remove the objects that are not in the LR area
//		alert('reading the topology to the jsonobj')
		jsonobj.blockData = topojson.feature(topologies.blockTopology, topologies.blockTopology.objects.phila_block_rh_geo);
//		alert('begging step thru jsonobj loop')
		for (i=0; i<jsonobj.blockData.features.length; i++){
			if (jsonobj.blockData.features[i].properties.tractce != viewRes.segNumber){
				jsonobj.blockData.features.splice(i,1);
				i--;
			} 
		}
//		alert('completed step thru jsonobj loop')
		currentFeatureName = jsonobj.blockData.features;
	}
	else if(viewRes.mode == 'HR'){
		projection = d3.geo.mercator()
			.center([-75.12, 40])
			.translate([w/2+150, h/2])
			.scale(60000);
		path = d3.geo.path()
			.projection(projection);
		jsonobj.blockData = topojson.feature(topologies.blockTopology, topologies.blockTopology.objects.phila_block_rh_geo);
		currentFeatureName = jsonobj.blockData.features;
	}

	getDemographic();

}
