const fetch = require("node-fetch");
const WKT = require("terraformer-wkt-parser");
const R = require("ramda");
require("dotenv").load();

// tiger endpoint taxonomy
// https://tigerweb.geocensus.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/Census2010/tigerWMS_Census2010/MapServer/10/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2014/MapServer/84/query
// https://tigerweb.geo.census.gov/arcgis/rest/services/Census2010/tigerWMS_Census2000/MapServer/63/query

const testWKT = WKT.convert({
  type: "Polygon",
  coordinates: [
    [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
    [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
  ]
});

//https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query?geometry=-87.0722,31.1052&geometryType=esriGeometryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=json

//https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query?geometry=-87.0722,31.1052&geometryType=esriGeomtryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=json

// https://tigerweb.geo.census.gov/arcgis/rest/services/Generalized_ACS2015/Tracts_Blocks/MapServer/2/

const rawTigerConfig = (
  geometryType = "esriGeomtryPoint",
  spatialRelationship = "esriSpatialRelIntersects",
  geometry,
  source,
  scope,
  vintage,
  outFields
) => {
  // <- curry params from most to least general
  const string =
    "https://tigerweb.geo.census.gov/arcgis/rest/services/" +
    source + "/" + // "TIGERweb"
    vintage + // "tigerWMS_ACS2016"
    "/MapServer/" + scope + // "84"
    "/query?geometry=" + geometry + // <- lng,lat
    "&geometryType=" + geometryType + // "esriGeomtryPoint" / "esriGeometryEnvelope"
    "&inSR=4269&spatialRel=" + spatialRelationship + // "esriSpatialRelIntersects" / "esriSpatialRelContains"
    "&outFields=" + outFields + // "STATE"
    "&returnGeometry=false&f=json";
  return string;
};

const tigerConfig = R.curry(rawTigerConfig);

const testConfigObj = {
  geometryType: "esriGeometryPoint",
  geometry: "-87.0722,31.1052",
  spatialRelationship: "esriSpatialRelIntersects",
  source: "TIGERweb",
  vintage: "tigerWMS_ACS2016",
  outFields: "STATE",
  scope: "84"
};

const curryObjParams = (obj) => R.useWith(
  (obj) => {
    const string =
      "https://tigerweb.geo.census.gov/arcgis/rest/services/" +
      obj.source + "/" + // "TIGERweb"
      obj.vintage + // "tigerWMS_ACS2016"
      "/MapServer/" + obj.scope + // "84"
      "/query?geometry=" + obj.geometry + // <- lng,lat
      "&geometryType=" + obj.geometryType + // "esriGeomtryPoint" / "esriGeometryEnvelope"
      "&inSR=4269&spatialRel=" + obj.spatialRelationship + // "esriSpatialRelIntersects" / "esriSpatialRelContains"
      "&outFields=" + obj.outFields + // "STATE"
      "&returnGeometry=false&f=json";
    return string;
  },
  R.merge(...obj)
)

// === TODO: Ramda: useWith, merge, point free-ify the query-building argument object function (using higher order functions)
// https://github.com/ramda/ramda/issues/1258
// https://gist.github.com/loganpowell/cd712ee5b97a07d7c2a835dc42ec557e

/*
const tigerFetch = configObj => fetch(tigerConfig(configObj));
const jsonify = response => response.json()
const jsonPath = path => R.path(path)


tigerFetch(testConfigObj)
  .then(jsonify)
  .then(jsonPath(["features", 0, "attributes", "STATE"]))
  // .then(res => console.log(res))


const test1 = (path) =>
  R.pipeP(
    R.pipe(jsonify, jsonPath(path), Promise.resolve)
  )

test1(["features", 0, "attributes", "STATE"])(tigerFetch(testConfigObj))

const responseEx = {
  displayFieldName: "BASENAME",
  fieldAliases: {
    STATE: "STATE"
  },
  fields: [
    {
      name: "STATE",
      type: "esriFieldTypeString",
      alias: "STATE",
      length: 2
    }
  ],
  features: [
    {
      attributes: {
        STATE: "01"
      }
    }
  ]
};

test1(responseEx, ["features", 0, "attributes", "STATE"])(tigerFetch(testConfigObj));

// test1(testConfigObj, ["features",0,"attributes","STATE"])

const testResponse =
fetch(tigerConfig(testConfigObj))
.then(r => r.json())
.then(json => json["features"][0]["attributes"]["STATE"])
*/

// .then(r => console.log(r))

// const fetchedBase = baseTigerURL("TIGERweb", "tigerWMS_ACS2016", "84", 31.1052,-87.0722)
// const testTiger = fetch(fetchedBase).then(res => res.json()).then(json => console.log(json.features[0]["attributes"]["STATE"]))
