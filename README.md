# Install

nano2 requires __node v8.0.0__ or higher

```
$ npm install nano2
```

# Usage

### Create Service

```js
import nano2 from 'nano2';

// create service
const service = nano2();

```

### Middleware

Middleware works same as koa js middleware and internally it uses koa-compose

```js
service.use((ctx, next) => {
  ctx.meta.user = {
    name: 'user',
  };
  return next();
});
```

### Actions

```js
// add ping action
service.action('ping', () => 'pong');

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

```

### Start

```js

await service.start()

```

### Run

```js

// call ping action
const pingResponse  = await service.call('ping');

// call math.add action
const addResponse = await service.call('math.add', { a: 5, b: 3 });

// call math.multiply action
const multiplyResponse = await service.call('math.multiply', { a: 5, b: 3 });
```

### Plugins

TODO

# Types

Please see [types.ts](./src/types.ts)

# Inspiration

- [koa](https://github.com/koajs/koa)
- [moleculer](https://github.com/ice-services/moleculer)
- [hemera](https://github.com/hemerajs/hemera)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
