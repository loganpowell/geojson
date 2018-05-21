require('dotenv').load()
const fetch = require("node-fetch");
const makeMappable = require("../utils/arrayMaker")

// GraphQL context
let key = process.env.Census_Key_Pro

let fetchStatsOneScopeProduct = (
  // get key from context or root/obj
  key,
  // geo `arg`
  {
    geo_scope,
    vintage,
    scope_fips,
    coordinates,
    geo_level,
    level_fips = "*",
    resolution = "500K"
  },
  // variables `arg`
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
//=== === === TEST DATA / args === === ===

// to deal with the nested argument
let testFn6 = (...variables) => {
    let src = variables.map(each => ({
		source: each.source,
		data: each.data.map(d => ({ item: d }))
    }))
	return src
}
// testFn6(...variables) // <-- works

// GraphQL args or loaders in context

var variables = [
  {source: "acs/acs5", stats: ["B01001_001E", "B01001_001M", "B01001_001A"]},
  // {source: "sf1", stats: ["P028E001", "P028E002", "P028E005"]},
  // {source: "cbp", stats: ["ESTAB"]}
]
var geo = {
  geo_scope: "state",
  vintage: 2012,
  scope_fips: [01], // <- arrayMaker
  coordinates: [[-87.0722, 31.1052]], // arrayMaker: optional -> to Tiger (lng, lat)
  geo_level: "tract",
  level_fips: [001, 003] // fips_scope.length > 1 ? default = *
  resolution: "500k" // <- (toLowerCase)
}
fetchStatsOneScopeProduct(key)

module.exports = {
  fetchStatsOneScopeProduct
}
