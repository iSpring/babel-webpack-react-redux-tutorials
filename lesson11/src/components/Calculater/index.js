import React, {Component, PropTypes} from 'react';
import './index.css';

class Calculater extends Component{

  // static propTypes = {
  //   onUpdateNumber1: PropTypes.func.isRequired,
  //   onUpdateNumber2: PropTypes.func.isRequired,
  //   onUpdateOperator: PropTypes.func.isRequired
  // }

  constructor(props){
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.number1Changed = this.number1Changed.bind(this);
    this.number2Changed = this.number2Changed.bind(this);
    this.operatorChanged = this.operatorChanged.bind(this);
  }

  number1Changed(){
    const number1 = parseFloat(this.input1.value);
    console.log("number1Changed", number1);
    typeof this.props.onUpdateNumber1;
    this.props.onUpdateNumber1(number1);
  }

  number2Changed(){
    const number2 = parseFloat(this.input2.value);
    this.props.onUpdateNumber2(number2);
  }

  operatorChanged(){
    const operator = this.operator.value;
    const isAddOperator = operator === 'add';
    this.props.onUpdateOperator(isAddOperator);
  }

  render(){
    const {number1, number2, isAddOperator, result} = this.props;
    return (
      <div>
        <input type="number" value={number1} ref={(dom) => this.input1 = dom} onChange={this.number1Changed} />
        <select className="operator" value={isAddOperator ? "add" : "minus"} ref={(dom) => this.operator = dom} onChange={this.operatorChanged}>
          <option value="add">+</option>
          <option value="minus">-</option>
        </select>
        <input type="number" value={number2} ref={(dom) => this.input2 = dom} onChange={this.number2Changed} />
        <span className="equal">=</span>
        <span>{result}</span>
      </div>
    );
  }

}

export default Calculater;