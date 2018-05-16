const fetch = require('node-fetch')

let closure = () => {
  let response = fetch("https://github.com/loganpowell/geojson/raw/master/src/data/test.geojson").then(res => res.json())

  // let test = fetch("https://api.census.gov/data/2016/acs/acs5/examples.json")
  // 	.then(r => r.json())
  //
  // test /*?*/
  // then use the resulting promise
  return response.then(r => r.features)
}

let data = Promise.resolve(closure())

data /*?*/
var dataweb = fetch("https://api.census.gov/data/2016/acs/acs5?for=county:*&in=state:01&get=NAME,B01001_001E")
	.then(r => r.json())

dataweb /*?*/

var statsObj = dataweb.then(data => {
  let labels = data[0].map(datum => datum.toUpperCase())/*?*/
  // console.log(labels)
  let rows = data.slice(1)
  // console.log(rows)
  let objArray = rows.map(row => {
    // console.log(row)
    // row.reduce((accum, curVal, curIdx) => {
    //   accum[labels[curIdx]] = curVal
    // }, {})
    return Object.assign({}, ...labels.map((key, idx) => ({[key]: row[idx]})))
  })
  return objArray
})

statsObj /*?*/
