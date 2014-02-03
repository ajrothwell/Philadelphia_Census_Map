
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

absPos.addedButtonX = 5;
absPos.addedButtonY = 12;
absPos.addedButtonTextX= 10;
absPos.addedButtonTextY = 26;

absPos.waitButtonX = 150;
absPos.waitButtonY = 240;
absPos.waitButtonTextX = 155;
absPos.waitButtonTextY = 273;



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

