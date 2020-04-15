
export interface Message {
    title: string;
    content: string;
}

export interface IMessageBuilder {
    buildMessage(): Promise<Message>
}

export interface IMessageBuilderConstructor {
    new(): IMessageBuilder;
}
