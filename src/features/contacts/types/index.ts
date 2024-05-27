export interface ContactProps {
    email: string; 
    avatarId: number;
    onDelete?: () => void;
    contact_id: string;
}


export interface ContactPropsResponse {
    userId: string;
    name: string;
    email: string;
    avatarId: number;
}


export interface ContactsPropsResponse {
    users: ContactPropsResponse[]
}
