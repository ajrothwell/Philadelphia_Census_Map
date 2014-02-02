
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
//textPos.MapNameHeight=50;
//textPos.LRNameHeight=90;
//textPos.HRNameHeight=120;
//textPos.demoNameHeight=155;
//textPos.demoValueHeight=185;
absPos.textBoxX=30;

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

