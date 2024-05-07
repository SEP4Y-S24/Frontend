
import { ContentLayout } from "../components/Layout/ContentLayout";

import * as React from "react";

import {TaskOverview} from "../features/calendar/components/TaskOverview";
import {TaskForm} from "../features/calendar/components/TaskForm";


export const Tasks = () => {

    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
               <TaskOverview/>
                <TaskForm/>
            </ContentLayout>
        </>
    );
};
