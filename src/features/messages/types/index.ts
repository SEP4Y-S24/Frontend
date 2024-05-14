export interface MessageProps {
    text: string;
    receiver: { id: number; name: string };
    clock: { id: number; name: string };
}
export interface SendMessageProps {
    message: string;
    receiverId: string;
    clockId: string;
    userId: string;
}
  
export interface ShowMessageProps {
    avatarId: number;
    email: string;
    text: string;
    type?:string
}



export let dummyDataSentMessages: ShowMessageProps[] = [
    {
        avatarId: 1,
        email: "alice@example.com",
        text: "Hey, how are you?",
    },
    {
        avatarId: 2,
        email: "bob@example.com",
        text: "Just checking in. Let me know if you need anything.",
    },
    {
        avatarId: 3,
        email: "charlie@example.com",
        text: "Reminder: Our meeting is at 3 PM today.",
    },
    {
        avatarId: 13,
        email: "charlie@example.com",
        text: "Reminder: Our meeting is at 3 PM today.",
    },
    {
        avatarId: 23,
        email: "charlie@example.com",
        text: "Reminder: Our meeting is at 3 PM today.",
    },
    {
        avatarId: 3,
        email: "charlie@example.com",
        text: "Reminder: Our meeting is at 3 PM today.",
    },
]

  export let dummyDataReceivedMessages: ShowMessageProps[] = [
    {
        avatarId: 1,
        email:"alice@.gmail.com",
        text:"Hey, I hope you have a great day!",

    },
    {
        avatarId: 4,
        email:"max@.gmail.com",
        text:"Don't forget to get groceries!",

    },
    {
        avatarId: 3,
        email: "bob@example.com",
        text: "Just checking in. Let me know if you need anything.",
    },
    {
        avatarId: 2,
        email: "david@example.com",
        text: "Good morning! I sent you a message.",
    },
    

]
