// Interfaces
import { Iuser } from './user';

export interface Itweet {
    _id: string
    content: string
    tweetBy: Iuser
    likes: Iuser[]
    comments: Iuser[]
    openOptions: boolean
}