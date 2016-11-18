describe('Users Routes', () => {
  describe('GET /users/list', () => {
    it('should return 200', (done) => {
      request
        .get('/users/list')
        .expect(200, done);
    });
  });
});
