FeatureCollection(
  scope,
  level,
  variables
) {
  type  // FeatureCollection,
  features  [
    {
      type  // Feature
      geometry  {
        type  // Point
        coordinates  // [0, 0]
      }
  	  properties{
				id
				label
				concept
				value
				moe
				annotation
				moe_annotation
        name  // null island from here down from geojson
	      value
	      AFFID
				ALAND
				AWATER
      }
    }
  ]
}

// example parameters (obj/context) that can be passed in from above/context
var scope = {
  geo_scope: "county",
  vintage: 2012,
  fips_codes: [012, 102] or * // <- accept an array, * or just one*
  lat_lngs: [[59.12341, -32.53432],[...]] // optional -> to Tiger
}
var level = {
  geo_level: "tract",
  resolution: "500k" // <- (toLowerCase)
}
var variables = [
  {source: "sf1", data: ["P028E001", "P028E002", "P028E005"]},
  {source: "cbp", data: ["ESTAB"]}
]
// converter of non arrayed args for *optional
let makeMappable = (arg) => {
	let mappable = []
	if (Array.isArray(arg) !== true){
	  mappable = [arg]
  } else {
    mappable = [...arg]
  }
	return mappable // returns the args packed into an array
}

getProductsByGeoLevel(vintage: vintage){
  geo_levels {
    geo_level {
      name // e.g. "county"
      max_scope
      products {
        product {
          id // e.g. "acs1"
          description //
          survey // e.g., "American Community Survey"
          geo_levels
        }
      }
    }
  }
}

getProductsByVintage(vintage: vintage) {
  products {
    product {
      id
      geo_levels {
        geo_level {
          name
          max_scope
        }
      }
    }
  }
}

getStatsByLocation(vintage, geo_scope, product, variables) {
  variables {
    variable {
			id
			label
			concept
			value
			moe
			annotation
			moe_annotation
    }
  }
}

getGeosByScope(scope){
  FeatureCollection {
    ...
  }
}

getStatistics {
  vintages {
    vintage {
      products {
        product {
          ...
        }
      }
    }
  }
}

getStatsWithGeo {
  vintages {
    vintage {
      products {
        product {
          name
          geo_levels {
            geo_level(level) {
              scope(scope) {
                FeatureCollection(Interface){
                  ...
                  properties(variables){
                    idea
                    label
                    ...
                  }
                }
              }
              max_scope {
                scope // returns `requires` array from api
              }
            }
          }
        }
      }
    }
  }
}
