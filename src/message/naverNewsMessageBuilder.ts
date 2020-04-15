import { IMessageBuilder, Message } from "./types";
import rssParser from 'rss-parser';

export class NaverNewsMessageBuilder implements IMessageBuilder {
    async buildMessage(): Promise<Message> {
        return {
            title: `${new Date().toJSON().slice(0, 10).replace(/-/g, '/')} 뉴스 헤드라인입니다.`,
            content: await this.setMessage(),
        }
    }


    async setMessage() {
        // TODO

        return 'Hello World!';
    }
}