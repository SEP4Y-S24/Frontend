
export interface TimeProps {
    id: number;
    name: string;
  }

  export interface SimpleClockProps {
    id:string
    name: string;
  }

  
export interface ClockProps {
    id: number;
    name: string;
    timezone: TimeProps;
  }
