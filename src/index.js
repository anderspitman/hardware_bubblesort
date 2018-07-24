import React from 'react';
import ReactDOM from 'react-dom';
import {
  connectPorts,
  createSwitch,
  Comparator4,
  Comparator2,
  Comparator1,
  GreaterThan1,
  SwapIfGreater4,
  Swap4Set,
  createXnorGate,
  BubbleSort,
  createAndGate,
  createOrGate,
  Mux4,
} from '../lib/wild_logic/src/index';

import { SwapIfGreater4 as SwapIfGreater4View } from './components/swapper';

import {
  transform,
  highColor,
  lowColor,
  color,
} from './utils';

const CircuitView = (props) => (
  <svg width='1200' height='1200' >
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
      <g transform='scale(0.10)'>
        {props.data.getSwapSets().map((swapSet, i) => {
          return (
            <g transform={transform(i * 900)} key={i} >
              <Swap4SetView data={swapSet} />
            </g>
          );
        })}
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



const data = new BubbleSort();

const sw1 = createSwitch('sw1');
const sw2 = createSwitch();
const sw3 = createSwitch();
const sw4 = createSwitch();
const sw5 = createSwitch();
const sw6 = createSwitch();
const sw7 = createSwitch();
const sw8 = createSwitch();
const sw9 = createSwitch();

//const chip = new Mux4();
//const chip = new Comparator4('comp4');
const chip = new SwapIfGreater4('swapGt4');
const chip2 = new SwapIfGreater4();
//const and = createAndGate();
connectPorts(sw1.out(), chip.inA3());
connectPorts(sw2.out(), chip.inA2());
connectPorts(sw3.out(), chip.inA1());
connectPorts(sw4.out(), chip.inA0());
connectPorts(sw5.out(), chip.inB3());
connectPorts(sw6.out(), chip.inB2());
connectPorts(sw7.out(), chip.inB1());
connectPorts(sw8.out(), chip.inB0());

connectPorts(chip.outX3(), chip2.inA3());
connectPorts(chip.outX2(), chip2.inA2());
connectPorts(chip.outX1(), chip2.inA1());
connectPorts(chip.outX0(), chip2.inA0());
connectPorts(chip.outY3(), chip2.inB3());
connectPorts(chip.outY2(), chip2.inB2());
connectPorts(chip.outY1(), chip2.inB1());
connectPorts(chip.outY0(), chip2.inB0());

//sw1.setSwitchState(0);
//sw2.setSwitchState(0);
//sw3.setSwitchState(0);
//sw4.setSwitchState(0);
//
//sw5.setSwitchState(0);
//sw6.setSwitchState(0);
//sw7.setSwitchState(0);
//sw8.setSwitchState(0);
//
//sw9.setSwitchState(0);

//data.switches1 = [ sw1, sw2, sw3, sw4 ];
//data.switches2 = [ sw5, sw6, sw7, sw8 ];
//const allSwitches = data.switches1.concat(data.switches2);


const timeNowSeconds = function() {
  const time = performance.now() / 1000;
  return time;
}

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

const beforeRender = timeNowSeconds();
render();
console.log(timeNowSeconds() - beforeRender);

setInterval(function() {
  const beforeSw = timeNowSeconds();
  const newState = data._sw1.out().getState() === 0 ? 1 : 0;
  console.log(newState);
  data._sw1.setSwitchState(newState);
  render();
  console.log(timeNowSeconds() - beforeSw);
}, 500);

