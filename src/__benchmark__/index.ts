// tslint:disable-next-line:import-name
import * as Benchmarkify from 'benchmarkify';
import { createService } from '../index';

const service = createService();

service.action('ping', () => {
  return '';
});

service.action('math.add', (ctx) => {
  return ctx.params.a + ctx.params.b;
});

service.start().then(() => {
  // Create a new benchmark
  // The `.printHeader` method will print the name of benchmark & some
  // information from the OS/PC to the console.
  const benchmark = new Benchmarkify('Service').printHeader();

  // Create a test suite
  const bench1 = benchmark.createSuite('run');

  // Add first func
  bench1.add('run math.add', (done) => {
    service.run('math.add', { a: 5, b: 3 }).then(done).catch(console.log);
  });

  // Add second func. This result will be the reference
  bench1.ref('run ping', (done) => {
    service.run('ping').then(done).catch(console.log);
  });

  bench1.run();
});
