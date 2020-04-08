import { Messenger } from "./messenger";
import { MessageBuilder } from "../messageBuilder/iMessageBuilder";
import { Message } from "../message";

export class MessengerBuilder {
    private messenger: Messenger;
    constructor() {
        this.messenger = new Messenger();
    };

    public withAccount(email: string, password: string) {
        this.messenger.setAccount(email, password)
        return this;
    }

    public withTarget(soilderId: string) {
        this.messenger.setTarget(soilderId);
        return this;
    }

    public withMessageBuilder(messageBuilder: MessageBuilder) {
        this.messenger.setMessageBuilder(messageBuilder);
        return this;
    }

    public withRssMessageBuilder() {
        this.messenger.setRssMessageBuilder();
        return this;
    }

    public withMessage(...messages: Message[]) {
        this.messenger.addMessage(...messages);
        return this;
    }

    public async build() {
        return this.messenger.build();
    }
}