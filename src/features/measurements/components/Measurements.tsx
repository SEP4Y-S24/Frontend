import { AdjustmentsHorizontalIcon, CloudIcon, FireIcon, PresentationChartLineIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import storage from "../../../utils/storage";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import CurrentTime from "../../time/components/CurrentTime";
import { getMeasurements } from "../api/getMeasurements";
import { MeasurementPropsResponse, MeasurementType } from "../types";
import MeasuredDataBox from "./MeasuredDataBox";


export const Measurements = () => {
  const [co2Measurement, setCo2Measurement] = useState<MeasurementPropsResponse>({ value: "" });
  const [humidityMeasurement, setHumidityMeasurement] = useState<MeasurementPropsResponse>({ value: "" });
  const [airConditionMeasurement, setAirConditionMeasurement] = useState<MeasurementPropsResponse>({ value: "" });
  const [temperatureMeasurement, setTemperatureMeasurement] = useState<MeasurementPropsResponse>({ value: "" });

  const [clockId, setClockId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasurements = async () => {
      console.log("fetching measurements....");
      try {
        const storedClockId = storage.getClock()?.clockId || null;
        setClockId(storedClockId);
        if (!storedClockId) {
          setIsLoading(false);
          console.log("Clock not selected");
          return;
        }

        setIsLoading(true);

        try {
          const responseCo2 = await getMeasurements(
            storedClockId,
            MeasurementType.CO2
          )
          setCo2Measurement(responseCo2);

          const responseHumidity = await getMeasurements(
            storedClockId,
            MeasurementType.Humidity
          );
          setHumidityMeasurement(responseHumidity);

          const responseAirCondition = await getMeasurements(
            storedClockId,
            MeasurementType.AirCondition
          );
          setAirConditionMeasurement(responseAirCondition);

          const responseTemperature = await getMeasurements(
            storedClockId,
            MeasurementType.Temperature
          );
          setTemperatureMeasurement(responseTemperature);

          setIsLoading(false); // Reset loading state
        } catch (error) {
          setIsLoading(false);
          setError("Error fetching measurements");
          console.error("Error fetching measurements:", error);
        }
      } catch (error) {
        console.error("Error fetching clock ID from storage:", error);
        setClockId(null);
      }
    };

    fetchMeasurements().then();
  }, []);

  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-wrap mb-3">
            {renderMeasuredDataBox(co2Measurement, MeasurementType.CO2)}
            {renderMeasuredDataBox(humidityMeasurement, MeasurementType.Humidity)}
            {renderMeasuredDataBox(airConditionMeasurement, MeasurementType.AirCondition)}
            {renderMeasuredDataBox(temperatureMeasurement, MeasurementType.Temperature)}
          </div>
          <CurrentTime />
        </>
      )}
    </>
  );
};

// Function to render MeasuredDataBox components for each measurement
const renderMeasuredDataBox = (
  measurement: MeasurementPropsResponse,
  type: MeasurementType
) => {
  const value = measurement ? measurement.toString() : "--";
  return (
    <MeasuredDataBox
      key={type}
      colorBackground={getColorBackground(type)}
      icon={getIcon(type)}
      name={getName(type)}
      value={value}
    />
  );
};

const getName = (type: MeasurementType): string => {
  switch (type) {
    case MeasurementType.CO2:
      return "CO2 level";
    case MeasurementType.Humidity:
      return "Humidity";
    case MeasurementType.Temperature:
      return "Temperature";
    case MeasurementType.AirCondition:
      return "Air condition";
    default:
      return "";
  }
};

const getColorBackground = (type: MeasurementType): string => {
  switch (type) {
    case MeasurementType.CO2:
      return "bg-purpleOpacity";
    case MeasurementType.Humidity:
      return "bg-warningOpacity";
    case MeasurementType.Temperature:
      return "bg-greenOpacity";
    case MeasurementType.AirCondition:
      return "bg-primaryColorOpacity";
    default:
      return "";
  }
};

const getIcon = (type: MeasurementType): JSX.Element => {
  switch (type) {
    case MeasurementType.CO2:
      return <AdjustmentsHorizontalIcon className="h-6 w-6 text-purple" />;
    case MeasurementType.Humidity:
      return <CloudIcon className="h-6 w-6 text-warning" />;
    case MeasurementType.Temperature:
      return <FireIcon className="h-6 w-6 text-green" />;
    case MeasurementType.AirCondition:
      return (
        <PresentationChartLineIcon className="h-6 w-6 text-primaryColor" />
      );
    default:
      return <AdjustmentsHorizontalIcon className="h-6 w-6 text-purple" />;
  }
};

export default Measurements;