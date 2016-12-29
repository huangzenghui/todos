var superagent = require('supertest');
var app = require('../../build/app').app;
var MongoClient = require('mongodb').MongoClient;
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

// Connection URL
var url = 'mongodb://localhost:27017/tests';

var request = superagent(app.listen());

var insertTodo = function(db, callback) {
  var collection = db.collection('todos');
  collection.insert({a : 1}, function(err, result) {
    callback(result);
  });
}

var removeTodos = function(db, callback) {
  var collection = db.collection('todos');
  collection.remove({}, function(err, result){
    callback(result);
  })
}

MongoClient.connect(url, function(err, db) {
  removeTodos(db, function(){
    db.close();
  });
});

describe('graphiql url', function(){
  it('graphiql router should 200', function(done){
    request.get('/graphiql').expect(200,done);
  })
});

describe('graphql test', function(){
  var todo = null;
  describe("addTodo api", function(){
    it('插入todo，返回结果为对象', function(done){
      request.post('/graphql').send({
        query:"mutation {\n  todo:addTodo(\n    text: \"1\" \n  ) {\n    _id\n  }\n}",
        variables:"{}"
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var result = res.body;
        todo = result.data.todo;
        assert.typeOf(todo, 'object');
        done();
      });
    })
  })
  describe('todos api', function() {
    it('todo个数为1', function(done){
      request.post('/graphql').send({
        query: "{\n  todos {\n    _id\n    text\n    complete\n    createAt\n  }\n}"
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var result = res.body;
        assert.lengthOf(result.data.todos, 1);
        done();
      });
    })
  })
  describe("changeTodoState api", function(){
    it('改变todo状态', function(done){
      request.post('/graphql').send({
        query: "mutation _ (\n$ids: [String]!\n $complete: Boolean!\n ) {\n changeTodosState(\n ids: $ids\n  complete: $complete\n ) { ok }}",
        variables: {
          ids: [todo._id],
          complete: true
        }
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var result = res.body;
        assert.equal(result.data.changeTodosState.ok, true);
        done();
      });
    })
  })
  describe("updateTodo api", function(){
    it('修改todo', function(done){
      const updateText = '123';
      request.post('/graphql').send({
        query: 'mutation { updateTodo (\n id: "'+todo._id+'" \n text:"'+updateText+'") { ok }}'
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var result = res.body;
        assert.equal(result.data.updateTodo.ok, true);
        done();
      });
    })
  })
  describe("remove api", function(){
    it('删除todo', function(done){
      const updateText = '123';
      request.post('/graphql').send({
        query: "mutation _ (\n$ids: [String]!\n ) {\n removeTodos(\n ids: $ids\n  ) { ok }}",
        variables: {
          ids: [todo._id],
        }
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var result = res.body;
        assert.equal(result.data.removeTodos.ok, true);
      });
      request.post('/graphql').send({
        query: "{\n  todos {\n    _id\n    text\n    complete\n    createAt\n  }\n}",
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var result = res.body;
        assert.lengthOf(result.data.todos, 0);
        done();
      });
    })
  })
})