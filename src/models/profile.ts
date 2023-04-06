import { Entity, Column } from 'typeorm';
import BaseModel from './baseModel';

@Entity('profile')
export default class Profile extends BaseModel {
    @Column({
        type: 'text',
        length: 2000,
        nullable: true
    })
    description: string

    @Column({
        name: 'user_id',
        unique: true
    })
    userId: number

    @Column()
    name: string

    @Column({
        nullable: true
    })
    location: string

    @Column({
        type: 'text',
        length: 500,
        nullable: true
    })
    school: string

    @Column({
        type: 'text',
        length: 500,
        nullable: true
    })
    work: string

    @Column({
        nullable: true,
        name: 'ig_id'
    })
    igId: string

    @Column({
        nullable: true,
        name: 'snap_id'
    })
    snapId: string

    @Column()
    age: number

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    interests: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic1: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic2: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic3: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic4: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic5: string
}