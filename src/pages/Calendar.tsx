import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";
import {dummyDataForEvents, dummyDataForTasks, EventProps, TaskProps} from "../features/calendar/types";
import { getTextColor } from "../features/calendar/types/categoryColorLogic";

export const Calendar = () => {
    const transformDataToTasks = (data: TaskProps[], type: string) => {
        return data.map((item => ({
            title: `${type}: ${item.name}`,
            start: item.deadlineDate,
            extendedProps: {
                status: item.status.name,
                categories: item.categories,
                type: type,
            }
        })));
    };

    const transformDataToEvents = (data: EventProps[], type: string) => {
        return data.map((item => ({
            title: `${type}: ${item.name}`,
            start: item.startingTime,
            end: item.endingTime,
            extendedProps: {
                status: item.status.name,
                categories: item.categories,
                type: type,
            }
        })));
    };

    const calendarTasks = transformDataToTasks(dummyDataForTasks, "Task");
    const calendarEvents = transformDataToEvents(dummyDataForEvents, "Event");

    const combinedEvents = [...calendarTasks, ...calendarEvents];

    const renderEventContent = (eventInfo: { event: any; }) => {
        const { event } = eventInfo;
        const firstCategoryColor = event.extendedProps.categories && event.extendedProps.categories[0] ? event.extendedProps.categories[0].color : "#FFFFFF";
        return (
            <div className={`fc-event-${event.extendedProps.type || 'event'}`} style={{
                backgroundColor: `${firstCategoryColor}`,
                color: `${getTextColor(firstCategoryColor)}`,
                border: `2px solid ${firstCategoryColor}`,
                padding: '2px',
                borderRadius: '4px',
                boxSizing: 'border-box',
            }}>
                <b>{event.title}</b>
                {event.extendedProps.description && <p>{event.extendedProps.description}</p>}
            </div>
        );
    };

    return (
        <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <ContentInnerContainer className="flex-1 bg-white">
                <div className="flex justify-center">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: "today prev,next",
                            center: "title",
                            end: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={combinedEvents} // Pass the combined array to the FullCalendar component
                        eventContent={renderEventContent} // Custom rendering function
                    />
                </div>
            </ContentInnerContainer>
        </ContentLayout>
    );
};
