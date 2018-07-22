import React from 'react';
import ReactDOM from 'react-dom';
import {
  createSwitch,
  createAndGate,
  createOrGate,
  createNotGate,
  createNandGate,
  createXnorGate,
  Comparator1,
  GreaterThan1,
  Comparator2,
  Comparator4,
  connectPorts,
} from '../lib/wild_logic/index';

const CircuitView = (props) => (
  <svg>
    {props.children}
  </svg>
)

const BubblesortCircuit = (props) => {
  console.log(props.data);
  return (
    <CircuitView>
      <AndGateView data={props.data.and1} x='100' y='100'/>
    </CircuitView>
  );
}

const AndGateView = (props) => {
  const and = props.data;
  const color = and.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='and-gate'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <rect fill={color} x='0' y='0' width='40' height='40'></rect>
      <circle fill={color} cx='40' cy='20' r='20'></circle>
    </g>
  );
}

function App(props) {
  console.log(props);
  return (
    <div className='container'>
      <h1>Hi there</h1>
      <BubblesortCircuit data={props.data} />
    </div>
  );
}

function transform(x, y, rotation, scale) {
  let transform = "translate(" + x + ", " + y + ")";

  if (rotation !== undefined) {
    transform += " rotate(" + rotation + ")";
  }

  if (scale !== undefined) {
    transform += " scale(" + scale + ")";
  }

  return transform;
}

console.log("Hi there");

const data = {};

const sw1 = createSwitch();
const sw2 = createSwitch();
const sw3 = createSwitch();
const sw4 = createSwitch();
const sw5 = createSwitch();
const sw6 = createSwitch();
const sw7 = createSwitch();
const sw8 = createSwitch();

data.and1 = createAndGate();
connectPorts(sw1.out(), data.and1.inA());
connectPorts(sw2.out(), data.and1.inB());

const chip = new Comparator4();

connectPorts(sw1.out(), chip.inA3());
connectPorts(sw2.out(), chip.inA2());
connectPorts(sw3.out(), chip.inA1());
connectPorts(sw4.out(), chip.inA0());
connectPorts(sw5.out(), chip.inB3());
connectPorts(sw6.out(), chip.inB2());
connectPorts(sw7.out(), chip.inB1());
connectPorts(sw8.out(), chip.inB0());
//
sw1.setSwitchState(1);
sw2.setSwitchState(1);
sw3.setSwitchState(1);
sw4.setSwitchState(1);

sw5.setSwitchState(0);
sw6.setSwitchState(1);
sw7.setSwitchState(1);
sw8.setSwitchState(1);

console.log(chip.outGt().getState());
//console.log(chip.outEq().getState());

ReactDOM.render(
  <App data={data} />,
  document.getElementById('root')
);

