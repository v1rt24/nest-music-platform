import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {Track} from './models/track.model';
import {Comment} from './models/comment.model';
import {TracksService} from './tracks.service';
import {CreateTrackDto} from './dto/create-track.dto';
import {CreateCommentDto} from './dto/create-comment.dto';
import {FileFieldsInterceptor} from '@nestjs/platform-express';

@Controller('tracks')
export class TracksController {
    constructor(private tracksService: TracksService) {
    }

    // Добавление песни
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1},
    ]))
    create(@Body() dto: CreateTrackDto, @UploadedFiles() files): Promise<Track> {
        const {picture, audio} = files;
        return this.tracksService.create(dto, picture[0], audio[0]);
    }

    // Выбор всех песен c пагинацией(постраничная навигация)
    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number): Promise<Track[]> {
        return this.tracksService.getAll(count, offset);
    }

    // Поиск по сайту
    @Get('search')
    search(@Query('query') query: string): Promise<Track[]> {
        return this.tracksService.search(query);
    }

    // Выбор песни по её id
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Track> {
        return this.tracksService.getOne(id);
    }

    // Удаление песни по её id
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.tracksService.delete(id);
    }

    // Добавление комментария
    @Post('comment')
    addComment(@Body() dto: CreateCommentDto): Promise<Comment> {
        return this.tracksService.addComment(dto);
    }

    // Увеличение счётчика прослушивания
    @Post('listen/:id')
    addListen(@Param('id') id: string) {
        return this.tracksService.addListen(id);
    }

}
