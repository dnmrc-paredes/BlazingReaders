import { Iuser } from "./user";

export interface Iblog {
    _id: string
    createdBy: Iuser
    title: string
    content: string
    likes: Iuser[]
    comments: Iuser[]
    img: string
}