
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
	
	Coords.hPercent = Coords.featureHeight/360;
	Coords.hScreen = h/2/pi;
	Coords.hScale = Coords.hScreen/Coords.hPercent;

	Coords.wPercent = Coords.featureWidth/360;
	Coords.wScreen = w2/2/pi;
	Coords.wScale = Coords.wScreen/Coords.wPercent;

	Coords.fScale = Math.min(Coords.hScale, Coords.wScale) * 0.68;

	Coords.centerLon = Coords.lonMax - (Coords.featureWidth/2);
	Coords.centerLat = Coords.latMax - (Coords.featureHeight/2);
	Coords.theCenter = [Coords.centerLon, Coords.centerLat];
	
	
	
	
	
	
}
