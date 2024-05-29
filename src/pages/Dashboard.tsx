import { ContentLayout } from "../components/Layout/ContentLayout";
import { NoClockPage } from "../components/Elements/NoClockPage/NoClockPage";
import storage from "../utils/storage";
import { useEffect, useState } from "react";
import Measurements from "../features/measurements/components/Measurements";

export const Dashboard = () => {
  const [clockId, setClockId] = useState<string | null>(null);

  useEffect(() => {
    const storedClockId = storage.getClock()?.clockId || null;
    setClockId(storedClockId);
  }, []);

  return (
    <ContentLayout className="">
      {clockId ? (
        <Measurements />
      ) : (
        <NoClockPage />
      )}
    </ContentLayout>
  );
};
