const fetch = require("node-fetch");
const WKT = require("terraformer-wkt-parser");
const R = require("ramda");
const { toJson } = require("../../utils/json-parsers")

const testWKT = WKT.convert({
  type: "Polygon",
  coordinates: [
    [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
    [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
  ]
});

const rawTigerConfig = ({
  geometryType,
  spatialRelationship,
  geometry,
  source,
  scope,
  vintage,
  outFields
}) => {
  let string =
    "https://tigerweb.geo.census.gov/arcgis/rest/services/" +
    source + "/" + // "TIGERweb"
    vintage + // "tigerWMS_ACS2016"
    "/MapServer/" + scope + // "84"
    "/query?geometry=" + geometry + // <- lng,lat
    "&geometryType=" + geometryType +
    "&inSR=4269&spatialRel=" + spatialRelationship +
    "&outFields=" + outFields + // "STATE"
    "&returnGeometry=false&f=geojson";
  return string;
};

const testConfigObj = {
  geometry: "-87.0722,31.1052", // <- concat coord array input
  source: "TIGERweb",
  vintage: "tigerWMS_ACS2016",
  outFields: "STATE",
  scope: "84"
};

const geoPointOpts = {
  geometryType: "esriGeometryPoint", // esriGeometry + Point
  spatialRelationship: "esriSpatialRelIntersects" // esriSpatialRel + Intersects
}

const point2Fips = (customOpts) => {
	let opts = R.merge( // <- merge objects to create single obj arg
    geoPointOpts,
    customOpts
  )
	return rawTigerConfig(opts)
}

const tigerFetch = configObj => fetch(point2Fips(configObj)) /*?*/

const fipsScopeConfig = scope => R.pipeP(
  tigerFetch, // async
  toJson, // sync
  R.view(R.lensPath(["features", 0, "properties", scope])), // sync
)

const getFipsByLngLat = fipsScopeConfig("STATE")

getFipsByLngLat(testConfigObj) /*?*/


/* === === === START NOTES === === ===

// Examples based on this query
const queryEx = https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_ACS2016/MapServer/84/query?geometry=-87.0722,31.1052&geometryType=esriGeometryPoint&inSR=4269&spatialRel=esriSpatialRelIntersects&outFields=STATE&returnGeometry=false&f=geojson


// ========== TODO:

1: Discect Tigerweb taxonomy to configure inputs for all endpoints:

https://tigerweb.geo.census.gov/tigerwebmain/TIGERweb_wms.html


?: get geo_level fips with an input geometry

const geoFrameOpts = {
  geometryType: "esriGeometryEnvelope",
  spatialRelationship: "esriSpatialRelContains"
}


// ========== FURTHER STUDIES:

// Piping promises (1)

const program = (...list) => acc =>
R.flatten(list).reduce((acc,fn) => acc.then(fn), Promise.resolve(acc));

// Study in composition (2)
const tree = {a: [ { b: 'hey' }  ] };

const findIn = R.curry((path, obj) =>
  R.compose(
    R.view(R.__, obj), // R.__ takes the composed path
    R.apply(R.compose),
    R.map(
      R.cond([
        [R.is(Number), R.lensIndex],
        [R.T, R.lensProp]
      ])
    )
  )(path)
)
findIn(['a', 0, 'b'], tree); // => "hey"


// ========== SOURCES:

(1) https://medium.com/@dtipson/more-functional-javascript-reducing-promises-ramda-js-arrow-functions-again-c1f90e0a79d0
(2) https://github.com/ramda/ramda/issues/1816

// === === === END NOTES === === ===  */
