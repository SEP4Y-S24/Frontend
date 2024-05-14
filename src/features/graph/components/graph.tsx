import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { GraphProps } from '../types';

export default function Graph(props : GraphProps) {
  return (
    <div className="flex">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/3">
        <LineChart sx={{width : '50%'}}
          className="w-full"
          xAxis={[{ data: props.xAxis }]}
          series={[
            {
              data: props.series,
            },
          ]}
          width={600}
          height={400}
        />
      </div>
    </div>
  );
  
}
