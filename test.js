var request = require('request');
request = request.defaults({jar: true, headers: {'Content-Type': 'application/json'}});
var login = {};
var auth_token = '';




// request({method: 'POST', url: 'http://localhost:4000/auth/register', json: true, body: {name: 'test', email: 'dara@example.com', password: 'password'}}, function(err,response,body) {
//   console.log(err);
//   auth_token = response.headers['authorization'];
//   // console.log(auth_token)
//   // console.log(response);
//   console.log(body);
// });

request({method: 'POST', url: 'http://localhost:4000/auth/login', json: true, body: {email: 'dara@example.com', password: 'password'}}, function(err,response,body) {
  console.log(err);
  console.log(body)

  // request({method: 'GET', url:'http://localhost:4000/api/exercises', qs: {userExercises: true}}, function(err,resp,body) {
  //   console.log('body', body);
  // })
})