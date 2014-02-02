
function centerWholeMapView(){
	
	Coords.lons = [];
	Coords.lats = [];
	
	Coords.lonMin = -75.282;
	Coords.lonMax = -74.955;
	Coords.latMin = 39.868;
	Coords.latMax = 40.139
				
	Coords.featureWidth = Coords.lonMax-Coords.lonMin;
	Coords.featureHeight = Coords.latMax-Coords.latMin;

	var w2 = w-extension;
	
	Coords.featurePercent = Coords.featureHeight/360;
	Coords.theScale = h/2/pi;
	Coords.theReScale = Coords.theScale/Coords.featurePercent*0.8;

	Coords.centerLon = Coords.lonMax - (Coords.featureWidth/2);
	Coords.centerLat = Coords.latMax - (Coords.featureHeight/2);
	Coords.theCenter = [Coords.centerLon, Coords.centerLat];
	
	
	
	
	
	
}
