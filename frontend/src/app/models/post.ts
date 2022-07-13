import { Comment } from "./comment"
import { User } from "./user"

export class Post {
    _id!:string
    slug!:string
    title!:string
    content!:string
    date!:Date
    user!:User
    comments!:Array<Comment>
    status!:string

    constructor(init?: Partial<Post>) {
        Object.assign(this, init)
    }
}
