
var viewRes = {};
viewRes.mode = 'LR';
viewRes.segNumber = 'none';

var Coords = {};
Coords.lons = [];
Coords.lats = [];
var extension = 200;
var pi = Math.PI;

var topologies = {};

var quantile = d3.scale.quantile();

var absPos = {};
absPos.textBoxX = 30;

/*
absPos.addedButtonX = 0;
absPos.addedButtonY = 1;
absPos.addedButtonTextX= 4;
absPos.addedButtonTextY = 18;
*/

absPos.addedButtonX = 450;
absPos.addedButtonY = 10;
absPos.addedButtonTextX= 454;
absPos.addedButtonTextY = 28;

absPos.waitButtonX = 450;
absPos.waitButtonY = 300;
absPos.waitButtonTextX = 455;
absPos.waitButtonTextY = 318;



var formData;

var currentDemo = {};
var currentFeature;
var currentFeatureName;

var demoMaps = {};
demoMaps.demoNameByCode = d3.map();
demoMaps.scaletypeByCode = d3.map();
demoMaps.decimalsByCode = d3.map();
demoMaps.unitsByCode = d3.map();
demoMaps.scaledown1ByCode = d3.map();
demoMaps.scaledown2ByCode = d3.map();

