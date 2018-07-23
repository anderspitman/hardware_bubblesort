import React from 'react';
import {
  transform,
  wireStrokeWidth,
  color,
  d,
} from '../utils';

import {
  Comparator4 as Comparator4View,
} from '../components/comparator';

import {
  Mux4 as Mux4View,
} from '../components/mux';

export const SwapIfGreater4 = (props) => {
  const data = props.data;
  const xo = 30; // offset
  const yo = 30;

  const muxXOffset = { x: 550, y: 0 };
  const muxYOffset = { x: 550, y: 240 };
  const mx = { x: muxXOffset.x + xo, y: muxXOffset.y + yo };
  const my = { x: muxYOffset.x + xo, y: muxYOffset.y + yo };

  return (
    <g className='swap-if-greater-4'
        transform={transform(props.x, props.y, props.rotation, props.scale)}>
      <path d='M -10 0 H 10' stroke='black' strokeWidth='2'/>
      <path d='M 0 -10 V 10' stroke='black' strokeWidth='2'/>

      <g transform={transform(xo, yo)}>
        <g transform='translate(0, 0)'>
          <Comparator4View data={props.data._comp4} />
        </g>
        <g transform={transform(muxXOffset.x, muxXOffset.y)}>
          <Mux4View data={props.data._muxX} />
        </g>
        <g transform={transform(muxYOffset.x, muxYOffset.y)}>
          <Mux4View data={props.data._muxY} />
        </g>
      </g>

      // input wires
      // A3 
      <path
        d={d('M', xo, yo+30, 'H', 0, 'M', xo-20, yo+30, 'V', yo-20, 'H',
             mx.x-10, 'V', 195, 'H', mx.x, 'H', mx.x-10, 'V', my.y+27, 'H',
             my.x)}
        stroke={color(data.inA3())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx={xo-20} cy={yo+30} r='3' fill={color(data.inA3())} />
      <circle cx={mx.x-10} cy={mx.y+165} r='3' fill={color(data.inA3())} />
      // A2 
      <path
        d={d('M', xo, yo+70, 'H', 0, 'M', xo-15, yo+70, 'V', yo-15, 'H',
             mx.x-20, 'V', 205, 'H', mx.x, 'M', mx.x-20, mx.y+165, 'V',
             my.y+37, 'H', my.x)}
        stroke={color(data.inA2())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx={xo-15} cy={yo+70} r='3' fill={color(data.inA2())} />
      <circle cx={mx.x-20} cy={mx.y+175} r='3' fill={color(data.inA2())} />
      // A1 
      <path
        d={d('M', xo, yo+110, 'H', 0, 'M', xo-10, yo+110, 'V', yo-10, 'H',
             mx.x-30, 'V', 215,
             'H', mx.x, 'M', mx.x-30, mx.y+185, 'V', my.y+47, 'H', my.x)}
        stroke={color(data.inA1())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx={xo-10} cy={yo+110} r='3' fill={color(data.inA1())} />
      <circle cx={mx.x-30} cy={mx.y+185} r='3' fill={color(data.inA1())} />
      // A0 
      <path d={d('M', xo, yo+150, 'H', 0, 'M', xo-5, yo+150, 'V', yo-5, 'H',
                 mx.x-40, 'V', 225,
                 'H', mx.x, 'M', mx.x-40, mx.y+57, 'V', my.y+57, 'H', my.x)}
        stroke={color(data.inA0())}
        strokeWidth={wireStrokeWidth} fill='none' />
      <circle cx={xo-5} cy={yo+150} r='3' fill={color(data.inA0())} />
      <circle cx={mx.x-40} cy={mx.y+195} r='3' fill={color(data.inA0())} />

      // B3 
      <Wire
        path={d('M', xo, yo+330, 'H', 0, 'M', xo-20, yo+330, 'V', 510, 'H',
                530, 'V', mx.y+27, 'H', mx.x, 'M', 530, 435, 'H', my.x)}
        driver={data.inB3()} />
      <circle cx={xo-20} cy={yo+330} r='3' fill={color(data.inB3())} />
      <circle cx={530} cy={435} r='3' fill={color(data.inB3())} />
      // B2 
      <Wire
        path={d('M', xo, yo+370, 'H', 0, 'M', xo-15, yo+370, 'V', 505, 'H',
                520, 'V', mx.y+37, 'H', mx.x, 'M', 520, 445, 'H', my.x)}
        driver={data.inB2()} />
      <circle cx={xo-15} cy={yo+370} r='3' fill={color(data.inB2())} />
      <circle cx={520} cy={445} r='3' fill={color(data.inB2())} />
      // B1 
      <Wire
        path={d('M', xo, yo+410, 'H', 0, 'M', xo-10, yo+410, 'V', 500, 'H',
                510, 'V', mx.y+47, 'H', mx.x, 'M', 510, 455, 'H', my.x)}
        driver={data.inB1()} />
      <circle cx={xo-10} cy={yo+410} r='3' fill={color(data.inB1())} />
      <circle cx={510} cy={455} r='3' fill={color(data.inB1())} />
      // B0 
      <Wire
        path={d('M', xo, yo+450, 'H', 0, 'M', xo-5, yo+450, 'V', 495, 'H',
                500, 'V', mx.y+57, 'H', mx.x, 'M', 500, 465, 'H', my.x)}
        driver={data.inB0()} />
      <circle cx={xo-5} cy={yo+450} r='3' fill={color(data.inB0())} />
      <circle cx={500} cy={465} r='3' fill={color(data.inB0())} />

      // Internal wires
      <Wire
        path={d('M', 480, 150, 'H', 490, 'V', 40, 'H', mx.x, 'M', 490, 150,
                'V', my.y+10, 'H', my.x)}
        driver={data._comp4.outGt()} />
    </g>
  );
}

const Wire = (props) => {
  return(
    <path d={props.path} stroke={color(props.driver)}
      strokeWidth={wireStrokeWidth} fill='none' />
  );
}

