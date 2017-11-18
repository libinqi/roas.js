describe('Users Routes', () => {
  describe('GET /getUserList', () => {
    it('should return 200', (done) => {
      request
        .get('/users/list')
        .expect(200, done);
    });
  });
});
