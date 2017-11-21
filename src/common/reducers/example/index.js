import switchcase from './../../lib/switchcase';

export default function exampleReducer(state = {}, action) {
  console.log(action.type);
  return switchcase({
    EXAMPLE: action.example,
  })(state)(action.type);
}

