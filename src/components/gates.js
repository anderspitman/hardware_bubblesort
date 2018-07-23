import React from 'react';
import { transform } from '../utils';

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


