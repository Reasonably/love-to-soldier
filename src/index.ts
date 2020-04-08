import { MessengerBuilder } from "./messenger/messengerBuilder";

async function main() {
    const builder = new MessengerBuilder();

    const client = await builder
        .withAccount('YOUR_ACCOUNT', 'YOUR_PASSSWORD')
        .withTarget('YOUR_TARGET')
        .withRssMessageBuilder()
        .build();

    await client.send();
}


main();