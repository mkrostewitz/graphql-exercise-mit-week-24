# graphql-exercise-mit-week-24-
MIT GraphQl Exercise Assignment to show CRUD capabilities. 

# How to install it?
1. Clone the repository locally
2. Navigate into the repository you ust cloned
3. run "npm install" to install all neccesary components

# How to run it ?
You can either run "node index.js" or run "nodemon index.js" (to monitor the console and apply changes).
Once you started the server, navigate to "http://localhost:5500/graphql"

# What queries can i perform?
Below you may find a list of quesris and variables tyou can perform:

## Queries
  mutation editRestaurants($name: String, $description: String) {
    editRestaurant(input: {
      name: $name, 
      description: $description
      }
    ) {
      name
      description
    }
  }

  mutation setRestaurants {
    setRestaurant(input: {
      name: "Granite",
      description: "American",
    }) {
      name
      description
    }
  }

  mutation deleteRestaurants($name: String) {
    deleteRestaurant(name: $name) {
      ok
    }
  }

  query getRestaurants {
    restaurants {
      name
      description
      dishes {
        name
        price
      }
    }
  }

  query findRestaurant($name: String) {
    findRestaurant(name: $name) {
      name
      description
      dishes {
        name
        price
      }
    }

  }


## Variables
  {
    "name": "Fiorella",
    "description": "this is german cuisine"
  }


