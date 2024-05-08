import {useEffect, useState} from "react";
import {dummyDataForTasks, TaskProps} from "../types";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {DateTimePicker} from "@mui/x-date-pickers";
interface TaskFormProps {
    selectedTask: TaskProps | null;
    mode: "create" | "edit" | "view";
    setMode: React.Dispatch<React.SetStateAction<"create" | "edit" | "view">>;
}
export const TaskForm: React.FC<TaskFormProps> = ({ selectedTask , mode, setMode}) => {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {name, value} = e.target;
        setName(value);
    };
    let headingText = '';

    // Determine the heading text based on the mode
    switch (mode) {
        case 'create':
            headingText = 'Add a task';
            break;
        case 'edit':
            headingText = 'Edit task: ' + selectedTask?.name;
            break;
        case 'view':
            headingText = 'View task: ' + selectedTask?.name;
            break;
        default:
            headingText = '';
    }




    const validate = () => {
        let valid = true;
        if (!name.trim() && selectedTask===null) {
            setNameError("Please enter a name");
            valid = false;
        } if (!deadlineDate && selectedTask===null) {
            setDateError("Select date");
            valid = false;
        } if (!deadlineTime && selectedTask===null) {
            setTimeError("Select time");
            valid = false;
        }
        return valid;
    };


    const handleSubmit = async () => {
        if (validate()) {
            const taskSubmitted:TaskProps = {
                name: name || selectedTask?.name || "",
                description: description || selectedTask?.description, // Use selectedTask data if description is not entered
                deadlineDate: deadlineDate || selectedTask?.deadlineDate || dayjs(), // Use selectedTask data or current date if deadlineDate is not entered
                deadlineTime: deadlineTime || selectedTask?.deadlineTime || dayjs(), // Use selectedTask data or current time if deadlineTime is not entered
                status: status || selectedTask?.status
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
    useEffect(() => {setNameError(""); setTimeError(""); setDateError("");
        setName(selectedTask?.name||name)
        setDeadlineDate(dayjs(selectedTask?.deadlineDate)||deadlineDate)
        setDeadlineTime(dayjs(selectedTask?.deadlineTime)||deadlineTime)
        setDescription(selectedTask?.description||description)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setStatus(selectedTask?.status||status) }, [mode, selectedTask]);
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
                    labelText="Description of task"
                    placeholder="Write your description here"
                    className="mb-4"
                    value={description}
                    //value={selectedTask ? selectedTask.description : description}
                    onChange={setDescription}
                    disabled={mode === "view"}/>

                <SelectForm
                    dropdownLabel="Select status"
                    options={statuses}
                    className="mb-4"
                    value={status}
                    //value={selectedTask ? selectedTask.status : status}
                    onChange={setStatus}
                    disabled={mode === "view"}/>


                <div className={"flex-1"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={"mb-5"}>
                            <DatePicker className={"w-full"} disabled={mode==="view"}
                                        label={"Deadline date"} value={deadlineDate}
                                        onChange={(newValue) => setDeadlineDate(newValue)} views={["year", "month", "day"]}/>
                            {dateError && <span className="text-danger text-sm">{dateError}</span>}
                        </div>
                        <div>
                            <TimePicker className={"w-full"} disabled={mode==="view"}  label="Basic time picker"
                                        value={deadlineTime}
                                        onChange={(newValue) => setDeadlineTime(newValue)} />
                            {timeError && <span className="text-danger text-sm">{timeError}</span>}
                        </div>
                    </LocalizationProvider>
                </div>

                {mode === "create" && ( <Button text={"Add a new task"} styleType={"info"} className={"mt-5 justify-center"}
                                                   type="submit"/>)}
                {mode === "edit" && ( <Button text={"Update task"} styleType={"info"} className={"mt-5 justify-center"}
                                                   type="submit"/>)}



                

            </Form>
        </ContentInnerContainer>
    );
}
