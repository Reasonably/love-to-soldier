import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { MessageBuilder } from '../messageBuilder/iMessageBuilder';
import { Message } from '../message';
import { rssMessageBuilder } from '../messageBuilder/rssMessageBuilder';

const MESSAGE_LIMIT = 1500;

export class Messenger {
    private URL = 'https://www.thecamp.or.kr';
    private client: AxiosInstance;
    private jar: CookieJar = new CookieJar();
    private soldierIds: string[] = [];
    private messageBuilders: MessageBuilder[] = [];
    private messages: Message[] = [];
    private email: string;
    private password: string;
    private config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    }

    constructor(
    ) {
        this.client = axios.create({
            withCredentials: true,
            baseURL: this.URL,
            jar: this.jar
        });
        axiosCookieJarSupport(this.client);
    }

    public setAccount(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public setTarget(soilderId: string) {
        this.soldierIds.push(soilderId);
    }

    public setMessageBuilder(messageBuilder: MessageBuilder) {
        this.messageBuilders.push(messageBuilder);
    }

    public setRssMessageBuilder() {
        this.messageBuilders.push(new rssMessageBuilder());
    }

    public addMessage(...messages: Message[]) {
        this.messages.push(...messages);
    }

    public async build() {
        this.messages.push(...(await Promise.all(this.messageBuilders.map(builder => builder.buildMessage()))));
        const body = {
            state: 'email-login',
            userId: this.email,
            userPwd: this.password
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        }
        await this.client.post('/login/loginA.do', qs.stringify(body), config);

        return this;
    }

    public async send(dryRun: boolean = false) {

        const chunkedMessages = this.messages.reduce((result: Message[], message): Message[] => {
            const { title, content } = message;
            for (let i = 0, j = 0; i < content.length; i += MESSAGE_LIMIT, j++) {
                const chunkedContent = content.slice(i, i + MESSAGE_LIMIT);
                const chunkedTitle = `${title} - ${j}`;
                result.push({
                    content: chunkedContent,
                    title: chunkedTitle,
                });
            }
            return result;
        }, []);

        await Promise.all(chunkedMessages.map(message => {
            const { content, title } = message;
            const separatedContent: string[] = content.split('\n');

            return this.soldierIds.map(id => {
                const body = {
                    boardDiv: 'sympathyLetter',
                    tempSaveYn: 'N',
                    sympathyLetterEditorFileGroupSeq: '',
                    fileGroupMgrSeq: '',
                    fileMgrSeq: '',
                    sympathyLetterMgrSeq: '',
                    traineeMgrSeq: id,
                    sympathyLetterContent: separatedContent.reduce((prev, curr) => `${prev}<p>${curr}<\p>\n`, ''),
                    sympathyLetterSubject: title,
                }

                if (dryRun) {
                    return new Promise((resolve, _) => {
                        console.log(`Sended To: ${id}\n Title: ${title} \n Content: ${JSON.stringify(content, null, 4)}`);
                        resolve();
                    });
                }

                return this.client.post('/consolLetter/insertConsolLetterA.do', qs.stringify(body), this.config);
            });
        }));
    }
}