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

### Handler

```ts
type IHandler = (ctx: IContext, next?: () => any) => any;
```

### Action

```ts
interface IAction {
  name: string;
  handler: IHandler;
  type?: string;
  version?: string;
  description?: string;
  meta?: {
    [key: string]: any;
  };
}
```


### Plugin

```ts
type IPluginRegiser = (service: IService) => Promise<void>;

interface IPlugin {
  name: string;
  register: IPluginRegiser;
}
```

### Params

```ts
interface IParams {
  [key: string]: any;
}
```

### Attributes

```ts
interface IAttributes {
  timestamp?: number;
  requestId?: string;
  correlationId?: string;
  from?: string;
  [key: string]: any;
}
```

### Context

```ts
interface IContext {
  action: string;
  requestId: string;
  timestamp: number;
  correlationId?: string;
  from?: string;
  params: IParams;
  attributes: IAttributes;
  [key: string]: any;
}
```

# Inspiration

- [koa](https://github.com/koajs/koa)
- [moleculer](https://github.com/ice-services/moleculer)
- [hemera](https://github.com/hemerajs/hemera)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
