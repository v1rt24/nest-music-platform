import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Track} from './models/track.model';
import {Comment} from './models/comment.model';
import {CreateTrackDto} from './dto/create-track.dto';
import {CreateCommentDto} from './dto/create-comment.dto';

import {FilesService, FileType} from '../files/files.service';

// для применения операторов
import {Op} from 'sequelize';

@Injectable()
export class TracksService {
    constructor(
        @InjectModel(Track)
        private readonly trackModel: typeof Track,
        @InjectModel(Comment)
        private readonly commentModel: typeof Comment,
        private readonly filesService: FilesService,
    ) {
    }

    // Добавление песни
    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        try {
            const picturePath = this.filesService.create(FileType.IMAGE, picture);
            const audioPath = this.filesService.create(FileType.AUDIO, audio);
            return await this.trackModel.create({...dto, picture: picturePath, audio: audioPath});
        } catch (error) {
            console.log(error);
        }
    }

    // Выбор всех песен c пагинацией(постраничная навигация)
    async getAll(count = 10, offset = 0): Promise<Track[]> {
        try {
            return await this.trackModel.findAll({offset: +offset, limit: +count});
        } catch (error) {
            console.log(error);
        }
    }

    // Выбор песни по её id
    async getOne(id: string): Promise<Track> {
        try {
            const track = await this.trackModel.findByPk(id, {include: {all: true}});

            if (!track) {
                throw 'Песня не найдена';
            }

            return track;
        } catch (error) {
            throw new HttpException({
                statusCode: 404,
                message: error,
                codeError: 'TrackNotFound',
            }, 404);
        }
    }

    // Поиск по сайту
    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.findAll({
            where: {
                name: {[Op.substring]: query},
            },
        });

        return tracks;
    }

    // Удаление песни по её id
    async delete(id: string): Promise<void> {
        try {
            const track = await this.trackModel.findByPk(id);

            if (!track) {
                throw 'Песня не найдена';
            }

            await track.destroy();
        } catch (error) {
            throw new HttpException({
                statusCode: 404,
                message: error,
                codeError: 'TrackDelNotFound',
            }, 404);
        }
    }

    // Добавление комментария
    async addComment(dto: CreateCommentDto): Promise<Comment> {
        try {
            const track = await this.trackModel.findByPk(dto.track_id);

            if (!track) {
                throw 'Песня не найдена';
            }

            return await this.commentModel.create(dto);
        } catch (error) {
            throw new HttpException({
                statusCode: 404,
                message: error,
                codeError: 'TrackAddCommentNotFound',
            }, 404);
        }
    }

    // Увеличение счётчика прослушивания
    async addListen(id: string) {
        try {
            const track = await this.trackModel.findByPk(id);

            if (!track) {
                throw 'Песня не найдена';
            }

            track.listens += 1;
            track.save(); // можно так: await track.save();
        } catch (error) {
            throw new HttpException({
                statusCode: 404,
                message: error,
                codeError: 'TrackAddListenNotFound',
            }, 404);
        }
    }
}
