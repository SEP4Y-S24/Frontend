export interface MessageProps {
    text: string;
    receiver: { id: number; name: string };
    clock: { id: number; name: string };
}
export interface SentMessageProps {
    message: string;
    receiverId: string;
    clockId: string;
    userId: string;
}
  
export interface ReceivedMessageProps {
    name: string;
    text: string;
    imageSrc: string;
  }
