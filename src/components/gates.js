import React from 'react';
import { transform } from '../utils';

import {
  wireStrokeWidth,
  color,
} from '../utils';


export const AndGate = (props) => {
  const and = props.data;
  const color = and.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='and-gate'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <rect fill={color} x='0' y='0' width='20' height='20'></rect>
      <circle fill={color} cx='20' cy='10' r='10'></circle>
    </g>
  );
}

export const OrGate = (props) => {
  const color = props.data.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='or-gate'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <rect fill={color} x='0' y='0' width='20' height='20'></rect>
      <circle fill={color} cx='20' cy='10' r='10'></circle>
    </g>
  );
}

export const NotGate = (props) => {
  const color = props.data.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='not-gate'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <polygon fill={color} points='0,0 20,10 0,20'></polygon>
      <circle fill={color} cx='20' cy='10' r='3'></circle>
    </g>
  );
}

export const XnorGate = (props) => {
  const data = props.data;
  const orColor = props.data._or.out().getState() === 0 ? 'black' : 'green';
  const nand1Color =
    props.data._nand1.out().getState() === 0 ? 'black' : 'green';
  return (
    <g className='xnor-gate'>
      <OrGate data={props.data._or} x='30' />
      <NandGate data={props.data._nand1} x='30' y='25'/>
      <NandGate data={props.data._nand2} x='80' y='10'/>

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

export const NandGate = (props) => {
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
