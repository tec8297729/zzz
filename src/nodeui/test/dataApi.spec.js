let request = require('supertest');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
const index = require('../app'); // 这个是关键，启用app.js服务
request = request(index.listen()); // 请求本地node服务

describe('node后台接口', function(){

  it('/table/list接口', function(done){
    request.get('/table/list')
    // .auth('username', 'password') // 登陆用户
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言：读取的返回是文本内容，直接断言内容是否一样
      // expect(res.text).to.be.equal('cede:0');
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });

  it('/table/high/list接口', function(done){
    request.get('/table/high/list')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/open_city接口', function(done){
    request.get('/open_city')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/city/open接口', function(done){
    request.get('/city/open')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/order/list接口', function(done){
    request.get('/order/list')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/order/detail接口', function(done){
    request.get('/order/detail')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/user/list接口', function(done){
    request.get('/user/list')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/order/finish_order接口', function(done){
    request.get('/order/finish_order')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/order/ebike_info接口', function(done){
    request.get('/order/ebike_info')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/user/add接口', function(done){
    request.get('/user/add')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/user/edit接口', function(done){
    request.get('/user/edit')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/user/delete接口', function(done){
    request.get('/user/delete')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/map/bike_list接口', function(done){
    request.get('/map/bike_list')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/role/list接口', function(done){
    request.get('/role/list')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/role/create接口', function(done){
    request.get('/role/create')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/permission/edit接口', function(done){
    request.get('/permission/edit')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });
  it('/role/user_list接口', function(done){
    request.get('/role/user_list')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      // 断言数据内容，中间要在body中读取
      expect(res.body.code).to.be.equal(0);
      return done();
    });
  });

})

