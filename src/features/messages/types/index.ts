export interface MessageProps {
    text: string;
    receiver: { id: string; name: string };
    clock: { id: string; name: string };
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

export interface MessageResponseProps {
    message: string;
    receiverId: string;
    clockId: string;
    userId: string;
}
export interface MessageResponseProps {
    message: string;
    receiverId: string;
    clockId: string;
    userId: string;
    senderAvatarId: number;
    receiverAvatarId: number;
    senderEmail: string;
    receiverEmail: string;
}


export interface MessagesResponseProps {
    messages: MessageResponseProps[];
}

