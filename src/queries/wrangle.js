const fetch = require("node-fetch");
require('dotenv').load()

let closure = () => {
  let response = fetch(
    "https://github.com/loganpowell/geojson/raw/master/src/data/test.geojson"
  ).then(res => res.json());
  return response.then(r => r.features);
};

let data = closure();


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
// GraphQL context
let key = process.env.Census_Key_Pro
// GraphQL args or loaders in context
var geo = {
  geo_scope: "state",
  vintage: 2012,
  scope_fips: [01, 02], // <- accept an array or just one
  coordinates: [...{lat, lng} ]// optional -> to Tiger
  geo_level: "tract",
  level_fips: [001, 003] // fips_scope.length > 1 ? default = *
  resolution: "500k" // <- (toLowerCase)
}
var variables = [
  {source: "acs/acs5", stats: ["B01001_001E", "B01001_001M", "B01001_001A"]},
  {source: "sf1", stats: ["P028E001", "P028E002", "P028E005"]},
  {source: "cbp", stats: ["ESTAB"]}
]
//https://api.census.gov/data/2016/acs/acs5?for=$:*&in=state:01&get=NAME,B01001_001E&key=${key}
let fetchStatsForOneScope = (
  key,
  {
    geo_scope,
    vintage,
    scope_fips,
    coordinates,
    geo_level,
    level_fips = *,
    resolution = "500K"
  },
  variables
) => {
  // will need to iterate over fips_scopes if more than 1 (* or [...])
  let dataweb = fetch(
    `https://api.census.gov/data/${vintage}/${product}?for=${geo_level}:${...fips_levels}&in=${geo_scope}:${fips_scope}&get=NAME,${...variables}&key=${key}`
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

fetchStatsForOneScope(key)
