# Install

nano2 requires __node v8.0.0__ or higher

```
$ npm install nano2
```

# Usage

### Ping

```js
import nano2 from 'nano2';

// create service
const service = nano2();

// add ping action
service.action('ping', () => 'pong');

// start service
await service.start();

// run ping action
const pingResponse  = await service.run('ping');
```

### Math

```js
// add math.add action
service.action('math.add', ctx => ctx.params.a + ctx.params.b);

// add math.multiply using action spec
service.action({
  name: 'math.multiply',
  version: '1.0',
  description: 'Math multiplication',
  type: 'service',
  handler: ctx => ctx.params.a * ctx.params.b;
});

// run math.add action
const addResponse = await service.run('math.add', { a: 5, b: 3 });

// run math.multiply action
const multiplyResponse = await service.run('math.multiply', { a: 5, b: 3 });
```

# Types

### Action

| name | type | default | description |
| --- | --- | --- | --- |
| name | string | - | Action name |
| type? | string | action | Date.now() |
| handler | Funtion | action handler |
| version? | string | "1.0" | unique identifier |
| description? | string | "" | unique identifier |
| meta? | object | {} | meta data required for plugins / middleware |


### Plugin

| name | type | default | description |
| --- | --- | --- | --- |
| name | string | - | Action name |
| register | Function | - | will be called when start is called on service |



### Context

| name | type | description |
| --- | --- | --- |
| action | string | Action name |
| timestamp | number | Date.now() |
| requestId | string | unique identifier |
| correlationId? | string | unique identifier |
| from? | string | calling service |
| params | IRequestParams | params given to action runner |
| attributes | IRequestAttributes | attributes given to action runner |


# Inspiration

- [koa](https://github.com/koajs/koa)
- [moleculer](https://github.com/ice-services/moleculer)
- [hemera](https://github.com/hemerajs/hemera)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
