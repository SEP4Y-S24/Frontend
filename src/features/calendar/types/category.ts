export interface TagRequest {
    name: string;
    userId: string;
    colour: string;
}
export interface TagResponse {
    id: string;
    name: string;
    userId: string;
    colour:string;
}
export interface TagCollection {
    tags: TagResponse[];
}
