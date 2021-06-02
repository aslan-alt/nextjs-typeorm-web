import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { getDatabaseConnection } from "lib/getDatabaseConnection";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(type => Post, post => post.author)
    posts: Post[]
    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[]
    errors = { username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[] }
    passwordConfirmation: string
    password: string

    async validate() {

        if (this.username.trim() === '') {
            this.errors.username.push('不能为空')
        }
        if (!/[a-zA-z0-9]/.test(this.username.trim())) {
            this.errors.username.push('格式错误')
        }
        if (this.username.trim().length > 42) {
            this.errors.username.push('超过最大长度')
        }
        if (this.username.trim().length <= 3) {
            this.errors.username.push('低于最小长度')
        }
        const found = (await (await getDatabaseConnection()).manager.find(User, { username: this.username }))
        if (found.length > 0) {
            this.errors.username.push('用户名已存在')
        }
        if (this.password === '') {
            this.errors.password.push('不能为空')
        }
        if (this.passwordConfirmation !== this.password) {
            this.errors.passwordConfirmation.push('两次密码不一致')
        }
    }
    hasErrors() {
        console.log('this.errors-----------')
        console.log(this.errors)
        return (!!Object.values(this.errors).find(v => v.length > 0))
    }
}
