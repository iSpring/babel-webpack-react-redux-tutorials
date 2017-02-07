import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component{
  render(){
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

function Hi(props){
  return <h1>Hi, {props.name}!</h1>;
}

ReactDOM.render(<Hello name="ES6" />, document.getElementById("container1"));

ReactDOM.render(<Hi name="Babel" />, document.getElementById("container2"));

const names = ["LESS", "SASS", "SCSS"];

ReactDOM.render((
  <div>
  {
    names.map(function(item){
      return <Hello name={item} />
    })
  }
  </div>
), document.getElementById("container3"));