const fetch = require("node-fetch");
require('dotenv').load()

// tiger endpoint taxonomy
// https://tigerweb.geocensus.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/Census2010/tigerWMS_Census2010/MapServer/10/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2014/MapServer/84/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/Census2010/tigerWMS_Census2000/MapServer/63/query

// === TODO ===

let relTigerURL = (vintage, product, lat, lng) => {
  ``
}

//https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query?geometry=-87.0722%2C31.1052&geometryType=esriGeometryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=json

let baseTigerURL = (source, vintage, scope, lat, lng) => `https://tigerweb.geo.census.gov/arcgis/rest/services/${source}/${vintage}/MapServer/${scope}/query?geometry=${lng}%2C${lat}&geometryType=esriGeometryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=json`

let fetchedBase = baseTigerURL("TIGERweb", "tigerWMS_ACS2016", "84", 31.1052, -87.0722)
let testTiger = fetch(fetchedBase).then(res => res.json()).then(json => console.log(json.features[0]["attributes"]["STATE"]))
