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
} from '../components/gates';


export const Mux4 = (props) => {
  const data = props.data;
  const o = 30; // offset
  return (
    <g className='mux4'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <path d='M -10 0 H 10' stroke='black' strokeWidth='2'/>
      <path d='M 0 -10 V 10' stroke='black' strokeWidth='2'/>
      <g transform={transform(o)}>
        <Mux2 data={data._muxX} />
        <Mux2 data={data._muxY} y='100' />
      </g>
      // input wires
      // S
      <path d={d('M 0 10 H', o)} stroke={color(data.inS())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <path d={d('M', o-5, '10 V', 110, 'H', o)} stroke={color(data.inS())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // A3 
      <path d={d('M 0 27 H', o)} stroke={color(data.inA3())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // A2 
      <path d={d('M 0 37 H', o)} stroke={color(data.inA2())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // A1 
      <path d={d('M 0 47 H', o-10, 'V 127 H', o)} stroke={color(data.inA1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // A0 
      <path d={d('M 0 57 H', o-15, 'V 137 H', o)} stroke={color(data.inA0())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B3 
      <path d={d('M 0 165 H', o-25, 'V 85 H', o)} stroke={color(data.inB3())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B2 
      <path d={d('M 0 175 H', o-20, 'V 95 H', o)} stroke={color(data.inB2())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B1 
      <path d={d('M 0 185 H', o)} stroke={color(data.inB1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      // B0 
      <path d={d('M 0 195 H', o)} stroke={color(data.inB0())}
        strokeWidth={wireStrokeWidth} fill='none' />
    </g>
  );
}


export const Mux2 = (props) => {
  const data = props.data;
  return (
    <g className='mux2'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>

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
