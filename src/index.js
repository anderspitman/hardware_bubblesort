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
const wireStrokeWidth = 2;

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
      <g transform='translate(0, 10)'>
        <ButtonBarView switchOffset={0} data={props.data.switches1}
          onSwitchClicked={props.onSwitchClicked} />
      </g>
      <g transform='translate(0, 310)'>
        <ButtonBarView switchOffset={4} data={props.data.switches2} 
          onSwitchClicked={props.onSwitchClicked} />
      </g>
      <g transform='translate(20, 0)'>
        <Comparator4View data={props.data.comp4} />
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

const Comparator4View = (props) => {
  const data = props.data;
  return (
    <g className='comparator-4'>
      <path d='M -10 0 H 10' stroke='black' strokeWidth='2'/>
      <path d='M 0 -10 V 10' stroke='black' strokeWidth='2'/>
      <g transform={transform(50, 0)} >
        <g transform='translate(0, 0)'>
          <Comparator2View data={props.data._comp1} />
        </g>
        <g transform='translate(0, 240)'>
          <Comparator2View data={props.data._comp2} />
        </g>
        <g transform='translate(320, 120)'>
          <AndGateView data={props.data._andGt} />
        </g>
        <g transform='translate(370, 200)'>
          <AndGateView data={props.data._andEq} />
        </g>
        <g transform='translate(370, 110)'>
          <OrGateView data={props.data._orGt} />
        </g>
      </g>
      // input wires
      // a3
      <path d="M 0 30 H 50" stroke={color(data.inA3())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // a2
      <path d="M 0 70 H 50" stroke={color(data.inA2())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // a1
      <path d="M 0 110 H 20 V 270 H 50" stroke={color(data.inA1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // a0
      <path d="M 0 150 H 10 V 310 H 50" stroke={color(data.inA0())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // b3
      <path d="M 0 330 H 30 V 170 H 50" stroke={color(data.inB3())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // b2
      <path d="M 0 370 H 40 V 210 H 50" stroke={color(data.inB2())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // b1
      <path d="M 0 410 H 50" stroke={color(data.inB1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // b0
      <path d="M 0 450 H 50" stroke={color(data.inB0())}
        strokeWidth={wireStrokeWidth} fill='none' />

      // internal wires
      <path d="M 280 25 H 340 V 205 H 420" stroke={color(data._andEq.inA())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 280 265 H 340 V 215 H 420" stroke={color(data._andEq.inB())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 400 130 H 410 V 125 H 420" stroke={color(data._andEq.out())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 330 75 H 410 V 115 H 420" stroke={color(data._orGt.inA())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 340 125 H 370" stroke={color(data._comp1.outEq())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx='340' cy='125' r='3' fill={color(data._comp1.outEq())} />
      <path d="M 330 315 H 350 V 135 H 370" stroke={color(data._comp2.outGt())}
        strokeWidth={wireStrokeWidth} fill='none' />
    </g>
  );
}

const Comparator2View = (props) => {
  const data = props.data;
  return (
    <g className='comparator-2'>
      <g transform={transform(20, 0)}>
        <Comparator1View data={props.data._a1Compb1} />
        <g transform='translate(0, 120)'>
          <Comparator1View data={props.data._a0Compb0} />
        </g>
        <g transform='translate(180, 15)'>
          <AndGateView data={props.data._andEq} />
        </g>
        <g transform='translate(180, 80)'>
          <AndGateView data={props.data._andGt} />
        </g>
        <g transform='translate(230, 65)'>
          <OrGateView data={props.data._or} />
        </g>
      </g>

      // input wires
      // a1
      <path d="M 0 30 H 20" stroke={color(data.inA1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // a0
      <path d="M 0 70 H 10 V 150 H 20" stroke={color(data.inA0())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // b1
      <path d="M 0 170 H 20 V 89" stroke={color(data.inB1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // b0
      <path d="M 0 210 H 20 V 210" stroke={color(data.inB0())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // internal wires
      <path d="M 160 20 H 200" stroke={color(data._a1Compb1.outEq())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 200 30 H 185 V 140 H 160"
        stroke={color(data._a0Compb0.outEq())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 180 20 V 85 H 200" stroke={color(data._a1Compb1.outEq())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx='180' cy='20' r='3' fill={color(data._a1Compb1.outEq())} />
      <path d="M 130 190 H 190 V 95 H 200"
        stroke={color(data._a0Compb0.outGt())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 130 70 H 250" stroke={color(data._a1Compb1.outGt())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 230 90 H 240 V 80 H 250"
        stroke={color(data._andGt.out())}
        strokeWidth={wireStrokeWidth} fill='none' />
    </g>
  );
}

const Comparator1View = (props) => {
  const data = props.data;
  return (
    <g className='comparator-1'>
      <g transform='translate(40, 0)'>
        <XnorGateView data={props.data._xnor} />
        <g transform='translate(0, 60)'>
          <GreaterThan1View data={props.data._gt} />
        </g>
      </g>

      // wires
      <path d="M 0 30 H 20 V 5 H 40" stroke={color(data.inA())}
        strokeWidth={wireStrokeWidth}  fill='none' />
      <circle cx='20' cy='30' r='3' fill={color(data.inA())} />
      <path d="M 20 30 V 66 H 40" stroke={color(data.inA())}
        strokeWidth={wireStrokeWidth}  fill='none' />
      <path d="M 0 90 H 40" stroke={color(data.inB())}
        strokeWidth={wireStrokeWidth}  fill='none' />
      <path d="M 35 90 V 30 H 40" stroke={color(data.inB())}
        strokeWidth={wireStrokeWidth}  fill='none' />
    </g>
  );
}

const GreaterThan1View = (props) => {
  const data = props.data;
  const andColor =
    props.data._and.inA().getState() === 0 ? lowColor : highColor;
  const notColor = props.data._not.getState() === 0 ? lowColor : highColor;
  return (
    <g className='greater-than-1'>
      <g transform='translate(50, 0)'>
        <AndGateView data={props.data._and} />
      </g>
      <g transform='translate(10, 20)'>
        <NotGateView data={props.data._not} />
      </g>

      <path d="M 0 6 H 50" stroke={andColor}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 32 30 H 40 V 15 H 50" stroke={notColor}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 0 30 H 10" stroke={color(data._not.in())}
        strokeWidth={wireStrokeWidth}  fill='none' />
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
    <g className='or-gate'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <rect fill={color} x='0' y='0' width='20' height='20'></rect>
      <circle fill={color} cx='20' cy='10' r='10'></circle>
    </g>
  );
}

const XnorGateView = (props) => {
  const data = props.data;
  const orColor = props.data._or.out().getState() === 0 ? 'black' : 'green';
  const nand1Color =
    props.data._nand1.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='xnor-gate'>
      <OrGateView data={props.data._or} x='30' />
      <NandGateView data={props.data._nand1} x='30' y='25'/>
      <NandGateView data={props.data._nand2} x='80' y='10'/>

      // wires
      <path d="M 60 10 H 70 V 15 H 80" stroke={orColor}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 63 35 H 70 V 25 H 80" stroke={nand1Color} strokeWidth='2'
        fill='none' />

      <path d="M 0 5 H 30" stroke={color(data.inA())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 20 5 V 40 H 30" stroke={color(data.inA())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx='20' cy='5' r='3' fill={color(data.inA())} />

      <path d="M 0 30 H 30" stroke={color(data.inB())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 10 30 V 13 H 30" stroke={color(data.inB())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx='10' cy='30' r='3' fill={color(data.inB())} />
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

  if (x === undefined) {
    x = 0;
  }

  if (y === undefined) {
    y = 0;
  }

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

sw1.setSwitchState(0);
sw2.setSwitchState(0);
sw3.setSwitchState(0);
sw4.setSwitchState(0);

sw5.setSwitchState(0);
sw6.setSwitchState(0);
sw7.setSwitchState(0);
sw8.setSwitchState(0);

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

function color(elem) {
  return elem.getState() === 0 ? lowColor : highColor;
}

function render() {
  ReactDOM.render(
    <App data={data} onSwitchClicked={switchClicked} />,
    document.getElementById('root')
  );
}

render();

