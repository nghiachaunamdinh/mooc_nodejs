let jwt = require('jsonwebtoken')
const data = { username: "trongdac" }; //data show
let token = jwt.sign(data, "12345"); //"12345" is data hide
console.log(token)
let dataencode = jwt.verify(token, "12345")
console.log(dataencode)