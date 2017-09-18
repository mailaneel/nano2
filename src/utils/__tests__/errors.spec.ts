import * as errors from '../errors';

describe('errors', () => {

  it('should have all required helper methods', () => {
    expect(errors.createError).toBeDefined();
    expect(errors.createApiError).toBeDefined();
    expect(errors.createFrameworkError).toBeDefined();
  });

});
