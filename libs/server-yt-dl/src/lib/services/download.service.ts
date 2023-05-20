import { Injectable } from "@nestjs/common";
import { PassThrough } from "stream";
import ytdl from 'ytdl-core';

@Injectable()
export class DownloadService {
    async download(url: string, extension: string) {
        const info = await ytdl.getInfo(url);
        const { author, title } = info.player_response.videoDetails;
        const fileName = `${author} --- ${title}.${extension}`.replace(/[^\u0000-\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
        const stream = new PassThrough();
        ytdl(url, { filter: extension === 'mp4' ? 'audioandvideo' : 'audioonly' }).pipe(stream);

        return {stream, fileName};
    }
}