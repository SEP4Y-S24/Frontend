
import { ContentLayout } from "../components/Layout/ContentLayout";

import * as React from "react";

import {TaskOverview} from "../features/calendar/components/TaskOverview";
import {TaskForm} from "../features/calendar/components/TaskForm";
import {useEffect, useState} from "react";
import {dummyDataForTasks, TaskProps} from "../features/calendar/types";


export const Tasks = () => {

    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
    const [tasks, setTasks] = useState<TaskProps[]>(dummyDataForTasks);
    const [mode, setMode] = useState<"create" | "edit" | "view" >("create");
    useEffect(() => {
    }, [tasks]);
    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <TaskOverview selectedTask={selectedTask} setSelectedTask={setSelectedTask} tasks={tasks} setTasks={setTasks} setMode={setMode}/>
                <TaskForm selectedTask={selectedTask} mode={mode} setMode={setMode}/>
            </ContentLayout>
        </>
    );
};
