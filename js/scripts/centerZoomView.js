

function centerZoomView() {

	// go through the LR object and find the feature
	for (i=0; i<jsonobj.tractData.features.length; i++){
		if (jsonobj.tractData.features[i].properties.tractce == viewRes.segNumber){
			currentFeature = jsonobj.tractData.features[i];
		}
	}
	Coords.lons = [];
	Coords.lats = [];
				
	if (currentFeature.geometry.type == 'Polygon') {
		for (i=0; i<currentFeature.geometry.coordinates[0].length; i++){
			Coords.lons[i] = currentFeature.geometry.coordinates[0][i][0];
			Coords.lats[i] = currentFeature.geometry.coordinates[0][i][1];
		}
	}				
				
	if (currentFeature.geometry.type == 'MultiPolygon') {
		for (j=0; j<currentFeature.geometry.coordinates.length; j++){
			for (i=0; i<currentFeature.geometry.coordinates[j][0].length; i++){
				if (currentFeature.geometry.coordinates[j][0][i][0] < 0){
					Coords.lons[Coords.lons.length] = currentFeature.geometry.coordinates[j][0][i][0];
					Coords.lats[Coords.lats.length] = currentFeature.geometry.coordinates[j][0][i][1];
				}
			}
		}
	}
				
	Coords.featureWidth = d3.max(Coords.lons)-d3.min(Coords.lons);
	Coords.featureHeight = d3.max(Coords.lats)-d3.min(Coords.lats);

	var w2 = w-extension;
	
//	if (Coords.featureHeight > Coords.featureWidth) {
	Coords.featurePercent = Coords.featureHeight/360;
	Coords.theScale = h/2/pi;
	Coords.theReScale = Coords.theScale/Coords.featurePercent*0.8;

/*
	}
	
	else {
		if (stateWidth > stateHeight*1.25) {
//			alert('width greater than 1.25 * height - make it huge')
			statePercent = stateWidth/360
			theScale = w2/2/pi
			if (stateNumber == 27 || stateNumber == 02 || stateNumber == 55) {
//				alert('rescale for Minnesota, Alaska, Wisconsin')
				theReScale = theScale/statePercent*0.6
			} else if (stateNumber == 05 || stateNumber == 22 || stateNumber == 29 || stateNumber == 54) {
//				alert('rescale for Arkansas, Louisiana, Missouri, W Virginia')
				theReScale = theScale/statePercent*0.7
			} else {
				theReScale = theScale/statePercent*0.82
			}
		
		} else if (stateWidth > stateHeight*1.1) {
//			alert('width greater than 1.1 * height - a little smaller')
			statePercent = stateWidth/360
			theScale = w2/2/pi
			if (stateNumber == 26 || stateNumber == 39 || stateNumber == 12) {
//				alert('rescale for Michigan, Ohio, Florida')
				theReScale = theScale/statePercent*0.6
			} else {
				theReScale = theScale/statePercent*0.72
			}
		} else {
//			alert('width barely greater than height - keep it in the middle')
			statePercent = stateWidth/360
			theScale = h/2/pi
			theReScale = theScale/statePercent
		}
	}			
*/

	Coords.centerLon = d3.max(Coords.lons) - (Coords.featureWidth/2);
	Coords.centerLat = d3.max(Coords.lats) - (Coords.featureHeight/2);
	Coords.theCenter = [Coords.centerLon, Coords.centerLat];
}