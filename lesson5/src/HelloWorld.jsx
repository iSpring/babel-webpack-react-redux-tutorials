
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello World!</h1>,
    document.getElementById('container1')
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
  document.getElementById('container2')
);