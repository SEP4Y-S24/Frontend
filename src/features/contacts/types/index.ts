export interface ContactProps {
    email: string; 
    imageSrc: string;
    onDelete?: () => void;
    index?: number;
}


export interface ContactPropsResponse {
    id: string;
    email: string; 
    imageSrc: string;
}


export interface ContactsPropsResponse {
    contacts: ContactPropsResponse[]
}


export const dummyContacts: ContactPropsResponse[] = [
    {
        id: "1",
        email: "john@example.com",
        imageSrc: "https://example.com/john.jpg",
    },
    {
        id: "2",
        email: "jane@example.com",
        imageSrc: "https://example.com/jane.jpg",
    }
]


export function getDummyContacts(): ContactsPropsResponse {
    return { contacts: dummyContacts };
}