
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello World!</h1>,
    document.getElementById('container1')
);

/*----------------------------------------------*/

const name = "React";

ReactDOM.render(
  <h1>Hello {name}!</h1>,
  document.getElementById('container2')
);

/*----------------------------------------------*/

const arr = [<h1>Hello ES6!</h1>, <h1>Hello Babel!</h1>];

ReactDOM.render(
    <div>{arr}</div>,
    document.getElementById('container3')
);

/*----------------------------------------------*/

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Zhang',
  lastName: 'San'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('container4')
);