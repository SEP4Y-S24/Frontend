import { useEffect, useState } from "react";
import { CategoriesType, dummyCategories, dummyDataForEvents, EventProps } from "../../types";
import * as React from "react";
import { ContentInnerContainer } from "../../../../components/Layout/ContentInnerContainer";
import { Form } from "react-router-dom";
import Heading from "../../../../components/Elements/Headings/Heading";
import InputField from "../../../../components/Form/InputField";
import TextArea from "../../../../components/Form/TextArea";
import SelectForm from "../../../../components/Form/selectForm";
import Button from "../../../../components/Elements/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from "dayjs";
import CategoryTag from "../CategoryTag";

interface EventFormProps {
    selectedEvent: EventProps | null;
    mode: "create" | "edit" | "view";
}

export const EventForm: React.FC<EventFormProps> = ({ selectedEvent, mode }) => {
    const statuses = [
        { id: 1, name: "Not started" },
        { id: 2, name: "In progress" },
        { id: 3, name: "Done" },
    ];
    const defaultCategories = dummyCategories;
    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState("");
    const [startingDate, setStartingDate] = React.useState<Dayjs | null>(dayjs());
    const [startingDateError, setStartingDateError] = useState("");
    const [startingTime, setStartingTime] = React.useState<Dayjs | null>(dayjs());
    const [startingTimeError, setStartingTimeError] = useState("");
    const [endingDate, setEndingDate] = React.useState<Dayjs | null>(null);
    const [endingDateError, setEndingDateError] = useState("");
    const [endingTime, setEndingTime] = React.useState<Dayjs | null>(null);
    const [endingTimeError, setEndingTimeError] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState<{ id: number; name: string }>({
        id: 1,
        name: "Not started",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
    };

    let headingText = '';
    // Determine the heading text based on the mode
    switch (mode) {
        case 'create':
            headingText = 'Add an event';
            break;
        case 'edit':
            headingText = 'Edit event: ' + selectedEvent?.name;
            break;
        case 'view':
            headingText = 'View event: ' + selectedEvent?.name;
            break;
        default:
            headingText = '';
    }

    const handleSubmit = async () => {
        if (validate()) {
            const currentDateTime = dayjs(); // Get the current date and time
            const eventSubmitted: EventProps = {
                name: name || selectedEvent?.name || "",
                description: description || selectedEvent?.description || "", // Use selectedEvent data if description is not entered
                startingDate: startingDate?.format('YYYY-MM-DD') || selectedEvent?.startingDate?.format('YYYY-MM-DD') || currentDateTime.format('YYYY-MM-DD'), // Convert to Date object
                startingTime: startingTime?.format('YYYY-MM-DDTHH:mm') || selectedEvent?.startingTime?.format('YYYY-MM-DDTHH:mm') || currentDateTime.format('YYYY-MM-DDTHH:mm'), // Convert to Date object
                endingDate: endingDate?.format('YYYY-MM-DD') || selectedEvent?.endingDate?.format('YYYY-MM-DD') || currentDateTime.format('YYYY-MM-DD'), // Convert to Date object
                endingTime: endingTime?.format('YYYY-MM-DDTHH:mm') || selectedEvent?.endingTime?.format('YYYY-MM-DDTHH:mm') || currentDateTime.format('YYYY-MM-DDTHH:mm'), // Convert to Date object
                status: status || selectedEvent?.status || { id: 1, name: "Not started" },
                categories: categories || selectedEvent?.categories || [],
            };

            dummyDataForEvents.push(eventSubmitted);
            setName("");
            setStartingTime(null);
            setStartingDate(null);
            setEndingTime(null);
            setEndingDate(null);
            setDescription("");
            setStatus({ id: 1, name: "Not started" });
        }
    };

    const validate = () => {
        let valid = true;

        if (!name.trim() && selectedEvent === null) {
            setNameError("Please enter a name");
            valid = false;
        } else {
            setNameError("");
        }

        if (!startingDate) {
            setStartingDateError("Select starting date");
            valid = false;
        } else {
            setStartingDateError("");
        }

        if (!startingTime) {
            setStartingTimeError("Select starting time");
            valid = false;
        } else {
            setStartingTimeError("");
        }

        if (!endingDate) {
            setEndingDateError("Select ending date");
            valid = false;
        } else {
            setEndingDateError("");
        }

        if (!endingTime) {
            setEndingTimeError("Select ending time");
            valid = false;
        } else {
            setEndingTimeError("");
        }

        return valid;
    };

    useEffect(() => {
        setNameError("");
        setName(selectedEvent?.name || name);
        setStartingDate(selectedEvent ? dayjs(selectedEvent.startingDate) : startingDate);
        setStartingTime(selectedEvent ? dayjs(selectedEvent.startingTime) : startingTime);
        setEndingDate(selectedEvent ? dayjs(selectedEvent.endingDate) : endingDate);
        setEndingTime(selectedEvent ? dayjs(selectedEvent.endingTime) : endingTime);
        setDescription(selectedEvent?.description || description);
        setCategories(selectedEvent?.categories || categories);
        let nameValue = selectedEvent?.name || "";
        setName(nameValue);
        let descValue = selectedEvent?.description || "";
        setDescription(descValue);
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setStatus(selectedEvent?.status || status);
    }, [mode, selectedEvent]);

    const loadCategories = () => {
        if (selectedEvent && selectedEvent.categories) {
            selectedEvent.categories.forEach(category => {
                setInitialCategory(category);
            });
        } else {
            setCategories([]);
        }
    };

    const setInitialCategory = (category: CategoriesType) => {
        setCategories(prevCategories => [...prevCategories, category]);
    };

    const handleCategory = (category: CategoriesType) => {
        const index = categories.findIndex(cat => cat.name === category.name);
        if (index === -1) {
            // Category not found, add it to the list
            setCategories([...categories, category]);
        } else {
            // Category found, remove it from the list
            const updatedCategories = [...categories];
            updatedCategories.splice(index, 1);
            setCategories(updatedCategories);
        }
    };

    return (
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <Form onSubmit={handleSubmit}>
                <Heading text={headingText} type={"heading1"} />
                <InputField
                    type={"text"}
                    id={"name"}
                    labelText={"Name"}
                    name={"name"}
                    error={nameError}
                    value={name}
                    disabled={mode === "view"}
                    onChange={handleChange}
                />
                <TextArea
                    rows={4}
                    name={"description"}
                    labelText="Description of event"
                    placeholder="Write your description here"
                    className="mb-4"
                    value={description}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}
                    disabled={mode === "view"}
                />

                <SelectForm
                    dropdownLabel="Select status"
                    options={statuses}
                    className="mb-4"
                    value={status}
                    onChange={setStatus}
                    disabled={mode === "view"}
                />
                <div className={"flex-1"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={"mb-5 flex gap-4"}>
                            <div className={"flex-1"}>
                                <DatePicker
                                    className={"w-full"}
                                    disabled={mode === "view"}
                                    label={"Starting date"}
                                    value={startingDate}
                                    onChange={(newValue) => setStartingDate(newValue)}
                                    views={["year", "month", "day"]}
                                />
                                {startingDateError && <span className="text-danger text-sm">{startingDateError}</span>}
                            </div>
                            <div className={"flex-1"}>
                                <TimePicker
                                    className={"w-full"}
                                    disabled={mode === "view"}
                                    label="Starting time"
                                    value={startingTime}
                                    onChange={(newValue) => setStartingTime(newValue)}
                                />
                                {startingTimeError && <span className="text-danger text-sm">{startingTimeError}</span>}
                            </div>
                            <div className={"flex-1"}>
                                <DatePicker
                                    className={"w-full"}
                                    disabled={mode === "view"}
                                    label={"Ending date"}
                                    value={endingDate}
                                    onChange={(newValue) => setEndingDate(newValue)}
                                    views={["year", "month", "day"]}
                                />
                                {endingDateError && <span className="text-danger text-sm">{endingDateError}</span>}
                            </div>
                            <div className={"flex-1"}>
                                <TimePicker
                                    className={"w-full"}
                                    disabled={mode === "view"}
                                    label="Ending time"
                                    value={endingTime}
                                    onChange={(newValue) => setEndingTime(newValue)}
                                />
                                {endingTimeError && <span className="text-danger text-sm">{endingTimeError}</span>}
                            </div>
                        </div>
                    </LocalizationProvider>
                </div>
                <Heading text={"Select categories"} type={"heading3"} className={"mt-2"} />
                <div>
                    {defaultCategories.map((category) => (
                        <CategoryTag
                            disabled={mode === "view"}
                            key={category.name}
                            text={category.name}
                            color={category.color}
                            onClick={() => mode !== "view" && handleCategory(category)}
                            selected={categories.some(cat => cat.id === category.id)} // Pass selected state to CategoryTag
                        />
                    ))}
                </div>
                {mode === "create" && (
                    <Button
                        text={"Add a new event"}
                        styleType={"info"}
                        className={"mt-5 justify-center"}
                        type="submit"
                    />
                )}
                {mode === "edit" && (
                    <Button
                        text={"Update event"}
                        styleType={"info"}
                        className={"mt-5 justify-center"}
                        type="submit"
                    />
                )}
            </Form>
        </ContentInnerContainer>
    );
};

export default EventForm;
