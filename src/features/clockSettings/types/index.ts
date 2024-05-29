
export interface TimeProps {
    id: number;
    name: string;
  }

  export interface SimpleClockProps {
    id:string
    name: string;
  }

  
export interface ClockProps {
    id: string;
    name: string;
    timezone: TimeProps;
  }

export interface ClockPropsResponse{
    userId: string
    id: string
    name: string
    timeOffset: number
}

export interface ClockPropsResquest{
  clockId: string
  userId: string
  name?: string
  timeOffset: number
}
