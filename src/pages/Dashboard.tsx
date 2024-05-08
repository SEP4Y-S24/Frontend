     import * as React from "react";
import {ContentInnerContainer} from "../components/Layout/ContentInnerContainer";
import {ContentLayout} from "../components/Layout/ContentLayout";
import {useEffect, useState} from "react";
import Heading from "../components/Elements/Headings/Heading";
import {useUser} from "../lib/auth";
import storage from "../utils/storage";
import MeasuredDataBox from "../features/measurements/components/MeasuredDataBox";
import {MeasuredData} from "../features/measurements/types";
import {
    AdjustmentsHorizontalIcon,
    CloudIcon,
    FireIcon,
    PresentationChartLineIcon
} from "@heroicons/react/24/outline";

const dummyData: MeasuredData[] = [
    {
        name: "Air condition",
        day: "Monday",
        value: "Good",
        icon:  <PresentationChartLineIcon className="h-6 w-6 text-primaryColor"/>,
        colorText:  "text-primary",
        colorBackground:  "bg-primaryColorOpacity",
    },
    {
        name: "Temperature",
        day: "Tuesday",
        value: "$70",
        icon: <FireIcon className="h-6 w-6 text-green"/>,
        colorText:  "text-green",
        colorBackground:  "bg-greenOpacity"
    },
    {
        name: "Humidity",
        day: "Wednesday",
        value: "20 °C",
        icon:  <CloudIcon className="h-6 w-6 text-warning"/>,
        colorText:  "text-warning",
        colorBackground:  "bg-warningOpacity",
    },
    {
        name: "CO2 level",
        day: "Thursday",
        value: "Amazing",
        icon: <AdjustmentsHorizontalIcon className="h-6 w-6 text-purple"/>,
        colorText:  "text-purple",
        colorBackground:  "bg-purpleOpacity",
    },
];
export const Dashboard = () => {

    return (

            <ContentLayout className="">

                <div className="flex flex-wrap mb-3">
                    {dummyData.map((item) => (
                        <MeasuredDataBox key={item.name} colorBackground={item.colorBackground} colorText={item.colorText} day={item.day} icon={item.icon} name={item.name} value={item.value}/>
                    ))}
                </div>
                <CurrentTime/>
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
