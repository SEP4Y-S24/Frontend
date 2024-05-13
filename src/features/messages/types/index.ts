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
  
export interface ReceivedMessageProps {
    senderEmail: string;
    text: string;
}


export interface SentMessagesProps {
    userEmail: string;
    text: string;
}

export let dummyDataSentMessages: SentMessagesProps[] = [
    {
        userEmail: "alice@example.com",
        text: "Hey, how are you?",
    },
    {
        userEmail: "bob@example.com",
        text: "Just checking in. Let me know if you need anything.",
    },
    {
        userEmail: "charlie@example.com",
        text: "Reminder: Our meeting is at 3 PM today.",
    },
]

  export let dummyDataReceivedMessages: ReceivedMessageProps[] = [
    {
        senderEmail:"alice@.gmail.com",
        text:"Hey, I hope you have a great day!",

    },
    {
        senderEmail:"max@.gmail.com",
        text:"Don't forget to get groceries!",

    },
    {
        senderEmail: "bob@example.com",
        text: "Just checking in. Let me know if you need anything.",
    },
    {
        senderEmail: "david@example.com",
        text: "Good morning! I sent you a message.",
    },
    

]