import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Calculater from './components/Calculater';//<=> import Calculater from './components/Calculater/index.js';
import reducer from './reducers';//<=> import reducer from './reducers/index.js';
import * as actions from './actions';//<=> import * as actions from './actions/index.js';

const store = createStore(reducer);

const onUpdateNumber1 = (number1) => {
  var action = actions.updateNumber1(number1);
  store.dispatch(action);
}

const onUpdateNumber2 = (number2) => {
  var action = actions.updateNumber2(number2);
  store.dispatch(action);
};

const onUpdateOperator = (isAddOperator) => {
  var action = actions.updateOperator(isAddOperator);
  store.dispatch(action);
};

const render = () => {
  const state = store.getState();
  ReactDOM.render(
  <Calculater
    number1={state.number1}
    number2={state.number2}
    isAddOperator={state.isAddOperator}
    result={state.result}
    onUpdateNumber1={onUpdateNumber1}
    onUpdateNumber2={onUpdateNumber2}
    onUpdateOperator={onUpdateOperator}
  />,
  document.getElementById('root')
)};

render();

store.subscribe(render);
