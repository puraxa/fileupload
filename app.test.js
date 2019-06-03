var supertest = require('supertest');
var app = require('./app');

describe('testing app...',function(){
    it('get index: response 200',function(done){
        supertest(app)
        .get('/')
        .expect(200,done);
    })
    it('get undefined route: response 404',function(done){
        supertest(app)
        .get('/stabilo')
        .expect(404,done);
    })
    it('showfile returns 404 if file is not uploaded',function(done){
        supertest(app)
        .get('/showfile')
        .expect(404,done)
    })
    it('uploading csv file expect redirect to showfile 302 status', function(done){
        supertest(app)
        .post('/uploadfile')
        .attach('file','./test_files/nesto.csv')
        .expect(302,done);
    })
    it('uploading not csv file expecting rejection 400 status', function(done){
        supertest(app)
        .post('/uploadfile')
        .attach('file','./test_files/test.txt')
        .expect(400,done);
    })
})