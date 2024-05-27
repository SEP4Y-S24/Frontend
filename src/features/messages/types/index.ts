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
    //avatarId: number;
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
export interface MessagesResponseProps {
    userID: string;
    messages: MessageResponseProps[];
}
