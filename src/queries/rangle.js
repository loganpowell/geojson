const fetch = require('node-fetch')

let closure = () => {
  let response = fetch("https://github.com/loganpowell/geojson/raw/master/src/data/test.geojson").then(res => res.json())
  return response.then(r => r.features)
}

let data = closure()

var dataweb = fetch("https://api.census.gov/data/2016/acs/acs5?for=county:*&in=state:01&get=NAME,B01001_001E")
	.then(r => r.json())

var statsObj = dataweb.then(data => {
  let labels = data[0].map(datum => datum.toUpperCase())
  let rows = data.slice(1)
  let objArray = rows.map(row => {
    return Object.assign({}, ...labels.map((key, idx) => ({[key]: row[idx]})))
  })
  return objArray
})
