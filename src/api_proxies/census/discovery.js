const fetch = require("node-fetch");
const WKT = require("terraformer-wkt-parser");
const R = require("ramda");
require("dotenv").load();
const { toJson } = require("../../utils/json-parsers")
const testData = require("../../data/discovery.json") /*?.*/

// const makeMappable = require("../../utils/arrayMaker")

// GraphQL context
// const key = process.env.Census_Key_Pro

const BASEURL = "https://api.census.gov/data.json"

const fetchVintages = () => fetch(BASEURL) // must be a function

const fipsScopeConfig = R.pipeP(
  fetchVintages, // async
  toJson, // sync
  R.view(R.lensPath(["dataset"])), // sync
  R.map(R.view(R.lensPath(["c_vintage"])))
)() /*?*/

let testArr = data => R.view(R.lensPath(["dataset"]))(data)
testArr(testData) /*?*/

let testX = R.transduce(
  R.map(R.view(R.lensPath(["c_vintage"]))),
  []
)

testX(testArr(testData)) /*?*/
/*


*/
