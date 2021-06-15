import {HttpException, Injectable} from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FilesService {
    create(type: FileType, file): string {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = Date.now().toString() + '.' + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'static', type);

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

            return type + '/' + fileName;
        } catch (error) {
            throw new HttpException({
                statusCode: 500,
                message: error,
                codeError: 'FileError',
            }, 500);
        }
    }

    remove(fileName: string) {
    }
}
