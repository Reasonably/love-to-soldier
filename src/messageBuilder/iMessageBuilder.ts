import { Message } from "../message";

export interface MessageBuilder {
    buildMessage(): Promise<Message> 
}
