const express = require('express'),
      app = express(),
      cors = require('cors'),
    	PORT = process.env.PORT || 8081,
    	bodyParser = require('body-parser'),
    	{ graphqlExpress, graphiqlExpress } = require('apollo-server-express'),
      { schema } = require('./schema')

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress({
    schema
  })
)

const gql = String.raw;

app.get(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    query:
gql`
query {
  point {
    type
    coordinates
  }
  multiPoint {
    type
    coordinates
  }
  lineString {
    type
    coordinates
  }
  multiLineString {
    type
    coordinates
  }
  polygon {
    type
    coordinates
  }
  multiPolygon {
    type
    coordinates
  }
  feature {
    type
    id
    properties
    geometry {
      type
      coordinates
    }
  }
  featureCollection {
    type
    features {
      type
      properties
      geometry {
        type
        coordinates
      }
    }
  }
  geometryCollection {
    type
    geometries {
      type
      coordinates
    }
  }
}
`
  })
)

app.listen(PORT, () => console.log('GraphQL API listening on port:' + PORT));
