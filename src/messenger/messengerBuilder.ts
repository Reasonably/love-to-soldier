import { Messenger } from "./messenger";
import { IMessageBuilderConstructor, Message } from "../message";

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
        this.messenger.addTarget(soilderId);
        return this;
    }

    public withMessageBuilder(messageBuilderConstructor: IMessageBuilderConstructor) {
        const messageBuilder = new messageBuilderConstructor();
        this.messenger.addMessageBuilder(messageBuilder);
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