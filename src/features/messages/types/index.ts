export interface MessageProps {
    text: string;
    receiver: { id: number; name: string };
    clock: { id: number; name: string };
  }

  
export interface ReceivedMessageProps {
    name: string;
    text: string;
    imageSrc: string;
}