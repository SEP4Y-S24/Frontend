
import { ContentLayout } from "../components/Layout/ContentLayout";

import * as React from "react";

import {EventOverview} from "../features/calendar/components/event/EventOverview";
import {EventForm} from "../features/calendar/components/event/EventForm";
import {useEffect, useState} from "react";
import {dummyDataForEvents, EventProps} from "../features/calendar/types";


export const Events = () => {

    const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
    const [events, setEvents] = useState<EventProps[]>(dummyDataForEvents);
    const [mode, setMode] = useState<"create" | "edit" | "view" >("create");
    useEffect(() => {
    }, [events]);
    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <EventOverview setSelectedEvent={setSelectedEvent} events={events} setEvents={setEvents} setMode={setMode}/>
                <EventForm selectedEvent={selectedEvent} mode={mode}/>
            </ContentLayout>
        </>
    );
};
