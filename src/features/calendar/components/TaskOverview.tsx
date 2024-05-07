import {useEffect, useState} from "react";
import {ContentInnerContainer} from "../../../components/Layout/ContentInnerContainer";
import Heading from "../../../components/Elements/Headings/Heading";
import Badge from "../../../components/Elements/Badge/Badge";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import * as React from "react";
import {dummyDataForTasks, TaskProps} from "../types";
import {XMarkIcon} from "@heroicons/react/24/outline";
const Task: React.FC<TaskProps> = ({
                                       name,
                                       deadlineDate,
                                       deadlineTime,
                                       status,
    onDelete,
    onClick,
                                   }) => {
    function getStyleTypeByStatus(status:string) {
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
        <div onClick={onClick} className="flex items-center justify-between space-x-3 px-3 py-1 my-2 bg-whiteHover hover:bg-background rounded">
            <div>
                <Heading text={name} type={"heading3"}/>
                <Heading text={"Deadline: " + deadlineDate + " at: " + deadlineTime } type={"heading5"}/>
            </div>
            <div>
                <Badge text={status.name} styleType={getStyleTypeByStatus(status.name)} isFilled={false}/>
            </div>
            <div>
                <XMarkIcon className={"text-primaryColor h-5 w-5"} onClick={onDelete}/>
            </div>
        </div>
    );
};
export const TaskOverview = () => {
    const [isNotStarted, setIsNotStarted] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [tasks, setTasks] = useState<TaskProps[]>(dummyDataForTasks);
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);

    const handleTaskClick = (task:TaskProps) => {
        setSelectedTask(task);
        console.log("Selected task", task)
    };
    const handleTaskDelete = (taskToDelete:TaskProps) => {
        const updatedTasks = tasks.filter(task => task !== taskToDelete);
        setTasks(updatedTasks);
        console.log("Deleted task", taskToDelete)
    };
    const handleFilterIsNotStarted = () => {
        setIsNotStarted(!isNotStarted);
    };
    const handleFilterIsInProgress = () => {
        setIsInProgress(!isInProgress);
    };
    const handleFilterIsDone = () => {
        setIsDone(!isDone);
    };
    useEffect(() => {
        console.log("Tasks", tasks)
    }, [tasks]);
return (
    <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <Heading text={"Tasks"} type={"heading1"} />
        <Badge styleType={"warning"} isFilled={isNotStarted} text={"Not started"} onClick={handleFilterIsNotStarted}/>
        <Badge styleType={"info"} isFilled={isInProgress} text={"In progress"} onClick={handleFilterIsInProgress}/>
        <Badge styleType={"success"} isFilled={isDone} text={"Done"} onClick={handleFilterIsDone}/>
        {tasks.map((task, index) => (
            <Task key={index} name={task.name} deadlineDate={task.deadlineDate}  onDelete={() => handleTaskDelete(task)}
                  deadlineTime={task.deadlineTime} status={task.status} onClick={() => handleTaskClick(task)}/>
        ))}
        <PaginationRounded className="flex flex-col items-center" pages={1} />
    </ContentInnerContainer>
);
};
