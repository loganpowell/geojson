const fetch = require("node-fetch");
require('dotenv').load()

let closure = () => {
  let response = fetch(
    "https://github.com/loganpowell/geojson/raw/master/src/data/test.geojson"
  ).then(res => res.json());
  return response.then(r => r.features);
};

let data = closure();
