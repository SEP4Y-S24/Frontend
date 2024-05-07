import {useEffect, useState} from "react";
import {ContentInnerContainer} from "../../../components/Layout/ContentInnerContainer";
import Heading from "../../../components/Elements/Headings/Heading";
import Badge from "../../../components/Elements/Badge/Badge";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import * as React from "react";
import {dummyDataForTasks, TaskProps} from "../types";
import {EyeIcon, PencilSquareIcon, PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
const Task: React.FC<TaskProps> = ({
                                       name,
                                       deadlineDate,
                                       deadlineTime,
                                       status,
    onDelete,
    onClick,
    onEdit,
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
        <div className="flex items-center justify-between space-x-3 px-3 py-1 my-2 bg-whiteHover hover:bg-background rounded">
            <div>
                <Heading text={name} type={"heading3"} />
                <Heading text={"Deadline: " + deadlineDate + " at: " + deadlineTime} type={"heading5"} />
            </div>
            <div>
                <Badge text={status.name} styleType={getStyleTypeByStatus(status.name)} isFilled={false} />
            </div>
            <div className="flex items-center space-x-2">
                <div>
                    <EyeIcon className="text-dark h-5 w-5 mr-1" onClick={onClick} />
                </div>
                <div>
                    <PencilSquareIcon className="text-dark h-5 w-5" onClick={onEdit} />
                </div>
                <div>
                    <XMarkIcon className="text-dark h-5 w-5" onClick={onDelete} />
                </div>
            </div>
        </div>

    );
};
interface TaskOverviewProps {
    selectedTask: TaskProps | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<TaskProps | null>>;
    tasks: TaskProps[] | null;
    setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
    setMode: React.Dispatch<React.SetStateAction<"create" | "edit" | "view">>;
}
export const TaskOverview: React.FC<TaskOverviewProps> = ({ selectedTask, setSelectedTask, tasks, setTasks, setMode }) => {
    const [isNotStarted, setIsNotStarted] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 7;


    const handleTaskClick = (task:TaskProps) => {
        setSelectedTask(task);
        setMode("view");
        console.log("Selected task", task)
    };
    const handleTaskEdit = (task:TaskProps) => {
        setSelectedTask(task);
        setMode("edit");
        console.log("Selected task for editting", task)
    };
    const handleTaskDelete = (taskToDelete:TaskProps) => {
        const updatedTasks = tasks?tasks.filter(task => task !== taskToDelete):[];
        setTasks(updatedTasks);
        setMode("create");
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
    const handleTaskAdd = () => {
        setMode("create");
        setSelectedTask(null);
    };
    useEffect(() => {
    }, [tasks]);

return (
    <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <div className="flex justify-between items-center">
            <Heading text={"Tasks"} type={"heading1"} />
            <div>
                <PlusIcon className="text-dark h-5 w-5" onClick={handleTaskAdd} />
            </div>
        </div>
        <Badge styleType={"warning"} isFilled={isNotStarted} text={"Not started"} onClick={handleFilterIsNotStarted}/>
        <Badge styleType={"info"} isFilled={isInProgress} text={"In progress"} onClick={handleFilterIsInProgress}/>
        <Badge styleType={"success"} isFilled={isDone} text={"Done"} onClick={handleFilterIsDone}/>
        {tasks
            ? tasks
                .slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)
                .map((task, index) => (
                    <Task
                        key={index}
                        name={task.name}
                        deadlineDate={task.deadlineDate}
                        onDelete={() => handleTaskDelete(task)}
                        deadlineTime={task.deadlineTime}
                        onEdit={() => handleTaskEdit(task)}
                        status={task.status}
                        onClick={() => handleTaskClick(task)}
                    />
                ))
            : <p>No tasks</p>
        }
        <PaginationRounded
            //page={currentPage} onChange={(page:any) => setCurrentPage(page)}
                           className="flex flex-col items-center"
                           pages={1}
                           />
    </ContentInnerContainer>
);
};
