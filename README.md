# Love To Soldier

훈련병에게 따스한 사랑을 전하세요

## Installing

Using npm

```
$ npm install love-to-soldier
```

## Example

MessengerBuilder

```ts
import { MessengerBuilder, DaumNewsMessageBuilder } from 'love-to-soldier';

const builder = new MessengerBuilder();

const client = await builder
    .withAccount('YOUR_ACCOUNT', 'YOUR_PASSSWORD') // Your Email ID/PW
    .withTarget('YOUR_TARGET') // Soldier ID
    .withMessageBuilder(DaumNewsMessageBuilder)
    .build();

await client.send();
```

MessageBuilder

```ts
import { MessengerBuilder, IMessageBuilder } from 'love-to-soldier';

class MyCustomMessageBuilder implements IMessageBuilder {
    async buildMessage() {
        // Do Something
        return {
            title: 'My Custom Title',
            content: 'My Custom Content'
        }
    }
}

const builder = new MessengerBuilder();

const client = await builder
    .withAccount('YOUR_ACCOUNT', 'YOUR_PASSSWORD') // Your Email ID/PW
    .withTarget('YOUR_TARGET') // Soldier ID
    .withMessageBuilder(MyCustomMessageBuilder)
    .build();

await client.send();
```

