import { MessageBuilder } from "./iMessageBuilder";
import rssParser from 'rss-parser';
import { Message } from "../message";

export class rssMessageBuilder implements MessageBuilder {
    async buildMessage(): Promise<Message> {
        return {
            title: `${new Date().toJSON().slice(0, 10).replace(/-/g, '/')} 뉴스 헤드라인입니다.`,
            content: await this.setMessage(),
        }
    }


    async setMessage() {
        const parser = new rssParser();
        const xml = 'http://media.daum.net/rss/today/primary/all/rss2.xml'; // 다음뉴스 종합 
        let message: string = '';
    
        const convertor = (text: string | undefined) => {
            return (text || '').replace(/&quot;/g, '\"')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
        };
    
        const feed = await parser.parseURL(xml);
    
        feed.items!.forEach((item) => {
            const title = convertor(item.title);
            let content = convertor(item.content);
    
            if (content.startsWith('(끝)본 기사는 인포맥스 금융정보 단말기에서 2시간 더 빠른')) {
                content = '';
            } else {
                content = content.slice(0, content.indexOf('다.') + 1);
                content = content.replace(/^(\*그림\d\*)?(\(|\[|【)\s?.*=.*\s?(\)|\]|】)\s?/, '')
                    .replace(/^[가-힣]{2,3}\s(기자|특파원)\s=\s/, '');
                content += '\n';
            }
    
            message = `${message}\n# ${title}\n${content}`;
        });
    
        return message.slice(0, 1500);
    }
}