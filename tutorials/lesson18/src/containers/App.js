import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component{

  render(){
    return (
      <div>Map</div>
    );
  }

}

function mapStateToProps(state){
  return {

  };
}

function mapDispatchToProps(dispatch){
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);