import {useEffect, useState} from "react";
import {CategoriesType, dummyCategories, dummyDataForEvents, EventProps} from "../../types";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as z from "zod";
import {ContentInnerContainer} from "../../../../components/Layout/ContentInnerContainer";
import {Form} from "react-router-dom";
import Heading from "../../../../components/Elements/Headings/Heading";
import InputField from "../../../../components/Form/InputField";
import TextArea from "../../../../components/Form/TextArea";
import SelectForm from "../../../../components/Form/selectForm";
import Button from "../../../../components/Elements/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, {Dayjs} from "dayjs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {DateTimePicker} from "@mui/x-date-pickers";
import CategoryTag from "../CategoryTag";
interface EventFormProps {
    selectedEvent: EventProps | null;
    mode: "create" | "edit" | "view";
}
export const EventForm: React.FC<EventFormProps> = ({ selectedEvent , mode}) => {
    const statuses = [
        { id: 1, name: "Not started" },
        { id: 2, name: "In progress" },
        { id: 3, name: "Done" },
    ];
    const defaultCategories = dummyCategories;
    const [categories, setCategories] = useState<CategoriesType[]>( []);
    const [nameError, setNameError] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [description, setDescription] = useState("");
    const [startingDate, setStartingDate] = React.useState<Dayjs | null>(null);
    const [startingTime, setStartingTime] = React.useState<Dayjs | null>(null);
    const [endingDate, setEndingDate] = React.useState<Dayjs | null>(null);
    const [endingTime, setEndingTime] = React.useState<Dayjs | null>(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState<{ id: number; name: string }>({
        id: 1,
        name: "Not started",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {name, value} = e.target;
        setName(value);
    };
    let headingText = '';
    // Determine the heading text based on the mode
    switch (mode) {
        case 'create':
            headingText = 'Add a event';
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
    const validate = () => {
        let valid = true;
        if (!name.trim() && selectedEvent===null) {
            setNameError("Please enter a name");
            valid = false;
        } if (!startingDate && selectedEvent===null) {
            setDateError("Select date");
            valid = false;
        } if (!startingTime && selectedEvent===null) {
            setTimeError("Select time");
            valid = false;
        } if (!endingDate && selectedEvent===null) {
            setDateError("Select date");
            valid = false;
        } if (!endingTime && selectedEvent===null) {
            setTimeError("Select time");
            valid = false;
        }
        return valid;
    };


    const handleSubmit = async () => {
        if (validate()) {
            const eventSubmitted:EventProps = {
                name: name || selectedEvent?.name || "",
                description: description || selectedEvent?.description, // Use selectedEvent data if description is not entered
                startingDate: startingDate || selectedEvent?.startingDate || dayjs(), // Use selectedEvent data or current date if startingDate is not entered
                startingTime: startingTime || selectedEvent?.startingTime || dayjs(), // Use selectedEvent data or current time if startingTime is not entered
                endingDate: endingDate || selectedEvent?.endingDate || dayjs(), // Use selectedEvent data or current date if endingDate is not entered
                endingTime: endingTime || selectedEvent?.endingTime || dayjs(), // Use selectedEvent data or current time if endingTime is not entered
                status: status || selectedEvent?.status,
                categories: categories || selectedEvent?.categories || [],
            };
            console.log(categories);
            console.log(eventSubmitted);
            dummyDataForEvents.push(eventSubmitted);
            setName("");
            setStartingTime(null);
            setStartingDate(null);
            setEndingTime(null);
            setEndingDate(null);
            setDescription("");
            setStatus({ id: 1, name: "Not started" })
        }
    };
    useEffect(() => {setNameError(""); setTimeError(""); setDateError("");
        setName(selectedEvent?.name||name)
        setStartingDate(dayjs(selectedEvent?.startingDate)||startingDate)
        setStartingTime(dayjs(selectedEvent?.startingTime)||startingTime)
        setEndingDate(dayjs(selectedEvent?.endingDate)||endingDate)
        setEndingTime(dayjs(selectedEvent?.endingTime)||endingTime)
        setDescription(selectedEvent?.description||description)
        setCategories(selectedEvent?.categories||categories);
        let nameValue = selectedEvent?.name || "";
        setName(nameValue);
        let descValue = selectedEvent?.description || "";
        setDescription(descValue);
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setStatus(selectedEvent?.status||status) }, [mode, selectedEvent]);
    const loadCategories = () => {
        if (selectedEvent && selectedEvent.categories) {
            selectedEvent.categories.forEach(category => {
                setInitialCategory(category);
            });
        }
        else{
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
                <InputField type={"text"} id={"name"} labelText={"Name"} name={"name"}
                            error={nameError}  value={name} disabled={mode === "view"}
                            onChange={handleChange}/>
                <TextArea
                    rows={4}
                    name={"description"}
                    labelText="Description of event"
                    placeholder="Write your description here"
                    className="mb-4"
                    value={description}
                    //value={selectedEvent ? selectedEvent.description : description}
                    onChange={setDescription}
                    disabled={mode === "view"}/>

                <SelectForm
                    dropdownLabel="Select status"
                    options={statuses}
                    className="mb-4"
                    value={status}
                    //value={selectedEvent ? selectedEvent.status : status}
                    onChange={setStatus}
                    disabled={mode === "view"}/>
                <div className={"flex-1"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={"mb-5 flex gap-4"}>
                            <div className={"flex-1"}>
                                <DatePicker className={"w-full"} disabled={mode === "view"}
                                            label={"Starting date"} value={startingDate}
                                            onChange={(newValue) => setStartingDate(newValue)}
                                            views={["year", "month", "day"]}/>
                                {dateError && <span className="text-danger text-sm">{dateError}</span>}
                            </div>
                            <div className={"flex-1"}>
                                <TimePicker className={"w-full"} disabled={mode === "view"} label="Starting time"
                                            value={startingTime}
                                            onChange={(newValue) => setStartingTime(newValue)}/>
                                {timeError && <span className="text-danger text-sm">{timeError}</span>}
                            </div>
                            <div className={"flex-1"}>
                                <DatePicker className={"w-full"} disabled={mode === "view"}
                                            label={"Ending date"} value={endingDate}
                                            onChange={(newValue) => setEndingDate(newValue)}
                                            views={["year", "month", "day"]}/>
                                {dateError && <span className="text-danger text-sm">{dateError}</span>}
                            </div>
                            <div className={"flex-1"}>
                                <TimePicker className={"w-full"} disabled={mode === "view"} label="Ending time"
                                            value={endingTime}
                                            onChange={(newValue) => setEndingTime(newValue)}/>
                                {timeError && <span className="text-danger text-sm">{timeError}</span>}
                            </div>
                        </div>
                    </LocalizationProvider>
                </div>
                <Heading text={"Select category"} type={"heading3"} className={"mt-2"}/>
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
                    <Button text={"Add a new event"} styleType={"info"} className={"mt-5 justify-center"}
                            type="submit"/>)}
                {mode === "edit" && ( <Button text={"Update event"} styleType={"info"} className={"mt-5 justify-center"}
                                              type="submit"/>)}
            </Form>
        </ContentInnerContainer>
    );
}
