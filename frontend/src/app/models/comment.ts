import { Post } from "./post"
import { User } from "./user"

export class Comment {
    _id!:string
    content!:string
    date!:Date
    user!:User
    post!:Post

    constructor(init?: Partial<Comment>) {
        Object.assign(this, init)
    }
}
