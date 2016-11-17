import React,{Component} from 'react';

class Calculater extends Component{

  constructor(props){
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isToggleOn: true
    };
  }

  handleClick(){
    this.setState(oldState => ({
      isToggleOn: !oldState.isToggleOn
    }));
  }

  render(){
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }

}

export default Calculater;