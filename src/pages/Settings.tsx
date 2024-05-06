import React, {useState, useEffect} from 'react';
import moment from 'moment-timezone';
import SelectForm from "../components/Form/selectForm";
import {ContentLayout} from "../components/Layout/ContentLayout";
import {ContentInnerContainer} from "../components/Layout/ContentInnerContainer";
import Heading from "../components/Elements/Headings/Heading";


interface Time {
    id: number;
    name: string;
}

export const Settings = () => {
    const [time, setTime] = useState<Time>({
        id: -13,
        name: "Select",
    });
    const utcTimezones = [
        {
            id: 12,
            name: "(UTC-12) International Date Line West"
        },
        {
            id: 11,
            name: "(UTC-11) Coordinated Universal Time-11"
        },
        {
            id: 10,
            name: "(UTC-10) Hawaii"
        },
        {
            id: 9,
            name: "(UTC-9) Alaska"
        },
        {
            id: 8,
            name: "(UTC-8) Pacific Time (US & Canada)"
        },
        {
            id: 7,
            name: "(UTC-7) Mountain Time (US & Canada)"
        },
        {
            id: 6,
            name: "(UTC-6) Central Time (US & Canada)"
        },
        {
            id: 5,
            name: "(UTC-5) Eastern Time (US & Canada)"
        },
        {
            id: 4,
            name: "(UTC-4) Atlantic Time (Canada)"
        },
        {
            id: 3,
            name: "(UTC-3) Buenos Aires"
        },
        {
            id: 2,
            name: "(UTC-2) Coordinated Universal Time-02"
        },
        {
            id: 1,
            name: "(UTC-1) Azores"
        },
        {
            id: 0,
            name: "(UTC) Coordinated Universal Time"
        },
        {
            id: -1,
            name: "(UTC+1) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
        },
        {
            id: -2,
            name: "(UTC+2) Athens, Bucharest, Istanbul"
        },
        {
            id: -3,
            name: "(UTC+3) Moscow, St. Petersburg, Volgograd"
        },
        {
            id: -4,
            name: "(UTC+4) Abu Dhabi, Muscat"
        },
        {
            id: -5,
            name: "(UTC+5) Islamabad, Karachi"
        },
        {
            id: -6,
            name: "(UTC+6) Dhaka"
        },
        {
            id: -7,
            name: "(UTC+7) Bangkok, Hanoi, Jakarta"
        },
        {
            id: -8,
            name: "(UTC+8) Beijing, Chongqing, Hong Kong, Urumqi"
        },
        {
            id: -9,
            name: "(UTC+9) Osaka, Sapporo, Tokyo"
        },
        {
            id: -10,
            name: "(UTC+10) Brisbane"
        },
        {
            id: -11,
            name: "(UTC+11) Solomon Is., New Caledonia"
        },
        {
            id: -12,
            name: "(UTC+12) Fiji"
        },
        {
            id: -13,
            name: "(UTC+13) Nuku'alofa"
        },
        {
            id: -14,
            name: "(UTC+14) Kiritimati Island"
        }
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                let timeRequest = "Etc/GMT"
                if (time.id > 0) {
                    timeRequest += "+";
                }
                timeRequest += time.id;
                const zones = moment.tz(timeRequest);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                let formatedResponse = zones.format();
                console.log(convertIdToString(time.id));
            } catch (error) {
                console.error('Error fetching time zones:', error);
            }
        };
        fetchData();
    }, [time]);

    function handleOnChange(value: Time) {
        setTime(value);
        console.log("Time:", value);
    }

    function convertIdToString(id: number): string {
        let IdToString = "";
        if (id > 0) {
            IdToString += "-" + id;
        }
        if (id < 0) {
            IdToString += "+" + id.toString().slice(1);
        }
        if (id === 0) {
            IdToString += id;
        }
        return IdToString;
    }

    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
                    <Heading text={"Settings"} type={"heading1"}/>

                    <Heading
                        text={"Do not have specific contact? Add a new contact here!"}
                        type={"heading4"}
                        className={"pb-3"}
                    />
                </ContentInnerContainer>
                <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
                    <Heading text={"Time zone"} type={"heading1"}/>
                    <SelectForm
                        dropdownLabel="Select Time Zone"
                        options={utcTimezones}
                        className="timezones"
                        value={time}
                        onChange={handleOnChange}
                    />
                </ContentInnerContainer>
            </ContentLayout>
        </>
    );
};