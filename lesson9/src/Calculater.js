import React,{Component} from 'react';
import './Calculater.css';

class Calculater extends Component{

  constructor(props){
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.number1Changed = this.number1Changed.bind(this);
    this.number2Changed = this.number2Changed.bind(this);
    this.operatorChanged = this.operatorChanged.bind(this);
    this.state = {
      number1: 0,
      number2: 0,
      operator: 'add',
      result: 0
    };
  }

  number1Changed(){
    this.calculate();
  }

  number2Changed(){
    this.calculate();
  }

  operatorChanged(){
    this.calculate();
  }

  calculate(){
    const number1 = parseFloat(this.input1.value);
    const number2 = parseFloat(this.input2.value);
    const operator = this.operator.value;
    const result = operator === 'add' ? (number1 + number2) : (number1 - number2);
    this.setState({
      number1: number1,
      number2: number2,
      operator: operator,
      result: result
    });
  }

  render(){
    return (
      <div>
        <input type="number" value={this.state.number1} ref={(dom) => this.input1 = dom} onChange={this.number1Changed} />
        <select className="operator" value={this.state.operator} ref={(dom) => this.operator = dom} onChange={this.operatorChanged}>
          <option value="add">+</option>
          <option value="minus">-</option>
        </select>
        <input type="number" value={this.state.number2} ref={(dom) => this.input2 = dom} onChange={this.number2Changed} />
        <span className="equal">=</span>
        <span>{this.state.result}</span>
      </div>
    );
  }

}

export default Calculater;