import { Iblog } from "./blogs";

export interface Iuser {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    myBlogs: Iblog[]
    isEdit: boolean
    following: Iuser[]
    followers: Iuser[]
}
