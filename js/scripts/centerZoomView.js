

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
	
	Coords.hPercent = Coords.featureHeight/360;
	Coords.hScreen = h/2/pi;
	Coords.hScale = Coords.hScreen/Coords.hPercent;

	Coords.wPercent = Coords.featureWidth/360;
	Coords.wScreen = w2/2/pi;
	Coords.wScale = Coords.wScreen/Coords.wPercent;

	Coords.fScale = Math.min(Coords.hScale, Coords.wScale) * 0.68;
	
	Coords.centerLon = d3.max(Coords.lons) - (Coords.featureWidth/2);
	Coords.centerLat = d3.max(Coords.lats) - (Coords.featureHeight/2);
	Coords.theCenter = [Coords.centerLon, Coords.centerLat];
	
}