const fetch = require('node-fetch')

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} = require('graphql')

const StatisticsType = new GraphQLObjectType({
  name: "properties",
  description: "Key for joining stats to boundaries",
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
})



const BASEURL = 'https://api.census.gov/data/'

// 2015/acs/acs5?for=county:*&in=state:01&get=GEO_ID,NAME,B01001_001E
// endpoint varies per vintage (GEO_ID = GEOID in 2014, eg)

const GeoType = new GraphQLObjectType({
  name: "geography",
  description: "The geographic frame of reference for the query",
  fields: () => {
    value: {
      type: GraphQLInt
    },
    resolve: (root, args, context) => {

    }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'DataWeb Response',
    fields: () => ({
      statistics: {
        type: StatisticsType,
        args: {
          time: { type: GraphQLString },
          survey: { type: GraphQLString }
          product: { type: GraphQLString },
          geoparent: {
            type: GeoType,
            args: {
              level: GraphQLString
              id: GraphQLString
            }
          },
          geochild:  {
            type: GeoType,
            args: {
              level: GraphQLString
              id: GraphQLString
            }
          },
        }
      },
      resolve: (root, args, context) => {
        fetch(
          URL+args.time+"/"+args.survey+"/"+args.product+"?"
          +"for="+args.geochild.level+":"
          + args.geochild.id ? args.geochild.id : "*"
          + args.geoparent.level ? +":"
          + args.geoparent.id ? args.geoparent.id : ""
        )
        .then(res => res.json())
        .then (json => {
          // console.log(json)
          let result = json.filter(i => i[2] === "0500000US01105")
          console.log(result)
        })
        .catch(() => console.log("error!"))
      }
    })
  })
})


module.exports = { schema }
