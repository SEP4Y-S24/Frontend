export interface TaskProps {
    name: string;
    deadlineDate: any;
    deadlineTime: any;
    description?: string;
    status: Status;
    onClick?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
    categories?: CategoriesType[];
}
export interface Status{
    id: number;
    name: string;
}
export interface CategoriesType {
    id?:number;
    name: string;
    color: string;
    onClick?: () => void;
}

export const dummyCategories: CategoriesType[] = [
    {
        id: 1,
        name: "Books",
        color: "#000000"
    },
    {
        id: 2,
        name: "Electronics",
        color: "#33FF57"
    },
    {
        id: 3,
        name: "Clothing",
        color: "#147663"
    },
    {
        id: 4,
        name: "School",
        color: "#637614"
    },
    {
        id: 5,
        name: "Food",
        color: "#76146A"
    },
    {
        id: 6,
        name: "Whatever",
        color: "#DC54CB"
    }
];

export let dummyDataForTasks: TaskProps[] = [
    {
        "name": "Task 1",
        "description": "Task 1 description",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 1, name: "Not started" },
        categories: [{id: 4,
            name: "School",
            color: "#637614"}]
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
        status: { id: 3, name: "Done" },
        categories: [{  id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 1,
            name: "Books",
            color: "#000000"
        }]
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
    }
]
