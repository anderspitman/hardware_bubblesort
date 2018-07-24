import React from 'react';
import ReactDOM from 'react-dom';
import {
  connectPorts,
  createSwitch,
  SwapIfGreater4,
  Swap4,
  Swap4Set,
  BubbleSort,
} from '../lib/wild_logic/src/index';

import { SwapIfGreater4 as SwapIfGreater4View } from './components/swapper';

import {
  transform,
  highColor,
  lowColor,
  color,
} from './utils';

const CircuitView = (props) => (
  <svg width='800' height='1200' >
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
      <g transform='scale(0.2)'>
        <Swap4SetView data={props.data.swap4set} />
        {/*
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
        */}
      </g>
    </CircuitView>
  );
}


const Swap4SetView = (props) => {
  const data = props.data;
  return data.getSwaps().map((swap, i) => {
    return (
      <SwapIfGreater4View data={swap} key={i} y={i * 600}/>
    );
  });
}

//const Swap4View = (props) => {
//  const data = props.data;
//  return (
//    <SwapIfGreater4View data={data._swapper} y={props.y} />
//  );
//}


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

const swap4Set = new Swap4Set();
data.swap4set = swap4Set;

for (let i = 0; i < 4; i++) {
  swap4Set.addSwap();
}

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

