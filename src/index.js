import React from 'react';
import ReactDOM from 'react-dom';
import {
  connectPorts,
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
  Mux4,
  Mux2,
  Mux1,
  SwapIfGreater4,
} from '../lib/wild_logic/src/index';

import { SwapIfGreater4 as SwapIfGreater4View } from './components/swapper';

import {
  Mux4 as Mux4View,
  Mux2 as Mux2View,
  Mux1 as Mux1View,
} from './components/mux';

import {
  transform,
  wireStrokeWidth,
  highColor,
  lowColor,
  color,
} from './utils';

import {
  Comparator4 as Comparator4View,
} from './components/comparator';

const CircuitView = (props) => (
  <svg width='800' height='600' >
    {props.children}
  </svg>
)

const App = (props) => {
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
      <path d='M -10 0 H 10' stroke='black' strokeWidth='2'/>
      <path d='M 0 -10 V 10' stroke='black' strokeWidth='2'/>
      <g transform='scale(0.5)'>
        <g transform='translate(0, 10)'>
          <ButtonBarView switchOffset={0} data={props.data.switches1}
            onSwitchClicked={props.onSwitchClicked} />
        </g>
        <g transform='translate(0, 310)'>
          <ButtonBarView switchOffset={4} data={props.data.switches2} 
            onSwitchClicked={props.onSwitchClicked} />
        </g>
        <g transform='translate(20, 0)'>
          <SwapIfGreater4View data={props.data.swap} />
        </g>
      </g>
    </CircuitView>
  );
}

const ButtonBarView = (props) => {

  const switches = props.data.map((sw, i) => {
    return (
      <g key={i} transform={transform(10, 20 + (i * 40))}>
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




const data = {};

const sw1 = createSwitch();
const sw2 = createSwitch();
const sw3 = createSwitch();
const sw4 = createSwitch();
const sw5 = createSwitch();
const sw6 = createSwitch();
const sw7 = createSwitch();
const sw8 = createSwitch();
const sw9 = createSwitch();

data.comp4 = new Comparator4();
data.mux4 = new Mux4();
const swap = new SwapIfGreater4();
data.swap = swap;

connectPorts(sw1.out(), swap.inA3());
connectPorts(sw2.out(), swap.inA2());
connectPorts(sw3.out(), swap.inA1());
connectPorts(sw4.out(), swap.inA0());
connectPorts(sw5.out(), swap.inB3());
connectPorts(sw6.out(), swap.inB2());
connectPorts(sw7.out(), swap.inB1());
connectPorts(sw8.out(), swap.inB0());

//connectPorts(data.comp4.outGt(), data.mux4.inS());
//
//connectPorts(sw1.out(), data.mux4.inB3());
//connectPorts(sw2.out(), data.mux4.inB2());
//connectPorts(sw3.out(), data.mux4.inB1());
//connectPorts(sw4.out(), data.mux4.inB0());
//connectPorts(sw5.out(), data.mux4.inA3());
//connectPorts(sw6.out(), data.mux4.inA2());
//connectPorts(sw7.out(), data.mux4.inA1());
//connectPorts(sw8.out(), data.mux4.inA0());

sw1.setSwitchState(0);
sw2.setSwitchState(0);
sw3.setSwitchState(0);
sw4.setSwitchState(0);

sw5.setSwitchState(0);
sw6.setSwitchState(0);
sw7.setSwitchState(0);
sw8.setSwitchState(0);

sw9.setSwitchState(0);

data.switches1 = [ sw1, sw2, sw3, sw4 ];
data.switches2 = [ sw5, sw6, sw7, sw8 ];
const allSwitches = data.switches1.concat(data.switches2);


function switchClicked(index) {
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

