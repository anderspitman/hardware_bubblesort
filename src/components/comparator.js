import React from 'react';
import {
  transform,
  wireStrokeWidth,
  highColor,
  lowColor,
  color,
  d,
} from '../utils';

import {
  AndGate as AndGateView,
  OrGate as OrGateView,
  NotGate as NotGateView,
  XnorGate,
} from '../components/gates';

export const Comparator4 = (props) => {
  const data = props.data;
  return (
    <g className='comparator-4'>
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
        <XnorGate data={props.data._xnor} />
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
  const notColor = props.data._not.out().getState() === 0 ? lowColor : highColor;
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

