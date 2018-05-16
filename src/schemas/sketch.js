// good example: https://github.com/loganpowell/Flickr-Wormhole
// blog for that: https://serverless.com/blog/3rd-party-rest-api-to-graphql-serverless/
// NEXT: notes on using context: https://github.com/graphql/graphql-js/issues/953


// follow up:
// access the request object in context arg: https://medium.com/stackfame/how-to-access-the-request-object-inside-a-graphql-resolver-function-apollo-server-express-8402c1bbb097
// notes on using context: https://github.com/graphql/graphql-js/issues/953
// https://stackfame.com/graphql-req-object
// https://www.apollographql.com/docs/apollo-server/setup.html#options-function
// using rootValue: https://stackoverflow.com/a/44548183
// "extension" ? https://github.com/apollographql/apollo-server/issues/657


// Notes from: https://github.com/graphql/graphql-js/issues/953
/*
Nope, context should be used for isolating implementation from schema itself.
what you are looking for, is just using root value..
for example, context object can provide 2 functions:
*/
{
  getUser(id),
  getUserCar(id),
}
/*
this way the resolver itself of user will call ctx.getUser(args.id) while resolver of car will call ctx.getUserCar(root.id);
the function provided in context may send http request to reterive data, and later on can be updated to connect to database instead, schema remains the same.

*/

// See this: https://github.com/loganpowell/Flickr-Wormhole/blob/develop/src/api.js#L25

return {
  schema,
  context: {
    flickr,
	  album: loaders.loadAlbum(flickr),
// ...
// and in use: https://github.com/loganpowell/Flickr-Wormhole/blob/develop/src/loaders/albums/loadAlbum.js

import { Flickr } from "@/flickr"
import { invariant, missingArgument } from "@/utilities"
import { Album } from "@/models"
import getInfo from "@/methods/photosets/getInfo"

async function fetchAlbumByID({ flickr, userId = ``, photosetId = `` }): Album {
  invariant(flickr, missingArgument({ flickr }))
  invariant(userId, missingArgument({ userId }))
  invariant(photosetId, missingArgument({ photosetId }))
  try {
    const { photoset = {} } = await getInfo({ flickr, userId, photosetId })
    const result = new Album(photoset)

    info(`Successfully ran fetchAlbumByID`, { userId, photosetId, result })
    return result
  } catch (err) {
    error(`Failed to run fetchAlbumByID`, err)
  }
}

export const loadAlbum = flickr => new Dataloader(
  arr => Promise.all(arr.map(([userId, photosetId]) => fetchAlbumByID({ flickr, userId, photosetId }))), { batch: false }
)










// Example Queries
FeatureCollection({scope, resolution, vintage, quality}) {
  type  // FeatureCollection,
  features  [
    {
      type  // Feature
      geometry  {
        type  // Point
        coordinates  // [0, 0]
      }
			// eg: [ { source: "sf1", stats: [ "P028E001", "P028E002", "P028E005" ] }, {source: "cbp", ids: [ "ESTAB" ] } ] vector.
			// graphql-leveler can work here
  	  properties(...sourceMaps){
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

// fetch returns a promise, as does `then`, so in the end you're left with a promise
let test3 = fetch("https://api.census.gov/data/2016/acs/acs5/examples.json")
	.then(r => r.json()).then(r => JSON.stringify(r))

// then use the resulting promise
test3.then(r => console.log(r))

// see `input types`: https://medium.com/graphql-mastery/json-as-an-argument-for-graphql-mutations-and-queries-3cd06d252a04
// helper for complex input types: https://github.com/tomitrescak/apollo-modules#schema-with-inputoutput-elements-
// working resolver:
var arg1 = [
  {source: "sf1", data: [ "P028E001", "P028E002", "P028E005" ]}, {source: "cbp", data: [ "ESTAB" ] }
]

let testFn6 = (...sources) => {
    let src = sources.map(each => ({
		source: each.source,
		data: each.data.map(d => ({ item: d }))
    }))
	return src
}

testFn6(...arg1) // <-- works

// result: JSON.stringify(testFn6(...arg1))

[
	{
		"source": "sf1",
		"data": [
			{
				"item": "P028E001"
			},
			{
				"item": "P028E002"
			},
			{
				"item": "P028E005"
			}
		]
	},
	{
		"source": "cbp",
		"data": [
			{
				"item": "ESTAB"
			}
		]
	}
]
