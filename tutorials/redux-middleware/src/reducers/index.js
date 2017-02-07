import * as actions from '../actions';//<=> import actions from '../actions/index.js';

const defaultState = {
  number1: 0,
  number2: 0,
  isAddOperator: true,
  result: 0
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.ACTION_UPDATE_NUMBER1:
      return Object.assign({}, state, {
        number1: action.number1,
        result: state.isAddOperator ? (action.number1 + state.number2) : (action.number1 - state.number2)
      });
    case actions.ACTION_UPDATE_NUMBER2:
      return Object.assign({}, state, {
        number2: action.number2,
        result: state.isAddOperator ? (state.number1 + action.number2) : (state.number1 - action.number2)
      });
    case actions.ACTION_UPDATE_OPERATOR:
      return Object.assign({}, state, {
        isAddOperator: action.isAddOperator,
        result: action.isAddOperator ? (state.number1 + state.number2) : (state.number1 - state.number2)
      });
    default:
      return state;
  }
};

export default reducer;