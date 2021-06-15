import {SequelizeModule} from '@nestjs/sequelize';
import {Track} from './tracks/models/track.model';
import {Comment} from './tracks/models/comment.model';

export const connectDb = SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'v1rt24_music',
    autoLoadModels: true,
    models: [
        Track,
        Comment,
    ],
});