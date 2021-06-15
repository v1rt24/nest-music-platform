import {Column, Model, Table, DataType, HasMany} from 'sequelize-typescript';
import {Comment} from './comment.model';

@Table
export class Track extends Model {
    @Column({type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    artist: string;

    @Column({type: DataType.TEXT})
    text: string;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    listens: number;

    @Column({type: DataType.STRING})
    picture: string;

    @Column({type: DataType.STRING, allowNull: false})
    audio: string;

    @HasMany(() => Comment)
    comments: Comment[];
}