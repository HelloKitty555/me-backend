const multer = require('koa-multer'); // 引入 koa-multer 模块
const fs = require("fs"); // 引入 fs 文件管理器
const storage = multer.diskStorage({
  //文件保存路径  
  destination: function (req, file, cb) {
    // 这里是我默认的图片目录，后面还得根据不同的年份月份来创建相应的保存目录
    const imagesPath = "public/uploads/images/";
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    // 创建年份目录
    const existsYearDir = fs.existsSync(imagesPath + year + "/");
    if (!existsYearDir) { // 如果目录不存在
      fs.mkdirSync(imagesPath + year + "/", 0777);
    }
    // 创建月份目录
    const existsMonthDir = fs.existsSync(imagesPath + year + "/" + month + "/");
    if (!existsMonthDir) { // 如果目录不存在
      fs.mkdirSync(imagesPath + year + "/" + month + "/", 0777);
    }
    cb(null, 'public/uploads/images/' + year + '/' + month + '/');
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
}
})

const upload = multer({
  storage: storage
});

module.exports = upload