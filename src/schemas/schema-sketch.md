

## Resolver_Notes ([source](https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature)):

### Signature:
```js
fieldName(obj, args, context, info) { result }
```
These arguments have the following meanings and conventional names:

`obj`: The object that contains the result returned from the resolver on the parent field, or, in the case of a top-level Query field, the rootValue passed from the [server configuration](https://www.apollographql.com/docs/apollo-server/setup.html). This argument enables the nested nature of GraphQL queries.

`args`: An object with the arguments passed into the field in the query. For example, if the field was called with `author(name: "Ada")`, the `args` object would be: `{ "name": "Ada" }`.

`context`: This is an object shared by all resolvers in a particular query, and is used to contain per-request state, including authentication information, dataloader instances, and anything else that should be taken into account when resolving the query. If you’re using Apollo Server, read about how to set the context in the setup [documentation](https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature).

`info`: This argument should only be used in advanced cases, but it contains information about the execution state of the query, including the field name, path to the field from the root, and more. It’s [only documented in the GraphQL.js source code](https://github.com/graphql/graphql-js/blob/c82ff68f52722c20f10da69c9e50a030a1f218ae/src/type/definition.js#L489-L500).

## Psuedo schema

Query:
- obj:
- args:
- context:
- info:
- children:
 - Product
 - [FeatureCollection]
- type:
- resolution:

FeatureCollection []:
- obj:
- args:
- context:
- info:
- children:
 - [Properties]
- type:
- resolution:

working with mapbox-gl
```js
"properties": {
  "a": {
    "b": "some value"
  }
}
```
inside-out (function composition style) `get`:
```js
[ "get", "b", ["object", ["get", "a"]]]
```
[another example](https://github.com/mapbox/mapbox-gl-js/issues/2434#issuecomment-356723412):
```js
line_color = {
  base: 1,
  property: 'analysis.data.volume',
  stops: [
  ...
  ],
}
```
 you can use the "get" expression like so:
 `["get", "volume", ["get", "data", ["get", "analysis"]]]`

To replicate stop-function-like behavior using expressions, use "interpolate", e.g.:

```js
[
  "interpolate",
  ["linear"],
  ["get", "volume", ["get", "data", ["get", "analysis"]]],
  0,
  "green",
  10,
  "blue"
]
```
Properties:
- obj:
- args:
- context:
- info:
- children:
 - Statistic
 - Geographic
- type:
- resolution:

Statistic:
- obj:
- args:
- context:
- info::
- children:
 -
- type:
- resolution:

Product:
- obj:
- args:
- context:
- info:
- children:
- type:
- resolution:


Variable:
- obj:
- args:
- context:
- info:
- children:
- type:
- resolution:


GeographicBoundary:
- obj:
- args:
- context:
- info:
- children:
- type:
- resolution:


TEMPLATE:
- obj:
- args:
- context:
- info:
- children:
- type:
- resolution:
