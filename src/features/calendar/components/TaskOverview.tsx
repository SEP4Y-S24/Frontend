import { useEffect, useMemo, useState } from "react";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import Heading from "../../../components/Elements/Headings/Heading";
import Badge from "../../../components/Elements/Badge/Badge";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import * as React from "react";
import {TaskProps, CategoriesType, dummyCategories} from "../types";
import { EyeIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Task: React.FC<TaskProps> = ({
                                       name,
                                       deadlineDate,
                                       deadlineTime,
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
                    <EyeIcon className="text-dark h-5 w-5 mr-1 cursor-pointer" onClick={onClick} />
                </div>
                <div>
                    <PencilSquareIcon className="text-dark h-5 w-5 cursor-pointer" onClick={onEdit} />
                </div>
                <div>
                    <XMarkIcon className="text-dark h-5 w-5 cursor-pointer" onClick={onDelete} />
                </div>
            </div>
        </div>
    );
};

interface TaskOverviewProps {
    setSelectedTask: React.Dispatch<React.SetStateAction<TaskProps | null>>;
    tasks: TaskProps[] | null;
    setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
    setMode: React.Dispatch<React.SetStateAction<"create" | "edit" | "view">>;
}

export const TaskOverview: React.FC<TaskOverviewProps> = ({ setSelectedTask, tasks, setTasks, setMode }) => {
    const [statusFilters, setStatusFilters] = useState<{ [key: string]: boolean }>({
        "Not started": false,
        "In progress": false,
        "Done": false
    });
    const categories = dummyCategories;
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredTasks = useMemo(() => {
        if (!tasks) return [];
        return tasks.filter(task => {
            const statusMatch = statusFilters[task.status.name] || !Object.values(statusFilters).some(value => value);
            const categoryMatch = selectedCategory === "All" || task.categories?.some(category => category.name === selectedCategory);
            return statusMatch && categoryMatch;
        });
    }, [tasks, statusFilters, selectedCategory]);

    const handleStatusFilterChange = (filter: string) => {
        setStatusFilters(prevFilters => ({
            ...prevFilters,
            [filter]: !prevFilters[filter]
        }));
    };

    const handleCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const renderTasks = () => {
        if (filteredTasks.length === 0) {
            return <p>No tasks</p>;
        }
        return filteredTasks.map((task, index) => (
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
        ));
    };

    const handleTaskClick = (task: TaskProps) => {
        setSelectedTask(task);
        setMode("view");
        console.log("Selected task", task)
    };

    const handleTaskEdit = (task: TaskProps) => {
        setSelectedTask(task);
        setMode("edit");
        console.log("Selected task for editing", task)
    };

    const handleTaskDelete = (taskToDelete: TaskProps) => {
        const updatedTasks = tasks ? tasks.filter(task => task !== taskToDelete) : [];
        setTasks(updatedTasks);
        setMode("create");
        console.log("Deleted task", taskToDelete)
    };

    const handleTaskAdd = () => {
        setMode("create");
        setSelectedTask(null);
    };

    useEffect(() => {
    }, [tasks]);

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
                <Heading text={"Tasks"} type={"heading1"} />
                <div>
                    <PlusIcon className="text-dark h-5 w-5 cursor-pointer" onClick={handleTaskAdd} />
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
                <select id="categoryFilter" value={selectedCategory} className="appearance-none bg-transparent border border-stroke rounded px-2  focus:outline-none cursor-pointer" onChange={handleCategoryFilterChange}>
                    <option value="All">All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            {renderTasks()}
            <PaginationRounded
                page={1}
                onChange={() => {}} // handle page
                className="flex flex-col items-center"
                pages={Math.ceil(filteredTasks.length / 7)} // adjust tasksPerPage accordingly
            />
        </ContentInnerContainer>
    );
};
