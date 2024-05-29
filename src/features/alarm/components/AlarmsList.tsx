import Heading from "../../../components/Elements/Headings/Heading";
import { AlarmPropsResponse, AlarmsPropsResponse } from "../types";
import { useEffect, useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Alarm from "./Alarm";
import { deleteAlarm, getAllAlarmsByClockId } from "../api/alarmApi";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import storage from "../../../utils/storage";
import PopUp from "../../../components/Elements/PopUp/PopUp";

interface AlarmsListProps {
  change: boolean;
}

const AlarmsList: React.FC<AlarmsListProps> = (change) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alarms, setAlarms] = useState<AlarmPropsResponse[]>();
  const alarmsPerPage = 5;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const [clockId, setClockId] = useState<string | null>(null);

  const setAllAlarms = (response: AlarmsPropsResponse) => {
    setAlarms(response.alarms);
  };

  useEffect(() => {

    const fetchAlarms = async () => {

      setLoading(true);
      setError(null);

      try {
        const storedClockId = storage.getClock()?.clockId || null;
        setClockId(storedClockId);

        if (!storedClockId) {
          setShowPopup(true);
          setLoading(false);
          return;
        }

        try {
          const response = await getAllAlarmsByClockId(storedClockId);
          setAlarms(response.alarms);
        } catch (error) {
          setError("Failed to fetch alarms. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching clock ID from storage:", error);
        setClockId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms()
  }, [change]);

  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAlarmDelete = (alarmToDelete: AlarmPropsResponse) => {
    if (clockId) {
      deleteAlarm(alarmToDelete.id)
        .then(async () => {
          const response = getAllAlarmsByClockId(clockId);
          await setAllAlarms(await response);
        })
        .catch((error) => {
          console.error("Failed to delete alarm:", error);
        });
    }
  };

  if (clockId == null) {
  }

  return (
    <>
      <Heading text={"Alarms"} type={"heading1"} className="mb-3" />
      {showPopup && (
        <PopUp
          title="Error"
          textAlert="Please select a clock in the Clock settings."
          type="info"
          buttonCancelText="Close"
          onCancel={() => setShowPopup(false)}
        />
      )}
      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        <Heading text={error} type={"heading4"} className="mb-3 text-red-600" />
      ) : clockId == null ? (
        <Heading
          text={"Clock is not selected. Please select a clock in the Clock settings."}
          type={"heading4"}
          className="mb-3 text-red-600"
        />
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
