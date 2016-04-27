// require('dotenv').load();
var AWS = require('aws-sdk');
var path = require('path');
var tar = require('tar');
var fs = require('fs');
var s3 = require('s3');

AWS.config.region = 'us-east-1'; //ensure your bucket region is correct
var awsS3Client = new AWS.S3({params: {Bucket: process.env.S3_BUCKET_NAME}});

var options = {
  s3Client: awsS3Client,
  // more options available. See API docs below.
};
var client = s3.createClient(options);

function extractZipFromTar(tarFile) {
    return new Promise((resolve,reject) => {
        var key = tarFile;
         var params = {Key: key};
         var s3stream = awsS3Client.getObject(params).createReadStream();
         var parse = tar.Parse();
         var numEntries = 0;

         s3stream.on('close', () => {
             //    console.log('END!!!!!!!!');
            resolve();
         });

         parse.on("entry", function (e) {
             if (path.extname(e.props.path) == '.zip') {
                 console.log(" --- ", e.props.path)
                 var fileName = path.basename(e.props.path);
                 var file = require('fs').createWriteStream('./tmp/'+fileName);
                 file.on("finish", () => {
                    //  console.log("end file write");
                      parse.end();
                 });

                 e.on("end", function () {
                     file.end();
                 })
                e.pipe(file);
             }
         })
         .on('error', function(err) {
                  // all entries read
                //  console.log(err.toString());
                 resolve(err);
                //  if (tars.length > 0) extractZipFromTar(tars);
                })
         .on('end', function() {
                // all entries read
                // console.log("END!");
                s3stream.pause();
                s3stream.unpipe(parse);
                s3stream.end();
                s3stream.emit('close');
                // if (tars.length > 0) extractZipFromTar(tars);
          })
         s3stream.pipe(parse)
    });
}

extractZipFromTar(process.argv[2]).then(() => {
    process.exit();
});
