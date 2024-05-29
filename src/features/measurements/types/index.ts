export enum MeasurementType {
  CO2 = "co2",
  Humidity = "humidity",
  Temperature = "temperature",
  AirCondition = "aircondition",
}

export interface MeasurementPropsResponse {
  value: string;
}

export interface MeasurementsPropsResponse {
  measurements: MeasurementPropsResponse[];
}
