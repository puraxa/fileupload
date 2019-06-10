var app = require('./seed');

test('test body empty', ()=>{
    expect(app.checkReqBody({body:'nesto'})).rejects.toEqual({status:400,message:"One or more fields is empty!"});
})
test('valid body', ()=>{
    expect(app.checkReqBody({rows:400000,filename:'testfile'})).resolves.toEqual('body is ok');
})
test('rows below 1 should throw error',()=>{
    expect(app.checkReqBody({rows:-14,filename:'testrows'})).rejects.toEqual({status:400, message:'We have to generate at least 1 row!'})
})