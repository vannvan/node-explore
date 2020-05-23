 const JSONToString = function (json) {
     return JSON.stringify(json)
 }

 function sendJson(status, msg, data, params) {
     return JSONToString({
         status: status,
         message: msg,
         data: data || null
     })
 }

 function throwError(params) {
     return JSONToString({
         status: 0,
         msg: 'Service error'
     })
 }

 const getTime = function () {
     return new Date().getTime()
 }
 module.exports.sendJson = sendJson
 module.exports.throwError = throwError
 module.exports.JSONToString = JSONToString
 module.exports.getTime = getTime