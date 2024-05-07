import dayjs, {Dayjs} from "dayjs";

export interface TaskProps {
    name: string;
    deadlineDate: any;
    deadlineTime: any;
    description?: string;
    status: Status;
    onClick?: () => void;
    onDelete?: () => void;
}
export interface Status{
    id: number;
    name: string;
}
export let dummyDataForTasks: TaskProps[] = [
    {
        "name": "Task 1",
        "description": "Task 1 description",
        "deadlineDate": dayjs('2022-04-17'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 2",
        "deadlineDate": dayjs('2024-05-06'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 3",
        "deadlineDate": dayjs('2024-05-06'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 3, name: "Done" }
    },
    {
        "name": "Task 4",
        "deadlineDate": dayjs('2024-05-06'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 5",
        "deadlineDate": dayjs('2024-05-06'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 6",
        "deadlineDate": dayjs('2024-05-06'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 1, name: "Not started" }
    },
    {
        "name": "Task 7",
        "deadlineDate": dayjs('2024-05-06'),
        "deadlineTime": dayjs('2024-05-06T12:00:00'),
        status: { id: 3, name: "Done" }
    },
]
