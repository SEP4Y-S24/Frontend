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
export interface EventProps {
    name: string;
    startingDate: any;
    startingTime: any;
    endingDate: any;
    endingTime: any;
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
        color: "#826AED"
    },
    {
        id: 2,
        name: "Electronics",
        color: "#C879FF"
    },
    {
        id: 3,
        name: "Clothing",
        color: "#FFB7FF"
    },
    {
        id: 4,
        name: "School",
        color: "#3BF4FB"
    },
    {
        id: 5,
        name: "Food",
        color: "#CAFF8A"
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
        categories: [{id: 6,
            name: "Whatever",
            color: "#DC54CB"}]
    },
    {
        "name": "Task 2",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 2, name: "In progress" },
        categories:[
            { id: 5,
                name: "Food",
                color: "#CAFF8A"}, {id: 4,
                name: "School",
                color: "#3BF4FB"}
        ]
    },
    {
        "name": "Task 3",
        "deadlineDate": ('2022-04-17'),
        "deadlineTime": ('2022-04-17T15:30'),
        status: { id: 3, name: "Done" },
        categories: [{  id: 5,
            name: "Food",
            color: "#CAFF8A"}, {
            id: 4,
            name: "School",
            color: "#3BF4FB"
        }]
    },
    {
        "name": "Task 4",
        "deadlineDate": ('2024-04-17'),
        "deadlineTime": ('2024-04-17T10:30'),
        status: { id: 1, name: "Not started" },
        categories: [{  id: 5,
            name: "Food",
            color: "#CAFF8A"}, {
            id: 4,
            name: "School",
            color: "#3BF4FB"
        },
            {id: 2,
                name: "Electronics",
                color: "#C879FF"}]
    },
    {
        "name": "Task 5",
        "deadlineDate": ('2024-04-17'),
        "deadlineTime": ('2024-04-17T15:30'),
        status: { id: 2, name: "In progress" },
        categories: [{  id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 4,
            name: "School",
            color: "#3BF4FB"
        }]
    },
    {
        "name": "Task 6",
        "deadlineDate": ('2024-04-17'),
        "deadlineTime": ('2024-04-17T18:30'),
        status: { id: 1, name: "Not started" },
        categories: [{  id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 2,
            name: "Electronics",
            color: "#C879FF"
        }, ]
    },
    {
        "name": "Task 7",
        "deadlineDate": ('2024-04-17'),
        "deadlineTime": ('2024-04-17T15:30'),
        status: { id: 3, name: "Done" },
        categories: [{ id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 2,
            name: "Electronics",
            color: "#C879FF"
        }]
    }
]

export let dummyDataForEvents: EventProps[] = [
    {
        "name": "Event 1",
        "description": "Event 1 description",
        "startingDate": ('2024-04-17'),
        "startingTime": ('2024-04-17T15:30'),
        "endingDate": ('2024-04-18'),
        "endingTime": ('2024-04-18T15:30'),
        status: { id: 1, name: "Not started" },
        categories: [{id: 6,
            name: "Whatever",
            color: "#DC54CB"}]
    },
    {
        "name": "Event 2",
        "startingDate": ('2024-04-19'),
        "startingTime": ('2024-04-19T15:30'),
        "endingDate": ('2024-04-20'),
        "endingTime": ('2024-04-20T15:30'),
        status: { id: 2, name: "In progress" },
        categories:[
            { id: 5,
                name: "Food",
                color: "#CAFF8A"}, {id: 4,
                name: "School",
                color: "#3BF4FB"}
        ]
    },
    {
        "name": "Event 3",
        "startingDate": ('2024-04-21'),
        "startingTime": ('2024-04-21T15:30'),
        "endingDate": ('2024-04-22'),
        "endingTime": ('2024-04-22T15:30'),
        status: { id: 3, name: "Done" },
        categories: [{  id: 5,
            name: "Food",
            color: "#CAFF8A"}, {
            id: 4,
            name: "School",
            color: "#3BF4FB"
        }]
    },
    {
        "name": "Event 4",
        "startingDate": ('2024-04-23'),
        "startingTime": ('2024-04-3=23T15:30'),
        "endingDate": ('2024-04-25'),
        "endingTime": ('2024-04-25T15:30'),
        status: { id: 1, name: "Not started" },
        categories: [{  id: 5,
            name: "Food",
            color: "#CAFF8A"}, {
            id: 4,
            name: "School",
            color: "#3BF4FB"
        },
            {id: 2,
                name: "Electronics",
                color: "#C879FF"}]
    },
    {
        "name": "Event 5",
        "startingDate": ('2024-04-26'),
        "startingTime": ('2024-04-26T15:30'),
        "endingDate": ('2024-04-27'),
        "endingTime": ('2024-04-27T15:30'),
        status: { id: 2, name: "In progress" },
        categories: [{  id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 4,
            name: "School",
            color: "#3BF4FB"
        }]
    },
    {
        "name": "Event 6",
        "startingDate": ('2024-04-28'),
        "startingTime": ('2024-04-28T15:30'),
        "endingDate": ('2024-04-28'),
        "endingTime": ('2024-04-28T15:30'),
        status: { id: 1, name: "Not started" },
        categories: [{  id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 2,
            name: "Electronics",
            color: "#C879FF"
        }, ]
    },
    {
        "name": "Event 7",
        "startingDate": ('2024-04-29'),
        "startingTime": ('2024-04-29T15:30'),
        "endingDate": ('2024-04-30'),
        "endingTime": ('2024-04-30T15:30'),
        status: { id: 3, name: "Done" },
        categories: [{ id: 6,
            name: "Whatever",
            color: "#DC54CB"}, {
            id: 2,
            name: "Electronics",
            color: "#C879FF"
        }]
    }
]
