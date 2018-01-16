var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', function (req, res) {
  var myfile = req.files.myfile;
  console.log(req.files);
  var filename = myfile.name;
  var filetype = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
  var outputdir = '';
  
  if(filetype == 'jpg' || filetype == 'jpeg' || filetype == 'png' || filetype == 'gif'){
    outputdir = 'uploads/img_';
  }else if(filetype == 'log') {
    outputdir = 'uploads/log_';
  }else if(filetype == 'txt'){
    outputdir = 'uploads/txt_';
  }else{
    outputdir = 'uploads/file_';
  }

  var output = outputdir + new Date().getTime() + '.' + filetype;

  var source = fs.createReadStream(myfile.path);
  var dest = fs.createWriteStream(output);

  source.pipe(dest);

  source.on('end', function(){
    fs.unlinkSync(myfile.path);

    res.send({
      status: 200,
      msg: 'upload success',
      data: {
        url: output
      }
    });
  });

  source.on('error', function(error){
    console.log(error);
    res.send({
      status: 500,
      msg: 'error',
      data: ''
    });
  });
});

module.exports = router;
