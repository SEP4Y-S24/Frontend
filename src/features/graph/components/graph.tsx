import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { GraphProps } from '../types';

export default function Graph(props : GraphProps) {
  return (
    <LineChart className='flex flex-col items-center'
    xAxis={[{ data: props.xAxis }]}
    series={[
      {
        data: props.series,
      },
    ]}
    width={800}
    height={500}
  />
  );
}
