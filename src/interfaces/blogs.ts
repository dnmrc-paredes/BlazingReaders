import { Iuser } from "./user";

export interface Iblog {
    createdBy: Iuser
    title: string
    content: string
    likes: Iuser[]
    comments: Iuser[]
    img: string
}