import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'; // для использования файла .env
import {connectDb} from './connectDb';
import {TracksModule} from './tracks/tracks.module';
import {FilesModule} from './files/files.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
        }),
        ConfigModule.forRoot(),
        connectDb,
        TracksModule,
        FilesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
