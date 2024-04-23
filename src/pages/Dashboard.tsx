
import * as React from "react";
import {ContentInnerContainer} from "../components/Layout/ContentInnerContainer";
import {ContentLayout} from "../components/Layout/ContentLayout";
import {useEffect, useState} from "react";
import Heading from "../components/Elements/Headings/Heading";

export const Dashboard = () => {

    return (
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <CurrentTime/>

</ContentLayout>


    );
};
const CurrentTime = () => {
    let timezone = 'Europe/London';
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
    return (

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <Heading text={"Current time"} type={"heading1"}/>
            <p className="text-lg font-semibold">{showTime}</p>

        </ContentInnerContainer>
    );
};
