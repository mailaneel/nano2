import * as uuid from '../../utils/uuid';

describe('errors', () => {

  it('should have all required helper methods', () => {
    expect(uuid.v1).toBeDefined();
    expect(uuid.v4).toBeDefined();
    expect(uuid.getTimeUUID).toBeDefined();
    expect(uuid.getUUID).toBeDefined();
  });

});
