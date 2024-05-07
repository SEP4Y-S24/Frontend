import {useState} from "react";
import {dummyDataForTasks, TaskProps} from "../types";
import * as React from "react";
import * as z from "zod";
import {ContentInnerContainer} from "../../../components/Layout/ContentInnerContainer";
import {Form} from "react-router-dom";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import TextArea from "../../../components/Form/TextArea";
import SelectForm from "../../../components/Form/selectForm";
import Button from "../../../components/Elements/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, {Dayjs} from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";

export const TaskForm = () => {
    const statuses = [
        { id: 1, name: "Not started" },
        { id: 2, name: "In progress" },
        { id: 3, name: "Done" },
    ];
    const [nameError, setNameError] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [description, setDescription] = useState("");
    const [deadlineDate, setDeadlineDate] = React.useState<Dayjs | null>(null);
    const [deadlineTime, setDeadlineTime] = React.useState<Dayjs | null>(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState<{ id: number; name: string }>({
        id: 1,
        name: "Not started",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setName(value);
    };



    const validate = () => {
        let valid = true;

        if (!name.trim()) {
            setNameError("Please enter a name");
            valid = false;
        } if (!deadlineDate) {
            setDateError("Select date");
            valid = false;
        } if (!deadlineTime) {
            setTimeError("Select time");
            valid = false;
        }
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {

            const taskSubmitted:TaskProps = {
                name: name,
                description: description,
                deadlineDate: deadlineDate?.format('YYYY-MM-DD') ?? dayjs(),
                deadlineTime: deadlineTime?.format('HH:mm')?? dayjs(),
                status: status
            };
            console.log(taskSubmitted);
            dummyDataForTasks.push(taskSubmitted);
            setName("");
            setDeadlineTime(null);
            setDeadlineDate(null);
            setDescription("");
            setStatus({ id: 1, name: "Not started" })
        }
    };

    return (
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <Form onSubmit={handleSubmit}>
                <Heading text={"Add a task"} type={"heading1"} />
                <InputField type={"text"} id={"name"} labelText={"Name"} name={"name"}
                            error={nameError} value={name}
                            onChange={handleChange}/>
                <TextArea
                    rows={4}
                    name={"description"}
                    labelText="Description of task"
                    placeholder="Write your description here"
                    className="mb-4"
                    value={description}
                    onChange={setDescription}/>
                <SelectForm
                    dropdownLabel="Select status"
                    options={statuses}
                    className="mb-4"
                    value={status}
                    onChange={setStatus}/>


                <div className={"flex-1"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={"mb-5"}>
                            <DatePicker className={"w-full"} label={"Deadline date"} value={deadlineDate} onChange={(newValue) => setDeadlineDate(newValue)} views={undefined}/>
                            {dateError && <span className="text-danger text-sm">{dateError}</span>}
                        </div>
                        <div>
                            <TimePicker className={"w-full"}  label="Basic time picker" value={deadlineTime}
                                        onChange={(newValue) => setDeadlineTime(newValue)} />
                            {timeError && <span className="text-danger text-sm">{timeError}</span>}
                        </div>
                    </LocalizationProvider>
                </div>

                <Button text={"Add a new task"} styleType={"info"} className={"mt-5 justify-center"}
                        type="submit"/>
                

            </Form>
        </ContentInnerContainer>
    );
}
