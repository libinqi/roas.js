describe('Users Routes', () => {
  describe('GET /getUserList', () => {
    it('should return 200', (done) => {
      global['request']
        .get('/users/list')
        .expect(200, done);
    });
  });
});
