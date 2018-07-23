import React from 'react';
import {
  transform,
  wireStrokeWidth,
  highColor,
  lowColor,
  color,
} from '../utils';

import {
  AndGate as AndGateView,
  OrGate as OrGateView,
  NotGate as NotGateView,
} from '../components/gates';


export const Mux2 = (props) => {
  const data = props.data;
  return (
    <g className='mux2'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <path d='M -10 0 H 10' stroke='black' strokeWidth='2'/>
      <path d='M 0 -10 V 10' stroke='black' strokeWidth='2'/>

      <g transform={transform(30)}>
        <Mux1 data={data._muxX} />
        <Mux1 data={data._muxY} y='50' />
      </g>
      // input wires
      // S
      <path d="M 0 10 H 30" stroke={color(data.inS())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 25 10 V 60 H 30" stroke={color(data.inS())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx='25' cy='10' r='3' fill={color(data.inS())} />
      // A1
      <path d="M 0 27 H 30" stroke={color(data.inA1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // A0
      <path d="M 0 37 H 10 V 77 H 30" stroke={color(data.inA0())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B1
      <path d="M 0 85 H 30 V 44" stroke={color(data.inB1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B0
      <path d="M 0 95 H 30" stroke={color(data.inB0())}
        strokeWidth={wireStrokeWidth} fill='none' />
    </g>
  );

}

export const Mux1 = (props) => {
  const data = props.data;
  return (
    <g className='mux1'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <NotGateView data={data._not} x='20' />
      <AndGateView data={data._and1} x='50' y='5' />
      <AndGateView data={data._and2} x='50' y='30' />
      <OrGateView data={data._or} x='100' y='15' />
      // input wires
      // S
      <path d="M 0 10 H 20" stroke={color(data.inS())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d="M 10 10 V 35 H 50" stroke={color(data.inS())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // A
      <path d="M 0 27 H 40 V 20 H 50" stroke={color(data.inA())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B
      <path d="M 0 45 H 50" stroke={color(data.inB())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // internal wires 
      // not out
      <path d="M 40 10 H 50" stroke={color(data._not.out())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // and1 out
      <path d="M 80 15 H 90 V 20 H 100" stroke={color(data._and1.out())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // and2 out
      <path d="M 80 40 H 90 V 30 H 100" stroke={color(data._and2.out())}
        strokeWidth={wireStrokeWidth} fill='none' />
    </g>
  );
}
