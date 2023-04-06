import { Entity, Column } from 'typeorm';
import BaseModel from './baseModel';

@Entity('url')
export default class Url extends BaseModel {
    @Column({
        type: 'text',
        length: 2000
    })
    link: string

    @Column({
        name: 'user_id'
    })
    userId: string
}