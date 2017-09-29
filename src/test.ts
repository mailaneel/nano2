import { createService } from './ServiceFactory';

const service = createService({});
service.action('ping', () => 'pong!');
service.action('math.add', ctx => ctx.params.a + ctx.params.b);
service.action('math.multiply', ctx => ctx.params.a * ctx.params.b);

console.log(JSON.stringify(service.store.getState()));
service.start().then(() => {
  service.run('ping').then(console.log).catch(console.log);
  service.run('math.add', { a: 1, b: 2 }).then(console.log).catch(console.log);
  service.run('math.multiply', { a: 1, b: 2 }).then(console.log).catch(console.log);
  console.log(service.store.getState());
});
