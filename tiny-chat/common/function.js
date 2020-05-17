 const getJsonStr = function (params) {
     return JSON.stringify(params)
 }

 function sendJson(status, msg, data, params) {
     return getJsonStr({
         status: status,
         message: msg,
         data: data || null
     })
 }

 function throwError(params) {
     return getJsonStr({
         status: 0,
         msg: 'Service error'
     })
 }
 module.exports.sendJson = sendJson
 module.exports.throwError = throwError