import { combineReducers } from 'redux';
import gitHub from './gitHub';
import stackOverflow from './stackOverflow';

// function reducer(state = {}, action){
//   return {
//     gitHub: gitHub(state.gitHub, action),
//     stackOverflow: stackOverflow(state.stackOverflow, action)
//   }
// }

//等价于

// const reducer = combineReducers({
//   gitHub: gitHub,
//   stackOverflow: stackOverflow
// });

//等价于

const reducer = combineReducers({
  gitHub,
  stackOverflow
});

export default reducer;