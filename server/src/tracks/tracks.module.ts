import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Track} from './models/track.model';
import {Comment} from './models/comment.model';
import {TracksController} from './tracks.controller';
import {TracksService} from './tracks.service';
import {FilesService} from '../files/files.service';

@Module({
    controllers: [TracksController],
    providers: [TracksService, FilesService],
    imports: [
        SequelizeModule.forFeature([Track, Comment]),
    ],
})
export class TracksModule {
}
