var { graphqlHTTP } = require('express-graphql');
var { buildSchema, assertInputType } = require('graphql');
var express = require('express');

// Construct a schema, using GraphQL schema language
var restaurants_data = require('./restaurants.json');

var restaurants = restaurants_data.data.restaurants;

var schema = buildSchema(`
type Query{
  restaurant(id: Int): restaurant
  restaurants: [restaurant]
  findRestaurant(name: String): restaurant
},
type restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input restaurantInput{
  name: String
  description: String
}

type DeleteResponse{
  ok: Boolean!
}

type SearchResponse {
  result: String
}

type Mutation{
  setRestaurant(input: restaurantInput): restaurant

  deleteRestaurant(name: String): DeleteResponse
  editRestaurant(input: restaurantInput): restaurant
}
`);
// The root provides a resolver function for each API endpoint


var root = {

  restaurant : (arg) => restaurants[arg.id],
  restaurants : () => {
    console.log(`Listing all Restaurants!`);
    return restaurants
  },
  setRestaurant : ({input}) => {
    console.log(`Adding a Restaurant`);
    restaurants.push({name:input.name,description:input.description})
    return input
  },
  deleteRestaurant : ({name})=>{
    const ok = Boolean(restaurants.name == name)
    let delc = restaurants[name];
    restaurants = restaurants.filter(item => item.name !== name)
    console.log(JSON.stringify(delc)) 
    return {ok}
  },
  editRestaurant: ({input}) => {
    restaurants.forEach( item => {
      if ( item.name == input.name) {
        let result = 1
        item.description = input.description
        return `${item.name} updated successfully!`, result
      }      
    });
    if (result = 0) {
      throw new Error(`${input.name} restaurant doesn't exist`)
    } else {
      return input
    }
  },
  findRestaurant: (search) => {
    console.log(`Searching for Restaurant ${search.name}`)

    for (let i = 0; i < restaurants.length; i++) {
      const element = restaurants[i];

      console.log(`Searching ${search.name} in Current Element: ${JSON.stringify(element)}`)
      if ( element.name == search.name) {
        console.log(`${element.name} found! Data: ${JSON.stringify(element)}`)
        return element
      }
    }  
          //Restaurant was not found
          console.log('Restaurant not found!')
          throw new Error(`${search.name} restaurant doesn't exist`)  
  }
}
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
var port = 5500
app.listen(5500,()=> console.log('Running Graphql on Port:'+port));