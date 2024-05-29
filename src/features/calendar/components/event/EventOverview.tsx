import {useEffect, useMemo, useState} from "react";
import {ContentInnerContainer} from "../../../../components/Layout/ContentInnerContainer";
import Heading from "../../../../components/Elements/Headings/Heading";
import Badge from "../../../../components/Elements/Badge/Badge";
import PaginationRounded from "../../../../components/Elements/Pagination/pagination";
import * as React from "react";
import {EventProps, dummyCategories} from "../../types";
import {EyeIcon, PencilSquareIcon, PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";

const Event: React.FC<EventProps> = ({
                                         name,
                                         startingDate,
                                         startingTime,
                                         endingDate,
                                         endingTime,
                                         status,
                                         categories,
                                         onDelete,
                                         onClick,
                                         onEdit,
                                     }) => {
    function getStyleTypeByStatus(status: string) {
        switch (status) {
            case "Not started":
                return "warning";
            case "In progress":
                return "info";
            case "Done":
                return "success";
            default:
                return "warning"; // Default to warning if status is unknown
        }
    }

    return (
        <div
            className="flex items-center justify-between space-x-3 px-3 py-1 my-2 bg-whiteHover hover:bg-background rounded">
            <div>
                <Heading text={name} type={"heading3"}/>
                <Heading text={"Starting: " + startingDate + " at: " + startingTime} type={"heading5"}/>
                <Heading text={"Ending: " + endingDate + " at: " + endingTime} type={"heading5"}/>
            </div>
            <div>
                <Badge text={status.name} styleType={getStyleTypeByStatus(status.name)} isFilled={false}/>
            </div>
            <div className="flex items-center space-x-2">
                <div>
                    <EyeIcon className="text-dark h-5 w-5 mr-1 cursor-pointer" onClick={onClick}/>
                </div>
                <div>
                    <PencilSquareIcon className="text-dark h-5 w-5 cursor-pointer" onClick={onEdit}/>
                </div>
                <div>
                    <XMarkIcon className="text-dark h-5 w-5 cursor-pointer" onClick={onDelete}/>
                </div>
            </div>
        </div>
    );
};

interface EventOverviewProps {
    setSelectedEvent: React.Dispatch<React.SetStateAction<EventProps | null>>;
    events: EventProps[] | null;
    setEvents: React.Dispatch<React.SetStateAction<EventProps[]>>;
    setMode: React.Dispatch<React.SetStateAction<"create" | "edit" | "view">>;
}

export const EventOverview: React.FC<EventOverviewProps> = ({setSelectedEvent, events, setEvents, setMode}) => {
    const [statusFilters, setStatusFilters] = useState<{ [key: string]: boolean }>({
        "Not started": false,
        "In progress": false,
        "Done": false
    });
    const handleChangeOfPage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    const eventsPerPage = 6;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const categories = dummyCategories;
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredEvents = useMemo(() => {
        if (!events) return [];
        return events.filter(event => {
            const statusMatch = statusFilters[event.status.name] || !Object.values(statusFilters).some(value => value);
            const categoryMatch = selectedCategory === "All" || event.categories?.some(category => category.name === selectedCategory);
            return statusMatch && categoryMatch;
        });
    }, [events, statusFilters, selectedCategory]);

    const handleStatusFilterChange = (filter: string) => {
        setStatusFilters(prevFilters => ({
            ...prevFilters,
            [filter]: !prevFilters[filter]
        }));
    };

    const handleCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const renderEvents = () => {
        if (filteredEvents.length === 0) {
            return <p>No events</p>;
        }
        return filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((event, index) => (
            <Event
                key={index}
                name={event.name}
                startingDate={event.startingDate}
                onDelete={() => handleEventDelete(event)}
                startingTime={event.startingTime}
                onEdit={() => handleEventEdit(event)}
                endingDate={event.endingDate}
                endingTime={event.endingTime}
                status={event.status}
                onClick={() => handleEventClick(event)}

            />
        ));
    };

    const handleEventClick = (event: EventProps) => {
        setSelectedEvent(event);
        setMode("view");
    };

    const handleEventEdit = (event: EventProps) => {
        setSelectedEvent(event);
        setMode("edit");
    };

    const handleEventDelete = (eventToDelete: EventProps) => {
        const updatedEvents = events ? events.filter(event => event !== eventToDelete) : [];
        setEvents(updatedEvents);
        setMode("create");
    };

    const handleEventAdd = () => {
        setMode("create");
        setSelectedEvent(null);
    };

    useEffect(() => {
    }, [events]);

    function getStyleTypeByStatus(status: string) {
        switch (status) {
            case "Not started":
                return "warning";
            case "In progress":
                return "info";
            case "Done":
                return "success";
            default:
                return "warning"; // Default to warning if status is unknown
        }
    }

    return (
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <div className="flex justify-between items-center">
                <Heading text={"Events"} type={"heading1"}/>
                <div>
                    <PlusIcon className="text-dark h-5 w-5 cursor-pointer" onClick={handleEventAdd}/>
                </div>
            </div>
            <div>
                {Object.keys(statusFilters).map((filter, index) => (
                    <Badge
                        key={index}
                        styleType={getStyleTypeByStatus(filter)}
                        isFilled={statusFilters[filter]}
                        text={filter}
                        onClick={() => handleStatusFilterChange(filter)}
                        className={"cursor-pointer"}
                    />
                ))}
            </div>
            <div>
                <label htmlFor="categoryFilter" className={"mr-2"}>Category:</label>
                <select id="categoryFilter" value={selectedCategory}
                        className="appearance-none bg-transparent border border-stroke rounded px-2  focus:outline-none cursor-pointer"
                        onChange={handleCategoryFilterChange}>
                    <option value="All">All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            {renderEvents()}
            <PaginationRounded
                page={Number(currentPage)}
                onChange={handleChangeOfPage} // handle page
                className="flex flex-col items-center"
                pages={Math.ceil(filteredEvents.length / eventsPerPage)} // adjust eventsPerPage accordingly
            />
        </ContentInnerContainer>
    );
};
