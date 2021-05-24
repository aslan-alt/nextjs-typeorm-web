import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('int')
    userId: number;
    @Column('int')
    postId: number
    @Column('text')
    content: string;
    @ManyToOne(type => User, user => user.comments)
    user: User
    @ManyToOne(type => Post, post => post.comment)
    post: Post
}
