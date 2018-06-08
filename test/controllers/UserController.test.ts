import app from '../../src/app';
import * as request from 'supertest';

describe('Users Routes', () => {
  describe('GET /getUserList', () => {
    it('should return 200', (done) => {
      request.agent(app.listen())
        .get('/getUserList')
        .expect(200, done);
    });
  });
});
