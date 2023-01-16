const multer = require('multer')

var storage = multer.memoryStorage()

var upload = multer({ storage })

module.exports = upload


// diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'C:/Users/hasifazad/Desktop/project2/client/src/images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })