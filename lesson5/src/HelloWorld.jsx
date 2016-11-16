
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello World!</h1>,
    document.getElementById('container1')
);

/*----------------------------------------------*/

const name = "Zhang San";

ReactDOM.render(
  <h1>Hello, {name}!</h1>,
  document.getElementById('container2')
);

/*----------------------------------------------*/

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Li',
  lastName: 'Si'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('container3')
);