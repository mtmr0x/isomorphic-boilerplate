# Connect Data Fetchers docs

It's a High Order Component (HOC) for our React containers responsible for work isomorphically with our components.

## Arguments

It receives 4 arguments, which are Container, actionCreators and authentication.

### Container

We separate components as Containers and Components. Containers are the main components called by the router, they receive `props` and distributed as it is necessary across the children components.

Path to all Containers is `./common/containers`. And the children components are located at `./common/components`.

### actionCreators

It's an `Array` and receive all the actions that must be fetched to its Container.

It'll be fetched and passed as `...this.props` to the `Container`.

### authentication

It's a `Object` which receives from `./common/lib/authUserRedirect` two values:

#### auth

Receives `true` for say that it is necessary authenticate the user for having access to its `Container`.

#### redirect

A string with the path to redirect the user in case of his/her status be equal `'not-loggedin'`.

It uses the Router Context to push user to somewhere in the application.

### redirect

Argument used for Checkout Container manage to redirect user to Cart if this user has no item in his cart.

## Usage in Containers

```javascript
// mapStateToProps is a function to be passed as argument to
// React-Redux Connect function that works telling which
// states are going to be props in the current Container
function mapStateToProps(state) {
  return {
    userAuthentication: state.userAuthentication,
  };
}

// as connect callback we pass our HOC with its arguments and
// using authUserRedirect to specify the authentication
// need and its path to redirect the user
export default connect(mapStateToProps)(
  connectDataFetchers(Example, [authenticateUser], authUserRedirect(true, '/'))
);
```

