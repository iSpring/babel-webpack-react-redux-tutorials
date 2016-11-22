import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Calculater from './components/Calculater/index.js';
import reducer from './reducers/index.js';
import * as actions from './actions/index.js';

const store = createStore(reducer);

const render = () => ReactDOM.render(
  <Calculater
    onUpdateNumber1={(number1) => store.dispatch(actions.updateNumber1(number1))}
    onUpdateNumber2={(number2) => store.dispatch(actions.updateNumber2(number2))}
    onUpdateOperator={(isAddOperator) => store.dispatch(actions.updateOperator(isAddOperator))}
  />,
  document.getElementById('root')
);

render();

store.subscribe(render);
