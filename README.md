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

## How to get soldier id?
1. https://www.thecamp.or.kr/  접속, 로그인
2. 카페 탭 클릭
3. 위문편지(편지를 받을 훈련병의) 버튼 클릭
4. 개발자 콘솔을 열고 `traineeMgrSeq` 검색
