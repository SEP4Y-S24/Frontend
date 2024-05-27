import Heading from "../../../components/Elements/Headings/Heading";
import {AlarmPropsResponse, AlarmsPropsResponse} from "../types";
import { useEffect, useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Alarm from "./Alarm";
import {deleteAlarm, getAllAlarmsByClockId} from "../api/alarmApi";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import storage from "../../../utils/storage";

interface AlarmsListProps {
  change: boolean;
}

const AlarmsList: React.FC<AlarmsListProps> = (change) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alarms, setAlarms] = useState<AlarmPropsResponse[]>();
  const alarmsPerPage = 5;
  const clockId = storage.getClock().clockId;

  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  const setAllAlarms =  (response: AlarmsPropsResponse) => {
    setAlarms(response.alarms);
    console.log('Alarms', alarms);
  };
  
  useEffect(() => {
    const fetchAlarms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllAlarmsByClockId(clockId);
        await setAllAlarms(response);
      } catch (error) {
        setError('Failed to fetch alarms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms().then(r => console.log('Alarms fetched'));
  }, []);

  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAlarmDelete = (alarmToDelete: AlarmPropsResponse) => {
    deleteAlarm(alarmToDelete.id).then(async () => {
      const response = getAllAlarmsByClockId(clockId);
      await setAllAlarms(await response);
      console.log('Response', response);
    }).catch((error) => {
      console.error('Failed to delete alarm:', error);
    });
  };

  return (
    <>
      <Heading text={"Alarms"} type={"heading1"} className="mb-3" />
      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        <Heading text={error} type={"heading4"} className="mb-3 text-red-600" />
      ) : (
        <>
          {alarms && alarms.length > 0 ? (
            <>
              {alarms
                .slice(
                  (currentPage - 1) * alarmsPerPage,
                  currentPage * alarmsPerPage
                )
                .map((alarm) => (
                  <Alarm
                    alarm_id={alarm.id}
                    key={alarm.id}
                    name={alarm.name}
                    hours={alarm.hours}
                    minutes={alarm.minutes}
                    isEnabled={alarm.isActive}
                    onDelete={() => handleAlarmDelete(alarm)}
                  />
                ))}
              {alarms.length > alarmsPerPage && ( // Display pagination only if there are more than 5 alarms
                <PaginationRounded
                  page={currentPage}
                  onChange={handleChangeOfPage}
                  className="flex flex-col items-center"
                  pages={Math.ceil(alarms.length / alarmsPerPage)}
                />
              )}
            </>
          ) : (
            <Heading
              text={"You don't have any alarms."}
              type={"heading4"}
              className="mb-3"
            />
          )}
        </>
      )}
    </>
  );
};

export default AlarmsList;
