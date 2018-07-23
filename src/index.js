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

const highColor = 'green';
const lowColor = 'black';

const CircuitView = (props) => (
  <svg width='800' height='600' >
    {props.children}
  </svg>
)

function App(props) {
  return (
    <div className='container'>
      <BubblesortCircuit data={props.data}
        onSwitchClicked={props.onSwitchClicked}/>
    </div>
  );
}

const BubblesortCircuit = (props) => {
  return (
    <CircuitView>
      <ButtonBarView switchOffset={0} data={props.data.switches1}
        onSwitchClicked={props.onSwitchClicked} />
      <g transform='translate(0, 260)'>
        <ButtonBarView switchOffset={4} data={props.data.switches2} 
          onSwitchClicked={props.onSwitchClicked} />
      </g>
      <g transform='translate(30, 0)'>
        <Comparator4View data={props.data.comp4} />
      </g>
    </CircuitView>
  );
}

const ButtonBarView = (props) => {

  const switches = props.data.map((sw, i) => {
    return (
      <g key={i} transform={transform(10, 20 + (i * 60))}>
        <ButtonView data={sw} index={i + props.switchOffset}
          onClick={props.onSwitchClicked} />
      </g>
    );
  })

  return (
    <g className='button-bar-view'>
      {switches}
    </g>
  );
}

const ButtonView = (props) => {
  const color = props.data.out().getState() === 0 ? lowColor : highColor;
  return (
    <rect x='-10' y='-10' width='20' height='20' fill={color}
      onClick={() => props.onClick(props.index)}/>
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

const GreaterThan1View = (props) => {
  const andColor =
    props.data._and.inA().getState() === 0 ? lowColor : highColor;
  const notColor = props.data._not.getState() === 0 ? lowColor : highColor;
  return (
    <g className='greater-than-1'>
      <g transform='translate(40, 0)'>
        <AndGateView data={props.data._and} />
      </g>
      <g transform='translate(0, 30)'>
        <NotGateView data={props.data._not} />
      </g>
      <path d="M 0 6 H 40" stroke={andColor} strokeWidth='2.5'
        fill='none' />
      <path d="M 22 40 H 30 V 15 H 40" stroke={notColor} strokeWidth='2.5'
        fill='none' />
    </g>
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
  const orColor = props.data._or.out().getState() === 0 ? 'black' : 'green';
  const nand1Color =
    props.data._nand1.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='xnor-gate'>
      <OrGateView data={props.data._or} />
      <NandGateView data={props.data._nand1} x='0' y='25'/>
      <NandGateView data={props.data._nand2} x='50' y='10'/>
      <path d="M 30 10 H 40 V 15 H 50" stroke={orColor} strokeWidth='2.5'
        fill='none' />
      <path d="M 33 35 H 40 V 25 H 50" stroke={nand1Color} strokeWidth='2.5'
        fill='none' />
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
sw1.setSwitchState(1);
sw2.setSwitchState(0);
sw3.setSwitchState(1);
sw4.setSwitchState(0);

sw5.setSwitchState(0);
sw6.setSwitchState(1);
sw7.setSwitchState(1);
sw8.setSwitchState(0);

data.switches1 = [ sw1, sw2, sw3, sw4 ];
data.switches2 = [ sw5, sw6, sw7, sw8 ];
const allSwitches = data.switches1.concat(data.switches2);

console.log(chip.outGt().getState());
//console.log(chip.outEq().getState());


function switchClicked(index) {
  console.log("Switch clicky");

  const sw = allSwitches[index];

  if (sw.out().getState() === 1) {
    sw.setSwitchState(0);
  }
  else {
    sw.setSwitchState(1);
  }

  render();
}

function render() {
  ReactDOM.render(
    <App data={data} onSwitchClicked={switchClicked} />,
    document.getElementById('root')
  );
}

render();

