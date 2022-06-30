import { Post } from "./post"

export class User {
    _id!:string
    username!:string
    firstName!:string
    lastName!:string
    email!:string
    password!:string
    avatar!:string
    date!:Date
    posts!:Post[]
    comments!:Comment[]
    status!:string

    constructor(init?: Partial<User>) {
        Object.assign(this, init)
    }
}
