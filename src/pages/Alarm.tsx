import { useEffect, useState } from "react";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import AddAlarm from "../features/alarm/components/AddAlarm";
import AlarmsList from "../features/alarm/components/AlarmsList";
import { AlarmModel, AlarmProps } from "../features/alarm/types";
import { createAlarm, deleteAlarm, getAllAlarms } from "../features/alarm/api/createAlarm";

export const Alarm: React.FC<{ clockId: string }> = ({ clockId }) => {

    const [alarms, setAlarms] = useState<AlarmProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchAlarms = async () => {
          try {
              setLoading(true);
              const fetchedAlarms = await getAllAlarms(clockId);
              setAlarms(fetchedAlarms);
              setLoading(false);
          } catch (error: any) {
              setError(error.message || "An error occurred while fetching alarms.");
              setLoading(false);
          }
      };

      fetchAlarms();
  }, [clockId]);

  const handleAddAlarm = async () => {
    try {
      const createAlarmData: AlarmModel = {
          clock_id: "f656d97d-63b7-451a-91ee-0e620e652c9e",
          set_of_time: "2024-05-20T14:30:45Z",
          name: "string",
      };
      const createdAlarm = await createAlarm(createAlarmData);
      setAlarms([...alarms, createdAlarm]);
  } catch (error) {
      console.error("Error creating alarm:", error);
  }
};


const handleDeleteAlarm = async (alarm: AlarmProps) => {
  try {
      await deleteAlarm(alarm.id);
      const updatedAlarms = alarms.filter(a => a.id !== alarm.id);
      setAlarms(updatedAlarms);
  } catch (error) {
      console.error("Error deleting alarm:", error);
  }
};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const toggleEnabled = (name: string, time: string) => {
      const updatedAlarms = alarms.map(alarm => {
        if (alarm.name === name && alarm.time === time) {
          return { ...alarm, isEnabled: !alarm.isEnabled };
        }
        return alarm;
      });
      setAlarms(updatedAlarms);
    };


    if (loading) {
      return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
}

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AlarmsList alarms={alarms} onDelete={handleDeleteAlarm}/>
        </ContentInnerContainer>

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <AddAlarm addAlarm={handleAddAlarm} />
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
