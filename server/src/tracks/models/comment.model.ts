import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Track} from './track.model';

@Table
export class Comment extends Model {
    @Column({type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    username: string;

    @Column({type: DataType.TEXT})
    text: string;

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER.UNSIGNED, allowNull: false})
    track_id: number;

    @BelongsTo(() => Track)
    track: Track;
}