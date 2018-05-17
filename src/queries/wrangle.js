const fetch = require("node-fetch");
require('dotenv').load()

let closure = () => {
  let response = fetch(
    "https://github.com/loganpowell/geojson/raw/master/src/data/test.geojson"
  ).then(res => res.json());
  return response.then(r => r.features);
};

let data = closure();

// GraphQL context
let key = process.env.Census_Key_Pro
// GraphQL args or loaders in context
var scope = {
  geo_scope: "county",
  vintage: 2012,
  fips_codes: [01012, 01102], // <- accept an array, * or just one*
  coordinates: [[31.1052,87.0722], ]// ...{lng, lat}] // optional -> to Tiger
}
// tiger endpoint taxonomy
// https://tigerweb.geocensus.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/Census2010/tigerWMS_Census2010/MapServer/10/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2014/MapServer/84/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/Census2010/tigerWMS_Census2000/MapServer/63/query

let relTigerURL = (vintage, product, lat, lng) => {
  ``
}

//https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query?geometry=-87.0722%2C31.1052&geometryType=esriGeometryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=json

let baseTigerURL = (source, vintage, scope, lat, lng) => `https://tigerweb.geo.census.gov/arcgis/rest/services/${source}/${vintage}/MapServer/${scope}/query?geometry=${lng}%2C${lat}&geometryType=esriGeometryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=json`

let fetchedBase = baseTigerURL("TIGERweb", "tigerWMS_ACS2016", "84", 31.1052, -87.0722) /*?*/

let testTiger = fetch(fetchedBase).then(res => res.json()).then(json => console.log(json.features[0]["attributes"]["STATE"])) /*?*/

var scale = {
  geo_level: "tract",
  resolution: "500k" // <- (toLowerCase)
}
var variables = [
  {source: "sf1", data: ["P028E001", "P028E002", "P028E005"]},
  {source: "cbp", data: ["ESTAB"]}
]

let fetchStatsForOneScope = (key,scale, variables) => {
  let dataweb = fetch(
    `https://api.census.gov/data/2016/acs/acs5?for=county:*&in=state:01&get=NAME,B01001_001E&key=${key}`
  ).then(r => r.json());

  let statsObj = dataweb.then(data => {
    let labels = data[0].map(datum => datum.toUpperCase());
    let rows = data.slice(1);
    let objArray = rows.map(row => {
      return Object.assign(
        {},
        ...labels.map((key, idx) => ({ [key]: row[idx] }))
      );
    });
    let addGEOID = objArray.map(obj => {
      return Object.assign(
        {},
        ...Object.keys(obj).map((key, idx) => ({ [key]: obj[key] })),
        { GEOID: obj["STATE"] + obj["COUNTY"] }
      );
    });
    return JSON.stringify(addGEOID);
  });
  return statsObj
}

// fetchStatsForOneScope(key)
