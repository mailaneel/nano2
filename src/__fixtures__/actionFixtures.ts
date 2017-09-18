export const actionSpecs = {
  ping: {
    name: 'ping',
    handler: () => 'pong',
  },
  version: {
    name: 'version',
    handler: () => '1.0',
  },
  'math.add': {
    name: 'math.add',
    handler: ctx => ctx.params.a + ctx.params.b,
  },
  'math.multiply': {
    name: 'math.multiply',
    handler: ctx => ctx.params.a * ctx.params.b,
  },
};

export const actionFullSpecs = {
  ping: {
    name: 'ping',
    version: '1.0',
    description: 'Pinger',
    type: 'service',
    handler: () => 'pong',
  },
  version: {
    name: 'version',
    version: '1.0',
    description: 'Get version of this action',
    type: 'service',
    handler: () => '1.0',
  },
  'math.add': {
    name: 'math.add',
    version: '1.0',
    description: 'Adds 2 params a and b',
    type: 'service',
    handler: ctx => ctx.params.a + ctx.params.b,
  },
  'math.multiply': {
    name: 'math.multiply',
    version: '1.0',
    description: 'Multiplies 2 params a and b',
    type: 'service',
    handler: ctx => ctx.params.a * ctx.params.b,
  },
};
