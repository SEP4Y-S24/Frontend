     import * as React from "react";
import {ContentInnerContainer} from "../components/Layout/ContentInnerContainer";
import {ContentLayout} from "../components/Layout/ContentLayout";
import {useEffect, useState} from "react";
import Heading from "../components/Elements/Headings/Heading";
import {useUser} from "../lib/auth";
import storage from "../utils/storage";
import MeasuredDataBox from "../features/measurements/components/MeasuredDataBox";
import { MeasuredDataResponse} from "../features/measurements/types";
import {
    AdjustmentsHorizontalIcon,
    CloudIcon,
    FireIcon,
    PresentationChartLineIcon
} from "@heroicons/react/24/outline";
     import {useQuery} from "@tanstack/react-query";
     import {getMeasurements} from "../features/measurements/api/getMeasurements";
     import SpinnerComponent from "../features/spinner/SpinnerComponent";
     import {NoClockPage} from "../components/Elements/NoClockPage/NoClockPage";

export const Dashboard = () => {
    const [airCondition, setAirCondition] = useState<MeasuredDataResponse>();
    const [temperature, setTemperature] = useState<MeasuredDataResponse>();
    const [co2, setCo2] = useState<MeasuredDataResponse>();
    const [humidity, setHumidity] = useState<MeasuredDataResponse>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [clock, setClock] = useState(storage.getClock());

    const { isLoading, error, data } = useQuery({
        queryKey: ['measuredData'],
        queryFn: getMeasurements,
    });

    useEffect(() => {
        if (data) {
            setAirCondition(data[0]);
            setTemperature(data[1]);
            setHumidity(data[3]);
            setCo2(data[2]);
        }
    }, [data]);
    return (


            <ContentLayout className="">
                {clock ?(
                <>
                    {isLoading && <SpinnerComponent/>}
                    {error && <p className={"text-red-500"}>{"No Clock connected"}</p>}
                    {airCondition && temperature && co2 && humidity &&
                    <div className="flex flex-wrap mb-3">
                        <MeasuredDataBox colorBackground={"bg-primaryColorOpacity"}
                                         day={airCondition.day} icon={ <PresentationChartLineIcon className="h-6 w-6 text-primaryColor"/>}
                                         name={"Air condition"} value={airCondition.value}/>
                        <MeasuredDataBox colorBackground={"bg-greenOpacity"}
                                         day={temperature.day} icon={ <FireIcon className="h-6 w-6 text-green"/>}
                                         name={"Temperature"} value={temperature.value}/>
                        <MeasuredDataBox colorBackground={"bg-warningOpacity"}
                                         day={humidity.day} icon={ <CloudIcon className="h-6 w-6 text-warning"/>}
                                         name={"Humidity"} value={humidity.value}/>
                        <MeasuredDataBox colorBackground={"bg-purpleOpacity"}
                                         day={co2.day} icon={<AdjustmentsHorizontalIcon className="h-6 w-6 text-purple"/>}
                                         name={"CO2 level"} value={co2.value}/>
                    </div>}
                    <CurrentTime/>
                </>):(
                    <NoClockPage/>
                )
                }


            </ContentLayout>

    );
};
const CurrentTime = () => {
    let timezone = 'Europe/Copenhagen';
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalID);
    }, []); // Empty dependency array to run effect only once on mount

    const showTime = currentTime.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false, // Display 24-hour format
    });
    const user = useUser();
    const name = user.data?.name;
    //const email = user.data?.email;
    const token = storage.getToken();
    return (

        <ContentInnerContainer className="mx-1 flex-1 md:h-auto bg-white">
            <Heading text={"Current time"} type={"heading1"}/>
            <p className="text-lg font-semibold">{showTime}</p>
            <p>{name}</p>
            <p>{token}</p>
        </ContentInnerContainer>
    );
};
