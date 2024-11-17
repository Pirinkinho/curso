import { createServer } from './api';
describe('api', () => {
  it('should work', () => {
    expect(createServer()).toEqual('api');
  });
});
