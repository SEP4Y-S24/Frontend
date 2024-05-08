
export interface TaskProps {
    name: string;
    deadlineDate: any;
    deadlineTime: any;
    description?: string;
    status: Status;
    onClick?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}
export interface Status{
    id: number;
    name: string;
}
export let dummyDataForTasks: TaskProps[] = [
    {
        "name": "Task 1",
        "description": "Task 1 description",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 2",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 2, name: "In progress" }
    },
    {
        "name": "Task 3",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 3, name: "Done" }
    },
    {
        "name": "Task 4",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T10:30'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 5",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 2, name: "In progress" }
    },
    {
        "name": "Task 6",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T18:30'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 7",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 3, name: "Done" }
    },
    {
        "name": "Task 7",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 3, name: "Done" }
    },
    {
        "name": "Task 8",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 3, name: "Done" }
    }
]
