import { LineChart } from '@mui/x-charts/LineChart';
import { GraphProps } from '../types';

export default function Graph(props : GraphProps) {
  return (
    <div className="flex">
      <div className="w-full">
        <LineChart
          className="w-full"
          xAxis={[{ data: props.xAxis }]}
          series={[
            {
              data: props.series,
            },
          ]}
          width={600}
          height={400}
          colors={[props.color]}
        />
      </div>
    </div>
  );
  
}
