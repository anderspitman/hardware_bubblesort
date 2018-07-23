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
  <svg width='500' height='500' >
    <g transform='scale(0.1)'>
    {props.children}
    </g>
  </svg>
)

const BubblesortCircuit = (props) => {
  return (
    <CircuitView>
      <Comparator4View data={props.data.comp4} />
    </CircuitView>
  );
}

const AndGateView = (props) => {
  const and = props.data;
  const color = and.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='and-gate'>
      <rect fill={color} x='0' y='0' width='20' height='20'></rect>
      <circle fill={color} cx='20' cy='10' r='10'></circle>
    </g>
  );
}

const NotGateView = (props) => {
  const color = props.data.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='not-gate'>
      <polygon fill={color} points='0,0 20,10 0,20'></polygon>
      <circle fill={color} cx='20' cy='10' r='3'></circle>
    </g>
  );
}

const OrGateView = (props) => {
  const color = props.data.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='or-gate'>
      <rect fill={color} x='0' y='0' width='20' height='20'></rect>
      <circle fill={color} cx='20' cy='10' r='10'></circle>
    </g>
  );
}

const XnorGateView = (props) => {
  return (
    <g className='xnor-gate'>
      <OrGateView data={props.data._or} />
      <NandGateView data={props.data._nand1} x='0' y='25'/>
      <NandGateView data={props.data._nand2} x='50' y='10'/>
    </g>
  );
}

const GreaterThan1View = (props) => {
  return (
    <g className='greater-than-1'>
      <AndGateView data={props.data._and} />
      <g transform='translate(0, 30)'>
        <NotGateView data={props.data._not} />
      </g>
    </g>
  );
}

const Comparator1View = (props) => {
  return (
    <g className='comparator-1'>
      <XnorGateView data={props.data._xnor} />
      <g transform='translate(0, 60)'>
        <GreaterThan1View data={props.data._gt} />
      </g>
    </g>
  );
}

const Comparator2View = (props) => {
  return (
    <g className='comparator-2'>
      <Comparator1View data={props.data._a1Compb1} />
      <g transform='translate(0, 120)'>
        <Comparator1View data={props.data._a0Compb0} />
      </g>
      <g transform='translate(140, 90)'>
        <AndGateView data={props.data._andGt} />
      </g>
      <g transform='translate(200, 50)'>
        <OrGateView data={props.data._or} />
      </g>
      <g transform='translate(200, 130)'>
        <AndGateView data={props.data._andEq} />
      </g>
    </g>
  );
}

const Comparator4View = (props) => {
  return (
    <g className='comparator-4'>
      <g transform='translate(0, 0)'>
        <Comparator2View data={props.data._comp1} />
      </g>
      <g transform='translate(0, 260)'>
        <Comparator2View data={props.data._comp2} />
      </g>
      <g transform='translate(360, 240)'>
        <AndGateView data={props.data._andEq} />
      </g>
      <g transform='translate(300, 300)'>
        <AndGateView data={props.data._andGt} />
      </g>
      <g transform='translate(360, 200)'>
        <OrGateView data={props.data._orGt} />
      </g>
    </g>
  );
}

const NandGateView = (props) => {
  const color = props.data.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='nand-gate'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <rect fill={color} x='0' y='0' width='20' height='20'></rect>
      <circle fill={color} cx='20' cy='10' r='10'></circle>
      <circle fill={color} cx='31' cy='10' r='2.5'></circle>
    </g>
  );
}

function App(props) {
  return (
    <div className='container'>
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


const data = {};

const sw1 = createSwitch();
const sw2 = createSwitch();
const sw3 = createSwitch();
const sw4 = createSwitch();
const sw5 = createSwitch();
const sw6 = createSwitch();
const sw7 = createSwitch();
const sw8 = createSwitch();

const chip = new Comparator4();
data.comp4 = chip;

connectPorts(sw1.out(), chip.inA3());
connectPorts(sw2.out(), chip.inA2());
connectPorts(sw3.out(), chip.inA1());
connectPorts(sw4.out(), chip.inA0());
connectPorts(sw5.out(), chip.inB3());
connectPorts(sw6.out(), chip.inB2());
connectPorts(sw7.out(), chip.inB1());
connectPorts(sw8.out(), chip.inB0());
//
sw1.setSwitchState(0);
sw2.setSwitchState(0);
sw3.setSwitchState(1);
sw4.setSwitchState(1);

sw5.setSwitchState(0);
sw6.setSwitchState(0);
sw7.setSwitchState(1);
sw8.setSwitchState(0);

console.log(chip.outGt().getState());
//console.log(chip.outEq().getState());

ReactDOM.render(
  <App data={data} />,
  document.getElementById('root')
);

